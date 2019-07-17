import React, { Component } from 'react';
import {withFirebase} from "../components/firebase";

export class Chat extends Component {
  componentWillMount = async () => {
    const {firebase, userObj} = this.props;
    let snapshot = await firebase.DB.ref(`messages/${projectId}`).once('value');
    console.log(snapshot);
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default withFirebase(Chat);
