import React, { Component } from 'react';
import {Typography, Container, Grid, CssBaseline, Paper, Button, Modal, Card} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import ChatComponent from "../components/Chat";
import listen, {FB_ON_MONITOR_STATE_CHANGE, FB_ON_RULES_CHECK, FB_ON_PROJECT_START_CHANGE} from "../store/event";
import StudyStyle from "../styles/Study";
import MonitorFragmentStyle from "../styles/MonitorFragment";
import ProjectDetailModal from "../components/ProjectDetailModal";
import {toggleMonitor, clearMonitor} from "../store/reducers/monitor";
import {submitStudy, endStudy} from "../store/reducers/study";
import TimerComponent from "../components/Timer";
import StepperComponent from "../components/Stepper";
import AnnouncementComponent from "../components/Announcement";

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
  },
  reselect: {
    korean: "점검요소 재선택하기"
  }
};

// <MonitorFragment
//   ruleName={ruleName}
//   data={monitor[ruleName]}
//   selected={selected}
//   onToggleBtnClick={this.toggleMonitor}/>

class MonitorFragment extends Component {
  getCount = (_data) => {
    return _data ? Object.keys(_data).length : 0;
  }

  getCountClassName = (_count) => {
    const {classes} = this.props;

    console.log(_count);

    switch(_count) {
      case 0:
        return classes.zero
      case 1:
        return classes.one
      case 2:
        return classes.two
      default:
        return classes.alert
    }
  }

  renderToggleBtn = () => {
    const {selected, onToggleBtnClick, ruleName, classes, disabled} = this.props;
    const isReselect = ruleName === "reselect";

    return (<Button
      onClick={() => onToggleBtnClick(ruleName)}
      variant="contained"
      disabled={disabled}
      color={selected ? "secondary" : "primary"}
      className={classes.monitorToggleBtn}>
      {!isReselect ? (!selected ? "점검필요" : "점검불필요") : (!selected ? "재선정필요" : "재선정불필요")}
    </Button>);
  }

  render() {
    const {data, ruleName, classes} = this.props;
    const count = this.getCount(data);
 
    return (<Card className={classes.container}>
      <div style={{fontSize: "0.85em"}}>{ruleNameEtc[ruleName].korean}</div>
      {this.renderToggleBtn()}
      <div className={this.getCountClassName(count)}>
        {count}
      </div>
    </Card>);
  }
}

const MonitorFragmentWithStyles = withStyles(MonitorFragmentStyle)(MonitorFragment);

export class Study extends Component {
  state = {
    openDetails: false,
  }

  toggleProjectDetailModal = () => {
    this.setState({openDetails: !this.state.openDetails});
  }

  toggleMonitor = (_ruleName) => {
    const {projectId} = this.props.user;
    const {uid} = this.props.authUser;
    this.props.toggleMonitor(_ruleName, uid, projectId);
  }

  clearMonitor = (_ruleName) => {
    const {projectId} = this.props.user;
    this.props.clearMonitor(_ruleName, projectId);
  }

  onTimeUp = () => {
    const {projectId} = this.props.user;
    this.props.endStudy(projectId);
  }

  onSubmitBtnClick = () => {
    const {projectId} = this.props.user;
    this.props.submitStudy(projectId);
  }

  componentWillMount = () => {
    const {projectId} = this.props.user;
    const {_dispatch, monitor} = this.props;
    listen([FB_ON_MONITOR_STATE_CHANGE, FB_ON_RULES_CHECK, FB_ON_PROJECT_START_CHANGE], _dispatch, {projectId});
  }

  renderMonitorFragments = () => {
    let fragments = [];
    const {rules} = this.props;
    const {monitor, classes} = this.props;
    const {uid} = this.props.authUser;
    const disabled = !!monitor.alertRuleName;

    console.log(monitor);

    for(let ruleName in monitor) {
      if(rules[ruleName] || ruleName === "reselect") {
        let selected = monitor[ruleName] && monitor[ruleName][uid];
        fragments.push(<MonitorFragmentWithStyles
                        disabled={disabled}
                        ruleName={ruleName}
                        data={monitor[ruleName]}
                        selected={selected}
                        key={`monitor-framents-${ruleName}`}
                        onToggleBtnClick={this.toggleMonitor}/>)
      }
    }

    return fragments;
  }

