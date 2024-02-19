const express = require('express');
const app = express();
const http = require('http');

const port = 3000;
const server = http.createServer(app);

app.use(express.static('public'));

const { Server } = require('socket.io');
const io = new Server(server);

const crypto = require('crypto');
const randomId = () => crypto.randomBytes(8).toString("hex");

const { SessionStore } = require("./sessionStore.js");
const sessionStore = new SessionStore();

// everything happens in this order!!
app.get('/', getIdRedirect); // redirects to /game/:gameId
app.use('/game', express.static(__dirname + '/public'));
app.get('/game/:gameId', sendIndexFile);
// io.use(sessionCheckMW); // once redirected, check session?
io.on('connection', onConnect);

// function sessionCheckMW(socket, next) {
  // console.log("number of sessions in store: " + sessionStore.sessions.size);
  // const sessionID = socket.handshake.auth.sessionID;
  
  // if (sessionID) {
  //   console.log("user has a session: ");
  //   console.log(socket.handshake.auth);
  //   const session = sessionStore.findSession(sessionID);
  //   if (session) {
  //     console.log("found session! rejoining...");
  //     console.log(session.userID);
  //     socket.sessionID = sessionID;
  //     socket.userID = session.userID;
  //     socket.username = session.username;
  //     return next();
  //   }
  // }
  // console.log("session not found! either server doesn't have it or user doesn't have it. getting username...");
  // const username = socket.handshake.auth.username;
  
  // if (!username) {
  //   console.log("ERROR: INVALID USERNAME");
  //   return next(new Error("invalid username"));
  // } else {
  //   console.log("username: " + username);
  // }
  // socket.sessionID = randomId();
  // socket.userID = randomId();
  // socket.username = username;
  // next();
// }

function onConnect(socket) {
  console.log("socket connected");
  // sessionStore.saveSession(socket.sessionID, {
  //   userID: socket.userID,
  //   username: socket.username,
  //   connected: true
  // });

  // const sessObj = {
  //   sessionID: socket.sessionID,
  //   userID: socket.userID,
  // };

  // socket.emit("session", sessObj);

  socket.on('join room', onJoinRoom);
  socket.on('next turn', onNextTurn);
  socket.on("disconnect", onDisconnect);

  async function onJoinRoom(roomID, socketWhiteID, socketBlackID) {
    for (let room of socket.rooms) {
      socket.leave(room);
    }
    socket.join(roomID);
    const sockets = await io.in(roomID).fetchSockets();
    let sess = sessionStore.getSession(roomID)

    if (!sess) {
      sessionStore.addSession(roomID);
      sess = sessionStore.getSession(roomID);
    } else {
      if (socketWhiteID == sess.getWhiteID()) {
        console.log("White has reconnected.");
        socket.emit("white rejoins", roomID, sess.getBoardState(), sess.getBoardInfo(), sess.turn);
      }
      if (socketBlackID == sess.getBlackID()) {
        console.log("Black has reconnected.");
        socket.emit("black rejoins", roomID, sess.getBoardState(), sess.getBoardInfo(), sess.turn);
      }
    }

    if (sess) {
      if (sess.getGameStarted() == false) {
        if (sockets.length == 1) {
          let wid = crypto.randomUUID();
          socket.to(roomID).emit("start host", wid);
          sess.setWhiteID(wid);
        } else if (sockets.length == 2){
          socket.to(roomID).emit("start game", socket.id);
          let bid = crypto.randomUUID();
          sess.setGameStarted(true);
          sess.setBlackID(bid);
          socket.emit("give black id", bid);
        } else {
    
        }
      }
    }
  }

  function onNextTurn(boardState, boardInfo) {
    let [id] = socket.rooms;
    socket.to(id).emit("increment turn", boardState, boardInfo);
    let sess = sessionStore.getSession(id);
    sess.setBoardState(boardState);
    sess.setBoardInfo(boardInfo);
    sess.turn += 1;
  }

  function onDisconnect() {

  }
}






// first thing that happens
function getIdRedirect(req, res) {
  console.log("redirecting and getting id...")
  let id = crypto.randomUUID();
  res.redirect("/game/" + id);
}
// 2nd (tied) thing that happens
function sendIndexFile(req, res) {
  console.log("sending index file");
  res.sendFile(__dirname + '/index.html');
}

server.listen(port, () => {
  console.log(`Chess app listening on port ${port}`);
});