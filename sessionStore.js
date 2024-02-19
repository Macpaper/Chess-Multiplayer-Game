class SessionStore {
  constructor() {
    this.sessions = new Map();
  }
  getSession(id) {
    return this.sessions.get(id);
  }
  addSession(id) {
    let session = new Session(id);
    this.sessions.set(id, session);
  }
}

class Session {
  constructor(id) {
    this.id = id;
    this.playerWhiteID = null;
    this.playerBlackID = null;
    this.gameStarted = false;
    this.turn = 1;
    this.boardState = [];
    this.boardInfo = {};
  }
  getBoardState() {
    return this.boardState;
  }
  // again, optimization opp would be to only update things that changed, not just receive entire array. nbd tho
  setBoardState(state) {
    this.boardState = state;
  }
  getBoardInfo() {
    return this.boardInfo;
  }
  // again, optimization opp would be to only update things that changed, not just receive entire array. nbd tho
  setBoardInfo(i) {
    this.boardInfo = i;
  }
  setGameStarted(t) {
    this.gameStarted = t;
  }
  getGameStarted() {
    return this.gameStarted;
  }
  setWhiteID(id) {
    this.playerWhiteID = id;
  }
  setBlackID(id) {
    this.playerBlackID = id;
  }
  getWhiteID() {
    return this.playerWhiteID;
  }
  getBlackID() {
    return this.playerBlackID;
  }
}



module.exports = {
  SessionStore
};


// class SessionStore {
//   findSession(id) {}
//   saveSession(id, session) {}
//   findAllSessions() {}
// }

// class InMemorySessionStore extends SessionStore {
//   constructor() {
//     super();
//     this.sessions = new Map();
//   }

//   findSession(id) {
//     return this.sessions.get(id);
//   }

//   saveSession(id, session) {
//     this.sessions.set(id, session);
//   }

//   findAllSessions() {
//     return [...this.sessions.values()];
//   }
// }