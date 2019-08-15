import {combineReducers} from "redux";
import meta from "./meta";
import chat from "./chat";
import login from "./login";
import rules from "./rules";
import monitor from "./monitor";

/* app state blueprint
{
  meta: {
    authUser,
    user(firebase),
    project(firebase),
    pending: true/false
  },
  chat: {
    pending: true/false
    chats: [chatObj, chatObj]
  },
  login: {
    status: initial/pending/fail
  }
}
*/


export default combineReducers({
  meta, chat, login, rules, monitor
});