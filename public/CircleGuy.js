export default class CircleGuy {
  constructor(game, x, y) {
    this.x = x;
    this.y = y;
    this.r = 15;
    this.game = game;
    this.dx = Math.random() * 6 - 3;
    this.dy = Math.random() * 6 - 3;
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x - this.r <= 0 || this.x > this.game.gameWidth - this.r) {
      this.dx = -this.dx;
    }
    if (this.y - this.r <= 0 || this.y > this.game.gameHeight - this.r) {
      this.dy = -this.dy;
    }
  }
  draw(ctx) {
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
  }
}
