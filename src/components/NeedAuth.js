import React, { Component } from 'react';
import {withFirebase} from "./firebase";
import {Redirect} from "react-router-dom";

export class NeedAuth extends Component {
  render() {
    const isLoggedIn = this.props.firebase.isLoggedIn();
    const currentUser = this.props.firebase.auth.currentUser;

    return (
      <div>
        {JSON.stringify(currentUser)}
        {/* {!isLoggedIn ? 
          <Redirect to="/"/> :
          <span>{JSON.stringify(currentUser)}</span>} */}
      </div>
    )
  }
}

export default withFirebase(NeedAuth);