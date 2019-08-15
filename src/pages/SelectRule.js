import React, { Component } from 'react';
import RuleTable from "../components/RuleTable";
import {Typography, Container, Grid, CssBaseline, Paper, Button, Modal} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles"
import SelectPrivateRule from "../styles/SelectPrivateRule";
import {connect} from "react-redux";
import listen, {FB_ON_RULES_CHECK} from "../store/event";
import ProjectDetails from "../components/ProjectDetails";
import ChatComponent from "../components/Chat";
import {checkRule, submitRule} from "../store/reducers/rules";
import {userRoleConst} from "../store/reducers/meta";
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

class GraphFragment extends Component {
  renderRects() {
    const {count, ruleName} = this.props;
    var rects = [];
    for(let i = 0 ; i < count ; i++)
      rects.push(<span key={`${ruleName}-filled-${i}`}>◼</span>)
    for(let i = 0 ; i < 4 - count ; i ++)
      rects.push(<span key={`${ruleName}-empty-${i}`}>▢</span>)
    return rects;
  }

  render() {
    const {ruleName, count} = this.props;

    return <div>{ruleNameEtc[ruleName].korean} : {this.renderRects()} {count}명 ({25*count}%)</div>
  }
}

export class SelectRule extends Component {
  state = {
    openDetails: false,
  }

  selectedRules = {
    communication: 0,
    positiveVibe: 0,
    mission: 0,
    comprehension: 0,
  }

  toggleOpenDetails = () => {
    this.setState({openDetails: !this.state.openDetails});
  }

  submitRule = () => {
    const {projectId} = this.props.user;
    const {rules} = this.props;

    let check = false;
    for(let ruleName in ruleNameEtc)
      if(rules[ruleName])
        check = true;
    
    if(check) this.props.submitRule(projectId);
    else alert("점검 요소를 선택하지 않았습니다.\n한 개 이상 선택해 주시기 바랍니다");
  }

  componentWillMount = () => {
    const {_dispatch, selectedRules} = this.props;
    const {projectId} = this.props.user;
    
    for(let uid in selectedRules)
      for(let ruleName in selectedRules[uid])
        if(selectedRules[uid][ruleName])
          this.selectedRules[ruleName]++;

    listen([FB_ON_RULES_CHECK], _dispatch, {projectId})
  }

  handleCheckRule = (_ruleName) => {
    console.log(_ruleName);
    const original = this.props.rules[_ruleName];
    const {projectId} = this.props.user;
    checkRule(projectId, _ruleName, original);
  }

  renderGraph = () => {
    var fragments = [];
    for(let ruleName in this.selectedRules)
      fragments.push(<GraphFragment ruleName={ruleName} count={this.selectedRules[ruleName]} key={ruleName} />)
    return fragments;
  }

  render() {
    //user의 role, project의 공통된 rule
    const {rules, user, classes} = this.props;
    const showSubmitBtn = user.role === userRoleConst.LEADER;

    return (
      <div>
        <Container fixed>
          <CssBaseline/>
          <Grid container className={classes.container}>
            <StepperComponent/>
            <Grid item xs={8} className={classes.contentWrapper}>
              <Grid item xs={12}>
                <Paper className={classes.instrWrapper}>
                  <Typography component="h4">
                    아래 그래프는 우리 팀 구성원들이 어떤 점검 요소를 선택했는지를 보여줍니다.
                  </Typography>
                  <Typography component="h4">
                    그래프를 참고하여 우리 팀이 문제를 해결해 나가면서 어떤 요소에 특히 주의하여 점검해 나갈 것인지 팀원과 함께 토론하여 선택하시기 바랍니다 <b>(중복선택 가능)</b>.
                  </Typography>
                  <Typography component="h4">
                    선택 후, 1번 학습자가 [제출하기] 버튼을 누르면 다음 단계로 넘어갑니다.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.instrWrapper}>
                  {this.renderGraph()}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper>
                  <RuleTable {...rules} checkRule={this.handleCheckRule}/>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => this.toggleOpenDetails()}>
                문제 다시보기
              </Button>
              <ChatComponent/>
            </Grid>
          </Grid>
          
        </Container>
        <Modal
          open={this.state.openDetails}
          onClose={this.toggleOpenDetails}>
          <ProjectDetails/>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.meta.user,
    rules: state.rules,
    selectedRules: state.meta.project.selectedRules
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    _dispatch: dispatch,
    submitRule: (_projectId) => submitRule(_projectId)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(SelectPrivateRule)(SelectRule));
