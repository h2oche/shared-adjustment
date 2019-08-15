import React, { Component } from 'react';
import {Grid, CssBaseline, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import RuleAcceptingStyle from "../styles/RuleAccepting";
import {connect} from "react-redux";
import {acceptCurrentRule, rejectCurrentRule} from "../store/reducers/rules";
import listen, {FB_ON_RESELECT_RULES_CHECK, FB_ON_RULES_CHECK} from "../store/event";

const ruleNameEtc = {
  communication: {
    korean: "활발한 의사소통",
  },
  positiveVibe: {
    korean: "긍정적 팀분위기",
  },
  mission: {
    korean: "문제의 조건달성",
  },
  comprehension: {
    korean: "팀원의 이해도점검",
  }
};

export class RuleAccepting extends Component {
  onAcceptBtnClick = () => {
    const {user, authUser, acceptCurrentRule, reselect} = this.props;
    acceptCurrentRule(user.projectId, authUser.uid, reselect);
  }

  onRejectBtnClick = () => {
    const {user, rejectCurrentRule, reselect} = this.props;
    rejectCurrentRule(user.projectId, reselect);
  }

  componentWillMount() {
    const {user, _dispatch} = this.props;
    const {projectId} = user;
    listen([FB_ON_RULES_CHECK, FB_ON_RESELECT_RULES_CHECK], _dispatch, {projectId})
  }

  renderSelectedRules = () => {
    let fragments = [];
    const {rules} = this.props;
    const {reselectRules} = rules;
    const {reselect} = this.props;

    const selectedRules = reselect ? reselectRules : rules;

    for(let ruleName in ruleNameEtc)
      if(selectedRules[ruleName])
        fragments.push(<span key={`rule-accepting-${ruleName}`}> [{ruleNameEtc[ruleName].korean}] </span>)
    return fragments;
  }

  render() {
    const {classes} = this.props; 

    return (
      <div>
        <CssBaseline/>
        <Grid container className={classes.root}>
          <p style={{textAlign: "center"}}>선택된 점검요소는 {this.renderSelectedRules()} 입니다.</p>
          <p style={{textAlign: "center"}}>승인하시겠습니까?</p>
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
    project: state.meta.project,
    user: state.meta.user,
    authUser: state.meta.authUser,
    rules: state.rules
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _dispatch: dispatch,
    acceptCurrentRule,
    rejectCurrentRule,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(RuleAcceptingStyle)(RuleAccepting));
