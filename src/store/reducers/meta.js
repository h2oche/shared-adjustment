import produce from "immer";
import Firebase from "../fb";
import { projectStates } from "../event";

const NEED_AUTH = "meta/NEED_AUTH";
const AUTH_CHANGE = "meta/AUTH_CHANGE";
const PROJECT_STATE_CHANGE = "meta/PROJECT_STATE_CHANGE";
const PROJECT_SELECT_RULE_CHANGE = "meta/PROJECT_SELECT_RULE_CHANGE";
const PROJECT_START_CHANGE = "meta/PROJECT_START_CHANGE";
const READ_MAIN = "meta/READ_MAIN";

const fb = new Firebase();
const TARGET_READ_COUNT = 4;

export const userRoleConst = {
  LEADER: "leader",
  NORMAL: "normal",
  ADMIN: "admin"
};

export const authChange = (authUser) => {
  return async (dispatch, getState) => {
    if(authUser === null) return dispatch({type: NEED_AUTH});

    // fb.auth.signOut();

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

export const readNormalMain = () => {
  return async (dispatch, getState) => {
    const {user, authUser} = getState().meta;
    await fb.DB.ref(`/users/${authUser.uid}/readMain`).set(true);

    const {projectId} = user;
    const usersSnapshot = await fb.DB.ref(`/users`).orderByChild('projectId').equalTo(projectId).once('value');
    const usersObj = usersSnapshot.val();
    let counter = 0;
    
    for(let uid in usersObj)
      if(usersObj[uid].readMain)
        counter++;
    
    if(counter === TARGET_READ_COUNT) {
      await fb.DB.ref(`/projects/${projectId}/startAt`).set(new Date().getTime());
      fb.DB.ref(`/projects/${projectId}/state`).set(projectStates.study);
    }

    dispatch({type: READ_MAIN});
  }
}

export const projectStateChange = newState => ({
  type: PROJECT_STATE_CHANGE,
  payload: newState
});

export const projectSeleteRuleChange = newSelectRule => ({
  type: PROJECT_SELECT_RULE_CHANGE,
  payload: newSelectRule
});

export const projectStartAtChange = newStartAt => ({
  type: PROJECT_START_CHANGE,
  payload: newStartAt
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

        if(draft.project && 
          (draft.project.state === projectStates.rule ||
          draft.project.state === projectStates.study ||
          draft.project.state === projectStates.ruleReselect))
            draft.project.accepting = null;
      });
    }
    case PROJECT_STATE_CHANGE: {
      return produce(state, draft => {
        if(!draft.project) return;
        draft.project.state = action.payload;
        if(draft.project.state === projectStates.rule ||
          draft.project.state === projectStates.study ||
          draft.project.state === projectStates.ruleReselect)
            draft.project.accepting = null;
      });
    }
    case PROJECT_SELECT_RULE_CHANGE: {

      return produce(state, draft => {
        if(!draft.project) return;
        draft.project.selectedRules = action.payload;
      });
    }
    case PROJECT_START_CHANGE: {
      return produce(state, draft => {
        if(!draft.project) return;
        draft.project.startAt = action.payload;
      });
    }
    default:
      return state;
  }
}
