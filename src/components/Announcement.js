import React, { Component } from 'react';
import {Paper, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import AnnouncementStyle from "../styles/Announcement";

export class Announcement extends Component {
  onConfirmClick = () => {
    const {clearMonitor, alertRuleName} = this.props;
    clearMonitor(alertRuleName);
  }

  renderContent = () => {
    const {alertRuleName} = this.props; 
    
    switch(alertRuleName) {
      case "communication":
        return (<div>
          <p>현재 우리 팀의 많은 팀원들이 <b>[활발한 의사소통]</b> 이 이루어지고 있는지 점검해야 할 필요성을 느끼고 있습니다. </p>
          <br/>
          <p>팀 성과를 높이기 위해서는 팀 구성원들이 각자의 의견을 적극적으로 제시하고, 크고 작은 의사결정이 충분한 토론에 근거해 이루어져야 합니다.</p>
          <p>지금까지 의사결정에 팀원 모두의 의견이 적극적으로 고려되었는지 점검해 보고, 앞으로의 토론 계획을 세워봅시다.</p>
          <br/>
          <p>다음의 질문에 대해 팀원들과 함께 생각해 보시기 바랍니다.</p>
          <br/>
          <p>1. 지금까지 우리 팀원들이 의견을 적극적으로 제시한 정도를 5점으로 평가한다면 몇 점입니까?</p>
          <p>2. 지금까지 우리 팀이 의사결정을 할 때, 충분한 토론이 이루어졌는지를 5점으로 평가한다면 몇점입니까?</p>
          <p>3. 지금부터 우리 팀에서 보다 활발한 토론이 이루어지도록 하려면 어떻게 해야할까요?</p>
          <br/>
          <p>점검을 마친 후, 1번 참여자가 [점검 완료하기] 버튼을 클릭하면 과제 화면으로 돌아갑니다.</p>
        </div>);
      case "positiveVibe":
        return (<div>
          <p>현재 우리 팀의 많은 팀원들이 <b>[긍정적 팀분위기]</b> 이 이루어지고 있는지 점검해야 할 필요성을 느끼고 있습니다.</p>
          <br/>
          <p>팀 성과를 높이기 위해서는 구성원 간에 갈등이 생겼을 때, 이를 해결하기 위해 적극적으로 노력해야 합니다. 또한, 참여에 어려움을 겪는 팀원이 있는지 주의를 기울이고, 충분한 공감과 배려, 위로와 지지를 해야 합니다.</p>
          <p>지금까지 우리 팀의 분위기를 긍정적으로 유지하기 위해 적절한 노력이 이루어졌는지를 점검해 보고, 앞으로의 팀 분위기 관리 계획을 세워봅시다.</p>
          <br/>
          <p>다음의 질문에 대해 팀원들과 함께 생각해 보시기 바랍니다.</p>
          <br/>
          <p>1. 지금까지 우리 팀이 분위기를 긍정적으로 만들기 위해서 기울인 노력을 5점으로 평가한다면 몇 점입니까?</p>
          <p>2. 만약 우리 팀에 갈등이 있다면, 지금부터 어떻게 해결해 나갈 수 있습니까?</p>
          <p>3. 만약 우리 팀에서 어려움을 겪는 구성원이 있다면, 앞으로 어떠한 도움을 줄 수 있겠습니까?</p>
          <br/>
          <p>점검을 마친 후, 1번 참여자가 [점검 완료하기] 버튼을 클릭하면 과제 화면으로 돌아갑니다.</p>
        </div>);
      case "mission":
        return (<div>
          <p>현재 우리 팀의 많은 팀원들이 <b>[문제의 조건달성]</b> 이 이루어지고 있는지 점검해야 할 필요성을 느끼고 있습니다. </p>
          <br/>
          <p>팀 성과를 높이기 위해서는 주어진 문제를 해결하는 데 고려해야 할 조건, 즉 학습활동 설계에 고려해야 할 조건이 무엇이었는지, 각 조건이 어느 정도 달성되고 있는지 지속적으로 확인해야 합니다.</p>
          <p>지금까지 우리 팀이 학습활동 설계에 고려해야 하는 조건을 충분히 고려했는지 점검해 보고, 앞으로 주어진 조건을 보다 잘 반영해 학습활동을 설계하기 위한 계획을 세워봅시다.</p>
          <br/>
          <p>다음의 질문에 대해 팀원들과 함께 생각해 보시기 바랍니다.</p>
          <br/>
          <p>1. 지금까지 우리 팀이 학습활동 설계에 고려해야 할 조건을 반영한 정도를 5점으로 평가한다면 몇 점입니까?</p>
          <p>2. 지금부터 학습활동 설계의 조건을 보다 잘 만족시키기 위해서 우리 팀은 어떤 노력을 할 수 있습니까?</p>
          <br/>
          <p>점검을 마친 후, 1번 참여자가 [점검 완료하기] 버튼을 클릭하면 과제 화면으로 돌아갑니다.</p>
        </div>);
      case "comprehension":
        return (<div>
          <p>현재 우리 팀의 많은 팀원들이 <b>[팀원의 이해도 점검]</b> 이 이루어지고 있는지 점검해야 할 필요성을 느끼고 있습니다.</p>
          <br/>
          <p>팀 성과를 높이기 위해서는 모든 팀원이 학습활동 설계와 관련된 다양한 정보를 충분히 이해해야 합니다.</p>
          <p>사전에 제시된 다양한 정보, 토론 진행 중에 새롭게 제안된 아이디어 등에 대해 각 팀원이 잘 이해하고 있는가를 우리 팀이 지금까지 충분히 살펴보았는지 점검해 보고, 앞으로 팀원 모두가 학습활동 설계에 대해 전반적으로 잘 이해할 수 있도록 하기 위한 계획을 세워봅시다.</p>
          <br/>
          <p>다음의 질문에 대해 팀원들과 함께 생각해 보시기 바랍니다.</p>
          <br/>
          <p>1. 지금까지 우리 팀이 학습활동을 설계하면서, 각 팀원이 얼마나 설계 전반에 대해 잘 이해하고 있는지 확인한 정도를 5점으로 평가한다면 몇 점입니까?</p>
          <p>2. 지금부터 각 팀원이 학습활동 설계와 관련된 전반적인 사항에 대해 보다 잘 이해하도록 하기 위해서 우리 팀은 어떤 노력을 할 수 있겠습니까?</p>
          <br/>
          <p>점검을 마친 후, 1번 참여자가 [점검 완료하기] 버튼을 클릭하면 과제 화면으로 돌아갑니다.</p>
        </div>);
    }
  }

  render() {
    const {classes, isLeader} = this.props;

    return (
      <Paper className={classes.container}>
        <div className={classes.contentWrapper}>
          {this.renderContent()}
        </div>
        {isLeader ?
        <Button
          onClick={this.onConfirmClick}
          variant="contained"
          color="primary"
          fullWidth>
          점검완료
        </Button> :
        <span/>}
      </Paper>
    )
  }
}

export default withStyles(AnnouncementStyle)(Announcement);
