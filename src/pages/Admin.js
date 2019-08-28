import React, { Component } from 'react';
import Firebase from "../store/fb";
import {Typography, Container, Grid, CssBaseline, List, ListItem, ListItemText, Collapse, Button, TextField} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import LoadingPage from "./Loading";

const fb = new Firebase();
const ADMIN_PAGE_STATUS = {
  loading: "admin/loading",

  complete: "admin/complete"
}

export class Admin extends Component {
  state = {
    status: ADMIN_PAGE_STATUS.loading,
    open: false,
    selectedIdx: 0,
    selectedProject: null,
    projects: [],
    users: null
  }

  componentWillMount = async () => {
    const projectSnapshot = await fb.DB.ref(`/projects`).once('value');
    let projectData = projectSnapshot.val();
    let newProjectData = [];
    for(let projectName in projectData) {
      projectData[projectName].name = projectName;
      newProjectData.push(projectData[projectName]);
    }

    const userSnapshot = await fb.DB.ref(`/users`).once('value');
    let userData = userSnapshot.val();

    this.setState({...this.state, status: ADMIN_PAGE_STATUS.complete, projects:newProjectData, users: userData});
  }

  expandMenu = () => {
    let newIdx = this.state.open ? 0 : 2;
    this.setState({...this.state, open: !this.state.open, selectedIdx: newIdx});
  }

  showImageChange = () => {
    this.setState({...this.state, selectedIdx: 1});
  }

  onProjectItemSelect = (_projectData) => {
    this.setState({...this.state, selectedIdx: 2, selectedProject: _projectData});
  }

