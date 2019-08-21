import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import firebaseConfig from "../config";

let instance = null;

/* singleton Firebase */
class Firebase {
  constructor() {
    if(instance !== null) return instance;

    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    // this.auth.signOut();
    this.DB = app.database();
    instance = this;
  }
}

export default Firebase;
export const TIMESTAMP = app.database.ServerValue.TIMESTAMP;