import produce from "immer";
import Firebase from "../fb";

const fb = new Firebase();

const NEW_CHAT = "chat/NEW_CHAT";

/* chatObj = {userName, userId, content, timestamp} */
export const newChat = (_chatsObj) => {
  return {
    type: NEW_CHAT,
    payload: _chatsObj
  }
}

export const sendChat = (_chatObj, _projectId) => {
  fb.DB.ref(`/chats/${_projectId}`).push(_chatObj);
}

const initialState = {
  pending: true,
  chats: [],
}

export default function chat(state = initialState, action){
  switch(action.type) {
    case NEW_CHAT: {
      return produce(state, draft => {
        draft.chats = action.payload;
        draft.pending = false;
      });
    }
    default:
      return state;
  }
}

