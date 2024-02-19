import Game from "./Game.js";

const canv = document.querySelector("#gameScreen");
const ctx = canv.getContext("2d");

// const WIDTH = (canv.width = screen.width);
// const HEIGHT = (canv.height = screen.height);
const WIDTH = (canv.width = window.innerWidth);
const HEIGHT = (canv.height = window.innerHeight);

let copyInput = document.querySelector("#copy-input");
let copyForm = document.querySelector("#copy-form");
let copyButton = document.querySelector("#copy-button");
let copyText = document.querySelector("#copy-text");
let link = copyInput.value = location.href;

let socket = io({autoConnect: false});


const userID = link.split('/')[4];
socket.connect();


// USELESS SESSION CODE
// // if sessionID already exists, fetch it
// const sessionID = localStorage.getItem("sessionID");
// if (sessionID) {
//   // this.usernameAlreadySelected = true;
//   // console.log("session id exists in local storage! sending...");
//   socket.auth = { sessionID, username: "name12309" };
//   socket.connect();
// } else {
//   socket.auth = { username: "name12309" };
//   socket.connect();
// }
// USELESS SESSION CODE
// socket.on("session", (sessObj) => {
//   const sessionID = sessObj.sessionID;
//   const userID = sessObj.userID;
//   socket.auth = { sessionID };
//   localStorage.setItem("sessionID", sessionID);
//   socket.userID = userID;

//   // console.log("sessionID emitted: " + sessionID);
//   // console.log("userID emitted: " + userID);
// });


let game = new Game(WIDTH, HEIGHT);
document.game = game;
let myTurn = 'black';


// if (localStorage.getItem('room') == userID) {
//   console.log("REJOINED");
//   let newState = game.boardState.convertState(localStorage.getItem('gameState'));
//   // this should ALL BE INSIDE THE SESSION STORE INSTEAD!!! COMPLETELY USELESS, NO GOOD!
//   game.boardState.setState(newState);
//   game.turns = localStorage.getItem('turns');
//   game.boardState.info.blackCastleR = localStorage.getItem('blackCastleR');
//   game.boardState.info.whiteCastleR = localStorage.getItem('whiteCastleR');
//   game.boardState.info.blackCastleL = localStorage.getItem('blackCastleL');
//   game.boardState.info.whiteCastleL = localStorage.getItem('whiteCastleL');

//   if (game.turns % 2 == 1) {
//     game.turn = 'white';
//   } else {
//     game.turn = 'black';
//   }
//   myTurn = localStorage.getItem('turn');
//   // console.log(localStorage.getItem('gameState'));
// } else {
//   console.log("NEW GAME");
//   localStorage.setItem('room', userID);
//   localStorage.setItem('gameState', game.boardState.getState());
//   localStorage.setItem('turns', game.turns);
//   // console.log(localStorage.getItem('gameState'));
// }

socket.emit('join room', userID, localStorage.getItem("whiteID"), localStorage.getItem("blackID"));
const bg = new Image();
bg.src = "/images/bg3.png";

function gameLoop() {
  ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT);  
  game.update();
  game.draw(ctx);
}

copyForm.addEventListener('submit', e => {
  e.preventDefault();
  copyInput.select();
  copyInput.setSelectionRange(0, 99999);
  // navigator.clipboard.writeText(link); ONLY WORKS IN HTTPS LMAO
  // copyButton.textContent = "Copied!";
});

socket.on("start host", (whiteID) => {
  myTurn = 'white';
  localStorage.setItem("whiteID", whiteID);
});

socket.on("black rejoins", (id, boardState, boardInfo, turn) => {
  game.myTurn = "black";
  game.turns = turn;
  // let newState = game.boardState.convertState(boardState);
  game.boardState.setState(boardState);
  game.boardState.info = boardInfo;
  if (turn % 2 == 1) {
    game.turn = 'white';
  } else {
    game.turn = 'black';
  }
  startGame();
});

socket.on("white rejoins", (id, boardState, boardInfo, turn) => {
  game.myTurn = "white";
  game.turns = turn;
  game.boardState.setState(boardState);
  game.boardState.info = boardInfo;
  if (turn % 2 == 1) {
    game.turn = 'white';
  } else {
    game.turn = 'black';
  }
  startGame();
});

socket.on("give black id", bid => {
  localStorage.setItem("blackID", bid);
});

socket.on("start game", msg => {
  game.myTurn = myTurn;
  localStorage.setItem('turn', myTurn);
  startGame();
});

function startGame() {
  copyText.remove();
  copyForm.remove();
  copyInput.remove();
  copyButton.remove();
  game.socket = socket;
  setInterval(gameLoop, 33);
}

socket.on("testReceive", obj => {
  console.log("SHOULD PRINT CATS!!");
  console.log(obj.someObject.lol);
});

socket.on("increment turn", (state, info) => {

  game.turns += 1;
  // SET IN SESSION STORE. LOCAL STORAGE SHOULD ONLY BE USED TO RETRIEVE GAME ID+IF YOU ARE BLACK OR WHITE!!!
  // localStorage.setItem('turns', game.turns);
  if (game.turn == 'white') {
    game.turn = 'black';
  } else {
    game.turn = 'white';
  }
  if (game.turn == game.myTurn) {
    // console.log("state before changing: ");
    // console.log(JSON.parse(JSON.stringify(game.boardState.state)));
    // console.log("just given this state:");
    // console.log(JSON.parse(JSON.stringify(state)));

    game.boardState.setState(state);
    // console.log("NOW my state is this: ");
    // console.log(JSON.parse(JSON.stringify(game.boardState.state)));

    // ALSO PUT THIS IN SESSION STORE, DON'T NEED IT HERE NO MORE
    // localStorage.setItem('gameState', game.boardState.getState());
    // localStorage.setItem('blackCastleR', info.blackCastleR);
    // localStorage.setItem('whiteCastleR', info.whiteCastleR);
    // localStorage.setItem('blackCastleL', info.blackCastleL);
    // localStorage.setItem('whiteCastleL', info.whiteCastleL);

    game.boardState.info = info;
  }
});