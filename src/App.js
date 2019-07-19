import React, { Component } from 'react';
import 'typeface-roboto';
import {connect} from "react-redux";
import {authChange} from "./store/reducers/meta";
import LoadingPage from "./pages/Loading";
import LoginPage from "./pages/Login";
import ProjectMainPage from "./pages/ProjectMain";
import ChatComponent from "./components/Chat";
import listen, {FB_ON_AUTH_STATE_CHANGE, FB_ON_PROJECT_STATE_CHANGE} from "./store/event";

const PAGES = {
  loading: "pages/loading",
  login: "pages/login",
  main: "pages/main",
}

export class App extends Component {
  componentWillMount = () => {
    const path = window.location.pathname;

    /* redirect to / */
    if(path !== "/") {
      window.location.replace("/");
      return;
    }

    listen([FB_ON_AUTH_STATE_CHANGE, FB_ON_PROJECT_STATE_CHANGE], this.props._dispatch);
  }

  render() {
    const {authUser, pending, user, project} = this.props;
    if(pending) return <LoadingPage/>;
    else if(authUser === null) return <LoginPage/>;
    else if(!user.readMain) return <ProjectMainPage/>;
    /*
    1. user의 role
    2. project type
    3. project status
    */
    // return (<div>{JSON.stringify(authUser)}}</div>);
    return <ChatComponent/>
  }
}

/* component props 에 필요한 redux store property */
const mapStateToProps = state => {
  const {meta} = state;

  return {
    authUser: meta.authUser,
    pending: meta.pending,
    user: meta.user,
    project: meta.project,
  }
};

/* component props 에 넣을 action creator
TODO: authStateChange, projectStateChange event listener 끼워넣기
*/
const mapDispatchToProps = dispatch => ({
  _dispatch: dispatch
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
