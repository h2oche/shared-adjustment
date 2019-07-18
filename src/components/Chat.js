import React, { Component } from 'react';
import listen, {FB_ON_NEW_CHAT} from "../store/event";
import {connect} from "react-redux";
import ChatList from "./chat/ChatList";
import ChatInput from "./chat/ChatInput";
import {withStyles} from "@material-ui/core/styles";
import ChatStyles from "../styles/Chat";
import {sendChat} from "../store/reducers/chat";

export class Chat extends Component {
  componentWillMount = async () => {
    const {projectId} = this.props.user;
    listen([FB_ON_NEW_CHAT], this.props._dispatch, {projectId});
  }

  sendNewChat = (_text) => {
    const {user} = this.props;
    sendChat({
      content: _text,
      userName: user.name,
      timestamp: (new Date()).getTime()
    }, user.projectId);
  }

  render() {
    const {chats} = this.props.chat;
    const {classes} = this.props;

    return (
      <div className={classes.chatContainer}>
        <ChatList chats={chats}/>
        <ChatInput sendNewChat={this.sendNewChat}/>
      </div>
    )
  }
}

const mapStateToProps = (_state) => {
  console.log(_state);
  return { chat: _state.chat, user: _state.meta.user }
};

const mapDispatchToProps = (dispatch) => ({
  _dispatch: dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ChatStyles)(Chat));
