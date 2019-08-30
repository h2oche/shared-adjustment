import React, { Component } from 'react';
import 'typeface-roboto';
import {connect} from "react-redux";
import {userRoleConst} from "./store/reducers/meta";
import LoadingPage from "./pages/Loading";
import LoginPage from "./pages/Login";
import ProjectMainPage from "./pages/ProjectMain";
import SelectPrivateRulePage from "./pages/SelectPrivateRule";
import SelectRulePage from "./pages/SelectRule";
import StudyPage from "./pages/Study";
import RuleAcceptingPage from "./pages/RuleAccepting";
import StudyAcceptingPage from "./pages/StudyAccepting";
import CompletePage from "./pages/Complete";
import RuleReselectPage from "./pages/RuleReselect";
import AdminPage from "./pages/Admin";
import listen, {FB_ON_AUTH_STATE_CHANGE, FB_ON_PROJECT_STATE_CHANGE, projectStates} from "./store/event";

export class App extends Component {
  listenProjectState = false;

  componentWillMount = () => {
    const path = window.location.pathname;

    /* redirect to / */
    if(path !== "/") {
      window.location.replace("/");
      return;
    }

    listen([FB_ON_AUTH_STATE_CHANGE], this.props._dispatch);
  }

  componentWillReceiveProps(nextProps) {
    const {user} = nextProps;
    if(user !== null && !this.listenProjectState) {
      const {projectId} = user;
      listen([FB_ON_PROJECT_STATE_CHANGE], this.props._dispatch, {projectId});
      this.listenProjectState = true;
    }
  }

  render() {
    const {authUser, pending, user, project, rules} = this.props;
    const isNormalProject = project && project.type === "normal";

    if(pending) return <LoadingPage fragment={<p>로딩중입니다.</p>}/>;
    else if(authUser === null) return <LoginPage/>;
    else if(user.role === userRoleConst.ADMIN) return <AdminPage/>
    else if(!user.readMain) return <ProjectMainPage isNormalProject={isNormalProject}/>;
    else if(project.type === "shared") {
      if(!user.selectRule && !rules.privateSelected) return <SelectPrivateRulePage/>;
      else if(project.state === projectStates.rulePending) return <LoadingPage fragment={<p>다른 팀원들의 응답을 기다리고 있습니다.</p>}/>
      else if (project.state === projectStates.rule) return <SelectRulePage/>;
      else if (project.state === projectStates.ruleAccepting) {
        if(user.role === userRoleConst.LEADER || (project.accepting && project.accepting[authUser.uid]))
          return <LoadingPage fragment={
            <div>
              <p style={{textAlign: "center"}}>다른 팀원들이 모두 응답을 마치기를 기다리고 있습니다.</p>
              <p style={{textAlign: "center"}}>모든 팀원이 [승인함]을 클릭하면 자동으로 다음 페이지로 이동합니다.</p>
              <p style={{textAlign: "center"}}>한 명의 팀원이라도 [승인하지 않음]을 클릭할 경우 다시 이전 페이지에서 다시 점검요소를 선정합니다</p>
            </div>
          }/>
        else return <RuleAcceptingPage/>
      }
      else if (project.state === projectStates.study) return <StudyPage isNormalProject={isNormalProject}/>
      else if (project.state === projectStates.studyAccepting) {
        if(user.role === userRoleConst.LEADER || (project.accepting && project.accepting[authUser.uid]))
          return <LoadingPage fragment={
            <div>
              <p style={{textAlign: "center"}}>다른 학습자들이 모두 응답을 마치기를 기다리고 있습니다.</p>
              <p style={{textAlign: "center"}}>모든 학습자의 응답이 완료되면 자동으로 다음 페이지로 이동합니다.</p>
            </div>
          }/>
        else return <StudyAcceptingPage/>
      }
      else if(project.state === projectStates.ruleReselect) return <RuleReselectPage/>
      else if(project.state === projectStates.ruleReselectAccepting) {
        if(user.role === userRoleConst.LEADER || (project.accepting && project.accepting[authUser.uid]))
          return <LoadingPage fragment={
            <div>
              <p style={{textAlign: "center"}}>다른 팀원들이 모두 응답을 마치기를 기다리고 있습니다.</p>
              <p style={{textAlign: "center"}}>모든 팀원이 [승인함]을 클릭하면 자동으로 다음 페이지로 이동합니다.</p>
              <p style={{textAlign: "center"}}>한 명의 팀원이라도 [승인하지 않음]을 클릭할 경우 다시 이전 페이지에서 다시 점검요소를 선정합니다</p>
            </div>
          }/>
        else return <RuleAcceptingPage reselect={true}/>
      }
      else return <CompletePage/>
    }
    else if(project.type === "normal") {
      console.log("hello?")
      console.log(project.state);

      if(project.state === projectStates.rulePending) return <LoadingPage fragment={<p>다른 팀원들의 응답을 기다리고 있습니다.</p>}/>
      else if(project.state === projectStates.study) return <StudyPage isNormalProject={isNormalProject}/>
      else if(project.state === projectStates.studyAccepting) {
        if(user.role === userRoleConst.LEADER || (project.accepting && project.accepting[authUser.uid]))
          return <LoadingPage fragment={
            <div>
              <p style={{textAlign: "center"}}>다른 학습자들이 모두 응답을 마치기를 기다리고 있습니다.</p>
              <p style={{textAlign: "center"}}>모든 학습자의 응답이 완료되면 자동으로 다음 페이지로 이동합니다.</p>
            </div>
          }/>
        else return <StudyAcceptingPage/>
      }
      else return <CompletePage/>
    }

    return <CompletePage/>
  }
}

/* component props 에 필요한 redux store property */
const mapStateToProps = state => {
  const {meta, rules} = state;

  return {
    authUser: meta.authUser,
    pending: meta.pending,
    user: meta.user,
    project: meta.project,
    rules: rules
  }
};

/* component props 에 넣을 action creator
TODO: authStateChange, projectStateChange event listener 끼워넣기
*/
const mapDispatchToProps = dispatch => ({
  _dispatch: dispatch
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
