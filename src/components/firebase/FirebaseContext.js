import React from "react";
const FirebaseContext = React.createContext(null);
export const withFirebase = _component => _props => (
  <FirebaseContext.Consumer>
    {firebase => <_component {..._props} firebase={firebase}></_component>}
  </FirebaseContext.Consumer>
);
export default FirebaseContext;