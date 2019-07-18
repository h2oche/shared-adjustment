import React, { Component } from 'react';
import {Grid, ListItem, ListItemText, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import ChatStyles from "../../styles/Chat";

export class ChatListItem extends Component {

  render() {
    const {id, userName, content, timestamp, classes} = this.props;

    return (
      <ListItem>
        <Grid container>
          <Grid item xs={12}>
            <span className={classes.name}>{userName}</span>
            <span className={classes.date}>{new Date(timestamp).toISOString().split("T",1)}</span>
          </Grid>
          <Grid item xs={12}>
            <pre className={classes.content}>{content}</pre>
          </Grid>
        </Grid>
      </ListItem>
    )
  }
}

export default withStyles(ChatStyles)(ChatListItem);
