import React, { Component } from 'react';
import RuleTable from "../components/RuleTable";
import {Typography, Container, Grid, CssBaseline, Paper, Button, Modal} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles"
import SelectPrivateRuleStyle from "../styles/SelectPrivateRule";
import {connect} from "react-redux";
import {checkPrivateRule, submitPrivateRule} from "../store/reducers/rules";
import ProjectDetailModal from "../components/ProjectDetailModal";
import StepperComponent from "../components/Stepper";

export class SelectPriavteRule extends Component {
  state = {
    openDetails: false,
  }

  toggleOpenDetails = () => {
    this.setState({openDetails: !this.state.openDetails});
  }

  onSubmitBtnClick = () => {
    const {submitRules, privateRules} = this.props;

    let check = false;
    for(let ruleName in privateRules)
      if(privateRules[ruleName])
        check = true;
    
    if(check) submitRules();
    else alert("점검 요소를 선택하지 않았습니다.\n한 개 이상 선택해 주시기 바랍니다");
  }

  render() {
    const {privateRules, checkRule, classes} = this.props;

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
                    문제를 효과적으로 해결하기 위해서는 팀 활동의 다양한 측면에 대해 지속적으로 점검해 나가야 합니다. 
                  </Typography>
                  <Typography component="h4">
                    아래 4가지 요소는 팀 활동의 여러 측면 중 특히 중요한 점검 요소로 알려져 있습니다. 우리 팀이 주어진 문제를 함께 해결해 나가면서 어떤 측면에 보다 주의를 기울여 점검하는 것이 좋을지 선택해 주시기 바랍니다 <b>(중복선택 가능)</b>.
                  </Typography>
                  <Typography component="h4">
                    점검 요소에 대해 각자가 선택한 내용을 바탕으로, 다음 페이지에서는 우리 팀이 앞으로 학습을 진행하면서 점검해 나갈 사항에 대해 함께 결정하는 활동이 이루어질 것입니다.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper>
                  <RuleTable {...privateRules} checkRule={checkRule}/>
                </Paper>
              </Grid>
              <Grid item xs={12} className={classes.buttonWrapper}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmitBtnClick}>
                  제출하기
                </Button>
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

const mapStateToProps = (_state) => {
  return {
    privateRules: _state.rules.privateRules
  }
};

const mapDispatchToProps = (_dispatch) => {
  return {
    checkRule: (_ruleConst) => _dispatch(checkPrivateRule(_ruleConst)),
    submitRules: () => _dispatch(submitPrivateRule())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(SelectPrivateRuleStyle)(SelectPriavteRule));
