import React, { Component } from 'react';
import {withFirebase} from "./firebase";
import {Redirect} from "react-router-dom";

export class NeedAuth extends Component {
  render() {
    const isLoggedIn = this.props.firebase.isLoggedIn();

    return (
      <div>
        {!isLoggedIn ? 
          <Redirect to="/"/> :
          <span/>}
      </div>
    )
  }
}

export default withFirebase(NeedAuth);