const express = require('express');
const app = express();
const http = require('http');
const crypto = require('crypto');

const port = 3000;
const server = http.createServer(app);

app.use(express.static('public'));

const { Server } = require('socket.io');
const io = new Server(server);


app.get('/', (req, res) => {
  let id = crypto.randomUUID();
  res.redirect("/game/" + id);
});

app.use('/game', express.static(__dirname + '/public'));

app.get('/game/:gameId', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('join room', async room => {
    for (let room of socket.rooms) {
      socket.leave(room);
    }
    socket.join(room);
    const sockets = await io.in(room).fetchSockets();
    // if joining room with someone already in it
    if (sockets.length > 1) {
      socket.to(room).emit("start game", socket.id);
    } else {
      socket.emit("start host");
    }
  });

  socket.on('next turn', (boardState, boardInfo) => {
    for (let room of socket.rooms) {
      socket.to(room).emit("increment turn", boardState, boardInfo);
    }
  });

});

server.listen(port, () => {
  console.log(`Chess app listening on port ${port}`);
});