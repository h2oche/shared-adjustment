import React, { Component } from 'react';
import ChatListItem from "./ChatListItem";
import {List, Paper} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import ChatStyles from "../../styles/Chat";

export class ChatList extends Component {
  scrollToBottom = () => {
    const scrollHeight = this.chatList.scrollHeight;
    const height = this.chatList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.chatList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }
  
  componentDidUpdate() {
    this.scrollToBottom(); 
  }

  renderChatItems = () => {
    // const chats = [{content: "test2", userName: "13213123"}, {content: "test1", userName: "asdfasdfasdf"}];
    const {chats} = this.props;
    console.log(chats);
    return chats.map(_chatObj =>
      <ChatListItem
        key={_chatObj.id}
        userName={_chatObj.userName}
        content={_chatObj.content}
        timestamp={_chatObj.timestamp}/>); 
  }

  render() {
    const {classes} = this.props;

    return (
      <List dense className={classes.chatListContainer}>
        <Paper
          className={classes.chatListItemContainer}
          ref={(div) => {this.chatList = div}}>
          {this.renderChatItems()}
        </Paper>
      </List>
    )
  }
}

export default withStyles(ChatStyles)(ChatList);
