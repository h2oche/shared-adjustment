import React, { Component } from 'react';
import {Grid, CssBaseline, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import CompleteStyle from "../styles/Complete";

export class Complete extends Component {
  render() {
    const {classes} = this.props;

    return (
      <div>
        <CssBaseline/>
        <Grid container className={classes.root}>
          <Typography component="h1">학습이 모두 완료되었습니다.</Typography>
        </Grid>
      </div>
    )
  }
}

export default withStyles(CompleteStyle)(Complete);
