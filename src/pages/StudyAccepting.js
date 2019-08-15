import React, { Component } from 'react';
import {Grid, CssBaseline, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import StudyAcceptingStyle from "../styles/StudyAccepting";
import {connect} from "react-redux";
import {acceptStudy, rejectStudy} from "../store/reducers/study";

export class StudyAccepting extends Component {
  onAcceptBtnClick = () => {
    const {projectId} = this.props.user;
    const {uid} = this.props.authUser;
    const {acceptStudy} = this.props;
    acceptStudy(projectId, uid);
  }

  onRejectBtnClick = () => {
    const {projectId} = this.props.user;
    const {uid} = this.props.authUser;
    const {rejectStudy} = this.props;
    rejectStudy(projectId, uid);
  }

  render() {
    const {classes} = this.props;
    
    return (
      <div>
        <CssBaseline/>
        <Grid container className={classes.root}>
          <p style={{textAlign: "center"}}>수업지도안 제출을 승인하시겠습니까?</p>
          <div>
            <Button
              className={classes.acceptingBtn}
              variant="contained"
              color="primary"
              onClick={this.onAcceptBtnClick}>
              승인함
            </Button>
            <Button
              className={classes.rejectingBtn}
              variant="contained"
              color="primary"
              onClick={this.onRejectBtnClick}>
              승인하지 않음
            </Button> 
          </div>
        </Grid>
      </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.meta.user,
    authUser: state.meta.authUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    acceptStudy: (_projectId, _uid) => acceptStudy(_projectId, _uid),
    rejectStudy: (_projectId) => rejectStudy(_projectId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(StudyAcceptingStyle)(StudyAccepting));
