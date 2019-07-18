import Firebase from "./fb";
import {authChange} from "./reducers/meta";
import {newChat} from "./reducers/chat";

const fb = new Firebase();

export const FB_ON_AUTH_STATE_CHANGE = "firebase/ON_AUTH_STATE_CHANGE";
export const FB_ON_PROJECT_STATE_CHANGE = "firebase/ON_PROJECT_STATE_CHANGE";
export const FB_ON_NEW_CHAT = "firebase/ON_NEW_CHAT";

const eventListnerMapper = {
  [FB_ON_AUTH_STATE_CHANGE]: (dispatch, etc) => {
    console.log(`listen ${FB_ON_AUTH_STATE_CHANGE} event...`);
    fb.auth.onAuthStateChanged(_authUser => {
      console.log(_authUser);
      dispatch(authChange(_authUser));
    });
  },
  [FB_ON_PROJECT_STATE_CHANGE]: () => {

  },
  [FB_ON_NEW_CHAT]: (dispatch, etc) => {
    console.log(`listen ${FB_ON_NEW_CHAT} event...`);

    const {projectId} = etc;
    fb.DB.ref(`/chats/${projectId}`).on('value', _snapshot => {
      const fbChats = _snapshot.val();
      const chats = [];
      
      for(var id in fbChats) {
        fbChats[id].id = id;
        chats.push(fbChats[id]);
      }

      dispatch(newChat(chats));
    });
  }
}

export default function listen(events, dispatch, etc) {
  events.forEach(_event => {
    eventListnerMapper[_event](dispatch, etc);  
  });
}