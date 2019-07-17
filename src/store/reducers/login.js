import Firebase from "../fb";
import produce from "immer";
const fb = new Firebase();

export const LOGIN = "login/LOGIN";
export const LOGIN_FAIL= "login/LOGIN_FAIL";
export const LOGIN_PENDING = "login/LOGIN_PENDING";

export const loginPageStatus = {
  initial: "loginPage/INITIAL",
  pending: "loginPage/PENDING",
  fail: "loginPage/FAIL"
}

export const signIn = (id, password) => {
  return async (dispatch) => {
    dispatch({type: LOGIN_PENDING});
    try {
      const authUser = await fb.auth.signInWithEmailAndPassword(id, password);
      console.log(authUser);
    }
    catch(e) { dispatch({type:LOGIN_FAIL}); }
  }
}

const initialState = {
  status: loginPageStatus.initial,
}

export default function login(state = initialState, action) {
  switch(action.type) {
    case LOGIN_PENDING:
      return produce(state, draft => { draft.status = loginPageStatus.pending });
    case LOGIN_FAIL:
      return produce(state, draft => { draft.status = loginPageStatus.fail});
    default:
      return state;
  }
}