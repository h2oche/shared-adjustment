import React, { Component } from 'react';
import {Grid, CssBaseline, CircularProgress} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import LoadingStyle from "../styles/Loading";

export class Loading extends Component {
  render() {
    const {classes} = this.props; 

    return (
      <div>
        <CssBaseline/>
        <Grid container className={classes.root}>
          <CircularProgress/>
        </Grid>
      </div>
    )
  }
}

export default withStyles(LoadingStyle)(Loading);
