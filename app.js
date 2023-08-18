import Game from "./Game.js";

let canv = document.querySelector("canvas");
let ctx = canv.getContext("2d");

const WIDTH = (canv.width = window.innerWidth);
const HEIGHT = (canv.height = window.innerHeight);

let game = new Game(WIDTH, HEIGHT);

const bg = new Image();
// bg.src = "/images/bg1.jpeg";
// bg.src = "/images/bg2.png";
bg.src = "/images/bg3.png";

function gameLoop() {
  ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT);  
  // ctx.fillStyle = "rgb(250, 250, 250)";
  // ctx.fillRect(0, 0, WIDTH, HEIGHT);

  game.update();
  game.draw(ctx);

}

setInterval(gameLoop, 17);
