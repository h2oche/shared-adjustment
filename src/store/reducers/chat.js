import produce from "immer";

const NEW_CHAT = "chat/NEW_CHAT";
const FETCH_CHAT = "chat/FETCH_CHAT";

const initialState = {
  pending: true,
  chats: [],
}

export default function chat(state = initialState, action){
  switch(action.type) {
    case NEW_CHAT: {
      return produce(state, draft => {
        draft.chats.push(action.payload);
      });
    }
    case FETCH_CHAT: {
      return produce(state, draft => {
        draft.chats = action.payload;
      });
    }
    default:
      return state;
  }
}

