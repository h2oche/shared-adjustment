import React, { Component } from 'react';
import 'typeface-roboto';
import {HashRouter, Route} from "react-router-dom";
import MainPage from "./pages/Main";
import LoginPage from "./pages/Login";
import RulesPage from "./pages/Rules";
import StudyPage from "./pages/Study";
import CompletePage from "./pages/Complete";
import AdminPage from "./pages/Admin";


export class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/main" component={MainPage}/>
          <Route path="/rules" component={RulesPage}/>
          <Route path="/study" component={StudyPage}/>
          <Route exact path="/complete" component={CompletePage}/>
          <Route exact path="/admin" component={AdminPage}/>
        </HashRouter>
      </div>
    )
  }
}

export default App
