import produce from "immer";
import Firebase from "../fb";

const NEED_AUTH = "meta/NEED_AUTH";
const AUTH_CHANGE = "meta/AUTH_CHANGE";
const PROJECT_STATE_CHANGE = "meta/PROJECT_STATE_CHANGE";
const READ_MAIN = "meta/READ_MAIN";
const fb = new Firebase();

export const authChange = (authUser) => {
  return async (dispatch, getState) => {
    if(authUser === null) return dispatch({type: NEED_AUTH});

    const userSnapshot = await fb.DB.ref(`/users/${authUser.uid}`).once('value');
    const user = userSnapshot.val();
    const projectSnapshot = await fb.DB.ref(`/projects/${user.projectId}`).once('value');
    const project = projectSnapshot.val();

    console.log(authUser);
    console.log(user);
    console.log(project);

    dispatch({
      type: AUTH_CHANGE,
      payload: { authUser, user, project}
    });
  }
}

export const readMain = () => {
  return async (dispatch, getState) => {
    const authUser = getState().meta.authUser;
    await fb.DB.ref(`/users/${authUser.uid}/readMain`).set(true);
    dispatch({type: READ_MAIN});
  }
}

export const projectStateChange = project => ({
  type: PROJECT_STATE_CHANGE,
  payload: project.state
});

const initialState = {
  authUser: null,
  user: null,
  project: null,
  pending: true,
};

export default function meta(state = initialState, action) {
  switch(action.type) {
    case READ_MAIN: {
      return produce(state, draft => {
        draft.user.readMain = true;
      });
    }
    case NEED_AUTH: {
      return produce(state, draft => {
        draft.pending = false;
        draft.authUser = null;
      });
    }
    case AUTH_CHANGE: {
      return produce(state, draft => {
        draft.authUser = action.payload.authUser;
        draft.user = action.payload.user;
        draft.project = action.payload.project;
        draft.pending = false;
      });
    }
    case PROJECT_STATE_CHANGE: {
      return produce(state, draft => {
        draft.project.state = action.payload;
      });
    }
    default:
      return state;
  }
}