  render() {
    const {user, isNormalProject, classes, monitor} = this.props;
    const {startAt, type, state, documentURL} = this.props.project;
    const isLeader = user.role === "leader";
    const showSubmitBtn = isLeader;

    const alertRuleName = monitor.alertRuleName;
    const showDocument = !alertRuleName;

    return (
      <div>
        <Container fixed>
          <CssBaseline/>
          <Grid container className={classes.container}>
            <StepperComponent projectType={type} ruleReselect={false} projectState={state}/>
            <Grid item xs={8} className={classes.contentWrapper}>
              <Grid item xs={12}>
                <Paper className={classes.instrWrapper}>
                  {!isNormalProject ?
                    <div>
                      <p>이제부터 팀원과 함께 주어진 질문에 답변하면서 학습활동을 설계해 주시기 바랍니다.</p>
                      <p>학습활동을 설계하는 동안, 점검이 필요하다고 판단될 때 마다 아래 [점검필요] 버튼을 클릭하십시오. 점검을 원하는 학습자가 늘어나면 색과 인원수가 변경됩니다. 같은 요소에 대해 3명이상이 점검을 필요로 하는 경우, 해당 요소를 점검할 수 있도록 안내문이 제공됩니다.</p>
                      <p>학습활동 설계가 완료된 후, 사전에 지정된 학습자가 [제출하기] 버튼을 누르면 다음 단계로 넘어갑니다.</p>
                    </div>
                    :
                    <div>
                      <h4>이제부터 팀원과 주어진 질문에 답변하면서 학습활동을 설계해 주시기 바랍니다.</h4>
                      <h4>학습활동 설계가 완료된 후, 사전에 지정된 학습자가 [제출하기] 버튼을 클릭하면 다음 단계로 넘어갑니다.</h4>
                    </div>}
                </Paper>
              </Grid>

              {isNormalProject ?
              <span/> :
              <Grid item xs={12} className={classes.monitorContainer}>
                {this.renderMonitorFragments()}
              </Grid>
              }

              <Grid item xs={12}>
                {showDocument ? 
                  <iframe width="100%" height={450} src={documentURL}></iframe> :
                  <AnnouncementComponent
                    alertRuleName={alertRuleName}
                    isLeader={isLeader}
                    clearMonitor={this.clearMonitor}/>
                }
              </Grid>

              {showSubmitBtn && showDocument ?
                (<Grid item xs={12} className={classes.buttonWrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submitBtn}
                    fullWidth
                    onClick={() => this.onSubmitBtnClick()}>
                    제출하기
                  </Button>
                </Grid>) :
                <span/>}
              
            </Grid>
            <Grid item xs={4} className={classes.toolbarWrapper}>
              <Grid item xs={12}>
                <TimerComponent startAt={startAt} end={this.onTimeUp}/>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => this.toggleProjectDetailModal()}>
                  문제 다시보기
                </Button>
              </Grid>
              <ChatComponent/>
            </Grid>
          </Grid>
        </Container>
        <ProjectDetailModal
          open={this.state.openDetails}
          toggleOpen={this.toggleProjectDetailModal}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.meta.project,
    user: state.meta.user,
    monitor: state.monitor,
    authUser: state.meta.authUser,
    rules: state.rules,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _dispatch: dispatch,
    toggleMonitor: (_ruleName, _uid, _projectId) => dispatch(toggleMonitor(_ruleName, _uid, _projectId)),
    submitStudy: (_projectId) => submitStudy(_projectId),
    endStudy: (_projectId) => endStudy(_projectId),
    clearMonitor: clearMonitor
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(StudyStyle)(Study));