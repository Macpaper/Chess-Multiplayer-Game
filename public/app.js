import Game from "./Game.js";

const canv = document.querySelector("#gameScreen");
const ctx = canv.getContext("2d");

const WIDTH = (canv.width = screen.width);
const HEIGHT = (canv.height = screen.height);

let copyInput = document.querySelector("#copy-input");
let copyForm = document.querySelector("#copy-form");
let copyButton = document.querySelector("#copy-button");
let copyText = document.querySelector("#copy-text");
let link = copyInput.value = location.href;

let socket = io();

const userID = link.split('/')[4];
socket.emit('join room', userID);

// let socket = io();
let game = new Game(WIDTH, HEIGHT);

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

let myTurn = 'black';
socket.on("start host", () => {
  myTurn = 'white';
});

socket.on("start game", msg => {
  copyText.remove();
  copyForm.remove();
  copyInput.remove();
  copyButton.remove();

  console.log("GAME STARTED");
  game.myTurn = myTurn;
  game.socket = socket;
  setInterval(gameLoop, 33);
});

socket.on("increment turn", (state, info) => {
  game.turns += 1;
  if (game.turn == 'white') {
    game.turn = 'black';
  } else {
    game.turn = 'white';
  }
  if (game.turn == game.myTurn) {
    console.log("just given this state:");
    console.log(state);
    game.boardState.setState(state);
    game.boardState.info = info;
  }
});