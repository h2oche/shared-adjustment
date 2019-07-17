
/* initial */
AppState = {
  loggedIn: false,
  user: null,
  project: null,
  meta: "loading..",
  checkpoints: {userId: false, userId: true},
  messages: [{timestamp: 123456, userName: asdf, content: "asdfasfd"},
            {timestamp: 123456, userName: asdf, content: "asdfasfd"},
            {timestamp: 123456, userName: asdf, content: "asdfasfd"},
            {timestamp: 123456, userName: asdf, content: "asdfasfd"}],
  wiki: null
}

DB = {
  user: null,
  project: null,
  checkpoints : {
    projectId: {
      userId: false,
      userId2: true
    },
    projectId: {
      userId: false,
      userId2: true
    },
  },
  messages: {
    projectId: {
      hash: {
        timestamp: 123456,
        userName: asdf,
        content: "asdfaf"  
      },
      hash: {
        timestamp: 123456,
        userName: asdf,
        content: "asdfaf"  
      },
      hash: {
        timestamp: 123456,
        userName: asdf,
        content: "asdfaf"  
      }
    }
  }

}


