import React, { Component } from 'react';
import {Grid, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import ChatStyles from "../../styles/Chat";

export class ChatInput extends Component {
  state = {
    newChatContent: ''
  }

  onNewChatChange = (e) => {
    this.setState({newChatContent: e.target.value})
  }

  onNewChatKeyPress = (e) => {
    if(e.charCode === 13 && e.ctrlKey) {
      this.props.sendNewChat(this.state.newChatContent);
      this.setState({newChatContent:''});
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.chatInputContainer}>
        <Grid container>
          <Grid item xs={12} className={classes.newChatContainer}>
            <textarea
              className={classes.newChat}
              value={this.state.newChatContent}
              onChange={this.onNewChatChange}
              onKeyPress={this.onNewChatKeyPress}
              ></textarea>
          </Grid>
          <Grid item xs={12}>
            <span>Ctrl+엔터키를 누르면 전송됩니다.</span>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(ChatStyles)(ChatInput);
