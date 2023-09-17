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

let socket = io();

const userID = link.split('/')[4];



// let socket = io();
let game = new Game(WIDTH, HEIGHT);

let myTurn = 'black';
socket.on("start host", () => {
  myTurn = 'white';
});

if (localStorage.getItem('room') == userID) {
  console.log("REJOINED");
  let newState = game.boardState.convertState(localStorage.getItem('gameState'));
  game.boardState.setState(newState);
  game.turns = localStorage.getItem('turns');
  game.boardState.info.blackCastleR = localStorage.getItem('blackCastleR');
  game.boardState.info.whiteCastleR = localStorage.getItem('whiteCastleR');
  game.boardState.info.blackCastleL = localStorage.getItem('blackCastleL');
  game.boardState.info.whiteCastleL = localStorage.getItem('whiteCastleL');

  if (game.turns % 2 == 1) {
    game.turn = 'white';
  } else {
    game.turn = 'black';
  }
  myTurn = localStorage.getItem('turn');
  console.log(localStorage.getItem('gameState'));
} else {
  console.log("NEW GAME");
  localStorage.setItem('room', userID);
  localStorage.setItem('gameState', game.boardState.getState());
  localStorage.setItem('turns', game.turns);
  console.log(localStorage.getItem('gameState'));
}

socket.emit('join room', userID);
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



socket.on("start game", msg => {
  copyText.remove();
  copyForm.remove();
  copyInput.remove();
  copyButton.remove();

  console.log("GAME STARTED");
  game.myTurn = myTurn;
  localStorage.setItem('turn', myTurn);
  game.socket = socket;

  setInterval(gameLoop, 33);
});

socket.on("increment turn", (state, info) => {
  game.turns += 1;
  localStorage.setItem('turns', game.turns);
  if (game.turn == 'white') {
    game.turn = 'black';
  } else {
    game.turn = 'white';
  }
  if (game.turn == game.myTurn) {
    console.log("just given this state:");
    console.log(state);
    game.boardState.setState(state);

    localStorage.setItem('gameState', game.boardState.getState());
    localStorage.setItem('blackCastleR', info.blackCastleR);
    localStorage.setItem('whiteCastleR', info.whiteCastleR);
    localStorage.setItem('blackCastleL', info.blackCastleL);
    localStorage.setItem('whiteCastleL', info.whiteCastleL);

    game.boardState.info = info;
  }
});