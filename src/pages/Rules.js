import React, { Component } from 'react';
import {Route} from "react-router-dom";
import Rule from "../components/Rule";

export class Rules extends Component {
  render() {
    return (
      <div>
        Rules
        <Route exact path={`${this.props.match.url}/:projectId`} component={Rule}/>
      </div>
    )
  }
}

export default Rules
