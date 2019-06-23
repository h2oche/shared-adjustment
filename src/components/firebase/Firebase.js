import app from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  login = (_email, _password) => this.auth.signInWithEmailAndPassword(_email, _password);
  isLoggedIn = () => !!this.auth.currentUser
}

export default Firebase;