  downloadLogs = async () => {
    const {selectedProject} = this.state;
    if(!selectedProject) return;

    const chatSnapshot = await fb.DB.ref(`/chats/${selectedProject.name}`).once('value');
    const rulelogSnapshot = await fb.DB.ref(`/ruleLog/${selectedProject.name}`).once('value');

    const chatData = chatSnapshot.val();
    const rulelogData = rulelogSnapshot.val();

    let logs = [{ruleName: "rules", timestamp: 0, value: {}}];
    for(let key in chatData)
      logs.push(chatData[key]);
    for(let key in rulelogData)
      logs.push(rulelogData[key]);

    let filteredLogs = [];
    let prevIsRules = false;
    logs.forEach(_row => {
      if(_row.ruleName === "rules" && prevIsRules) return;
      prevIsRules = _row.ruleName === "rules";
      filteredLogs.push(_row);
    });

    logs = filteredLogs;
    logs.sort((obj1, obj2) => obj1.timestamp - obj2.timestamp);

    let rules = logs.filter(_row => _row.ruleName === "rules");
    let ruleIdx = 0;
    logs.forEach(_row => {
      if(_row.ruleName === "rules") {
        if(ruleIdx < rules.length - 1)
          _row.value = rules[ruleIdx+1].value;
        else
          _row.value = selectedProject.rules;
        ruleIdx += 1;
      }
    });

    const {users} = this.state;
    const whiteLists = ["communication", "positiveVibe", "reselect", "mission", "comprehension"];
    const whiteListSet = new Set();
    whiteLists.forEach(_ruleName => whiteListSet.add(_ruleName));

    let csvData = logs.map(_row => {
      var ret = [];
      if(_row.ruleName === "rules") {
        let str = '선택된 룰 : ';
        for(let ruleName in _row.value)
          if(_row.value[ruleName])
            str += `[${ruleName}], `;
        ret.push(str.substr(str, str.length-2));
      }
      else if(!_row.ruleName)
        ret = [new Date(_row.timestamp).toISOString(), _row.userName, "채팅" , "\"" + _row.content + "\""];
      else if( whiteListSet.has(_row.ruleName) )
        ret = [new Date(_row.timestamp).toISOString(), users[_row.uid].name, "모니터링", `${_row.ruleName} ${_row.value ? "해제" : "선택"}`];
    
      return ret;
    });

    const csvContent = "data:text/csv;charset=utf-8,"
                        + csvData.map(r =>  r.join(",")).join("\n");
    let encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedProject.name}-log.csv`);
    document.body.appendChild(link); // Required for FF
    link.click();
  }

  downloadChats = async () => {
    const {selectedProject} = this.state;
    if(!selectedProject) return;

    const chatSnapshot = await fb.DB.ref(`/chats/${selectedProject.name}`).once('value');
    const chatData = chatSnapshot.val();

    let csvData = [];

    for(let key in chatData) {
      let chatObj = chatData[key];
      csvData.push([new Date(chatObj.timestamp).toISOString(), chatObj.userName, "채팅", "\"" + chatObj.content + "\""]);
    }

    const csvContent = "data:text/csv;charset=utf-8,"
                        + csvData.map(r =>  r.join(",")).join("\n");
    let encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedProject.name}-chat.csv`);
    document.body.appendChild(link); // Required for FF
    link.click();
  }

  downloadDocument = () => {
    const {selectedProject} = this.state;
    if(!selectedProject) return;
    let {documentURL} = selectedProject;
    window.open(documentURL);
  }

  renderSelectedRules = () => {
    if(!this.state.selectedProject) return <span/>;
    const {selectedRules} = this.state.selectedProject;
    const {users} = this.state;

    let ret = [];
    
    for(let uid in selectedRules) {
      let str = '';
      for(let ruleName in selectedRules[uid])
        if(selectedRules[uid][ruleName])
          str += `[${ruleName}], `;
      str = str.substr(str, str.length - 2) + ' 선택';
      ret.push(<div key={`selectedRules-${uid}`}>{users[uid] ? users[uid].name : "dummy"} : {str}</div>);
    }

    return <div>{ret}</div>;
  }

  onUserNameChange = (e, uid) => {
    var newUsers = this.state.users;
    newUsers[uid].newName = e.target.value;
    this.setState({...this.state, users: newUsers})
  }

  onChangeBtnClick = async (uid) => {
    var newName = this.state.users[uid].newName;
    fb.DB.ref(`/users/${uid}/name`).set(newName);
    this.state.users[uid].name = newName;
    this.state.users[uid].newName = '';
    this.setState({...this.state});
  }

  resetProject = async() => {
    if(!this.state.selectedProject) return;
    let {name, documentURL, type} = this.state.selectedProject;

    var newProjectState = {};
    newProjectState[`/projects/${name}`] = {
      state: 'rule-pending',
      documentURL,
      type
    };
    newProjectState[`/ruleLog/${name}`] = {};
    newProjectState[`/chats/${name}`] = {};
    newProjectState[`/monitors/${name}`] = {};
    
    for(let uid in this.state.users) {
      let user = this.state.users[uid];
      if(user.projectId === name) {
        newProjectState[`/users/${uid}`] = {
          readMain: false,
          selectRule: false,
          projectId: name,
          email: user.email,
          role: user.role,
          name: user.name
        }
      }
    }
    
    await fb.DB.ref().update(newProjectState);
    alert(`프로젝트(${name})가 초기화 되었습니다`);
    window.location.reload();
  }

  renderUserInfos = () => {
    var {users} = this.state;
    var userArr = [];

    for(let uid in users) {
      users[uid].uid = uid;
      userArr.push(users[uid]);
    }

    userArr.sort((_u1, _u2) => {
      return _u1.projectId === _u2.projectId ? 0 : (_u1.projectId < _u2.projectId ? -1 : 1);
    });

    return <table>
      <thead>
        <tr>
          <th>사용자 계정(이메일)</th>
          <th>채팅창 이름</th>
          <th>변경할 이름</th>
          <th>변경</th>
        </tr>
      </thead>
      <tbody>
        {userArr.filter(_user => _user.role !== "admin").map(_user => <tr key={_user.uid}>
            <td>{_user.email}</td>
            <td>{_user.name}</td>
            <td><TextField value={_user.newName ? _user.newName : ''} onChange={e => this.onUserNameChange(e, _user.uid)}/></td>
            <td><Button onClick={e => this.onChangeBtnClick(_user.uid)}>변경하기</Button></td>
          </tr>)}
      </tbody>
    </table>
  }

  renderMainComponent = () => {
    switch(this.state.selectedIdx) {
      case 1:
        return this.renderUserInfos();
      case 2:
        if(this.state.selectedProject)
          if(this.state.selectedProject.type !== "normal")
            return <div>
              <p>프로젝트 이름 : {this.state.selectedProject.name}({this.state.selectedProject.type})</p>
              <div>
                <b>페이지 3 점검버튼 로그</b>
                {this.renderSelectedRules()}
              </div>
              
              <Button
                onClick={() => this.downloadLogs()}>
                점검버튼/채팅 로그 다운로드
              </Button>

              <Button
                onClick={this.downloadDocument}>
                실시간 공유문서 다운로드
              </Button>

              <Button
                onClick={this.resetProject}>
                프로젝트 초기화
              </Button>
            </div>
          else
            return <div>
              <p>프로젝트 이름 : {this.state.selectedProject.name}({this.state.selectedProject.type})</p>
              <Button
                onClick={() => this.downloadChats()}>
                채팅 로그 다운로드
              </Button>
              <Button
                onClick={this.downloadDocument}>
                실시간 공유문서 다운로드
              </Button>

              <Button
                onClick={this.resetProject}>
                프로젝트 초기화
              </Button>
            </div>
      default:
        return <span>메뉴를 선택해 주세요</span>
    }
  }

  renderProjectMenus = () => {
    return this.state.projects.map(_projectData => {
      const {name} = _projectData;
      return <ListItem
        key={`project-item-${name}`}
        button
        onClick={() => this.onProjectItemSelect(_projectData)}>
        <ListItemText primary={name}/>
      </ListItem>
    });
  }

  renderCompleteStatus = () => {
    const {open, selectedIdx} = this.state;

    return (
      <Container fixed>
        <CssBaseline/>
        <Grid container>
          <Grid item xs={3}>
            <List component="nav">
              <ListItem button onClick={this.showImageChange} selected={selectedIdx === 1}>
                <ListItemText primary="사용자 이름 변경하기"/>
              </ListItem>
              <ListItem button onClick={this.expandMenu} selected={selectedIdx === 2}>
                <ListItemText primary="프로젝트"/>
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} unmountOnExit timeout="auto">
                <List component="div" disablePadding>
                  {this.renderProjectMenus()}
                </List>
              </Collapse>
            </List>
          </Grid>
          <Grid item xs={9}>
            {this.renderMainComponent()}
          </Grid>
        </Grid>
        
      </Container>
    )
  }

  renderLoadingStatus = () => {
    return <LoadingPage fragment={<p>프로젝트 정보 로딩중입니다.</p>}/>
  }

  render() {
    switch(this.state.status) {
      case ADMIN_PAGE_STATUS.complete:
        return this.renderCompleteStatus();
      default:
        return this.renderLoadingStatus();
    }
  }
}

export default Admin
