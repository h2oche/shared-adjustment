import React, { Component } from 'react';
import RuleTable from "../components/RuleTable";
import {Typography, Container, Grid, CssBaseline, Paper, Button, Modal} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import SelectPrivateRuleStyle from "../styles/SelectPrivateRule";
import {connect} from "react-redux";
import listen, {FB_ON_RESELECT_RULES_CHECK, FB_ON_RULES_CHECK} from "../store/event";
import ProjectDetailModal from "../components/ProjectDetailModal";
import ChatComponent from "../components/Chat";
import {checkRule, submitRule} from "../store/reducers/rules";
import {userRoleConst} from "../store/reducers/meta";
import TimerComponent from "../components/Timer";
import {endStudy} from "../store/reducers/study";
import StepperComponent from "../components/Stepper";

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

export class RuleReselect extends Component {
  state = {
    openDetails: false,
  }

  onTimeUp = () => {
    const {projectId} = this.props.user;
    this.props.endStudy(projectId);
  }

  toggleOpenDetails = () => {
    this.setState({openDetails: !this.state.openDetails});
  }

  submitRule = () => {
    const {projectId} = this.props.user;
    const {reselectRules} = this.props.rules;

    let check = false;
    for(let ruleName in reselectRules)
      if(reselectRules[ruleName])
        check = true;
    
    if(check) this.props.submitRule(projectId, true);
    else alert("점검 요소를 선택하지 않았습니다.\n한 개 이상 선택해 주시기 바랍니다");
  }

  handleCheckRule = (_ruleName) => {
    console.log(_ruleName);
    const original = this.props.rules.reselectRules[_ruleName];
    const {projectId} = this.props.user;
    checkRule(projectId, _ruleName, original, true);
  }

  componentWillMount = () => {
    const {_dispatch} = this.props;
    const {projectId} = this.props.user;
    
    listen([FB_ON_RESELECT_RULES_CHECK, FB_ON_RULES_CHECK], _dispatch, {projectId})
  }

  renderPreviousRules = () => {
    let fragments = [];
    const {rules} = this.props;

    for(let ruleName in ruleNameEtc)
      if(rules[ruleName])
        fragments.push(<span key={`rule-reselect-${ruleName}`}> [{ruleNameEtc[ruleName].korean}] </span>)

    return <Typography>
        지금까지 우리 팀에서 점검해온 요소는 <b>{fragments}</b> 입니다.
      </Typography>
  }

  render() {
    const {rules, user, startAt, classes} = this.props;
    const showSubmitBtn = user.role === userRoleConst.LEADER;
    const {reselectRules} = rules;

    return (
      <div>
        <Container fixed>
          <CssBaseline/>
          <Grid container className={classes.container}>
            <StepperComponent ruleReselect={true}/>
            <Grid item xs={8} className={classes.contentWrapper}>
              <Grid item xs={12}>
                <Paper className={classes.instrWrapper}>
                  <Typography component="h4">
                    현재 우리 팀의 많은 팀원들이 점검 요소를 재선정해야 할 필요성을 느끼고 있습니다. 앞으로 어떤 요소에 특히 주의를 기울여 점검해 나갈 것인지 팀원과 함께 토론하여 선택하시기 바랍니다 <b>(중복선택 가능)</b>.
                  </Typography>
                  <Typography component="h4">
                    선택 후, 사전에 지정된 학습자가 [제출하기] 버튼을 누르면 이전 화면으로 돌아갑니다.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} >
                <Paper className={classes.reminderWrapper}>
                  {this.renderPreviousRules()}
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper>
                  <RuleTable {...reselectRules} checkRule={this.handleCheckRule}/>
                </Paper>
              </Grid>
              <Grid item xs={12} className={classes.buttonWrapper}>
              {showSubmitBtn ? <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => this.submitRule()}>
                제출하기
              </Button> : <span/>}
              </Grid>
            </Grid> 
            <Grid item xs={4} className={classes.toolbarWrapper}>
              <Grid item xs={12}>
                <TimerComponent startAt={startAt} end={this.onTimeUp}/>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => this.toggleOpenDetails()}>
                  문제 다시보기
                </Button>
              </Grid>
              <ChatComponent/>
            </Grid>
          </Grid>
          
        </Container>
        <ProjectDetailModal
          open={this.state.openDetails}
          toggleOpen={this.toggleOpenDetails}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.meta.user,
    rules: state.rules,
    startAt: state.meta.project.startAt
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    _dispatch: dispatch,
    submitRule: (_projectId, _isReselect) => submitRule(_projectId, _isReselect),
    endStudy: (_projectId) => endStudy(_projectId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(SelectPrivateRuleStyle)(RuleReselect));
