import React, { Component } from 'react';
import {Route} from "react-router-dom";
import Rule from "../components/Rule";
import NeedAuth from "../components/NeedAuth";

export class Rules extends Component {
  render() {
    

    return (
      <div>
        <NeedAuth/>
        Rules
        <Route exact path={`${this.props.match.url}/:projectId`} component={Rule}/>
      </div>
    )
  }
}

export default Rules
