import Firebase from "./fb";
import {authChange} from "./reducers/meta";

const fb = new Firebase();

export const FB_ON_AUTH_STATE_CHANGE = "firebase/ON_AUTH_STATE_CHANGE";
export const FB_ON_PROJECT_STATE_CHANGE = "firebase/ON_PROJECT_STATE_CHANGE";

const eventListnerMapper = {
  [FB_ON_AUTH_STATE_CHANGE]: (dispatch) => {
    console.log(`listen ${FB_ON_AUTH_STATE_CHANGE} event...`);
    fb.auth.onAuthStateChanged(_authUser => {
      console.log(_authUser);
      dispatch(authChange(_authUser));
    });
  },
  [FB_ON_PROJECT_STATE_CHANGE]: () => {

  }
}

export default function listen(events, dispatch) {
  events.forEach(_event => {
    eventListnerMapper[_event](dispatch);  
  });
}