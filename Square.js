export default class Square {
  constructor(game, x, y, width, height, color, position, rank, file) {
    this.game = game;

    this.x = x;
    this.y = y;

    this.rank = rank;
    this.file = file;

    this.width = width;
    this.height = height;

    this.color = color;

    this.position = position;

    this.selected = false;
    this.piece = 'empty';  // either 'empty' string or Piece object... I think
    
    this.drawAttackW = false;
    this.drawAttackB = false;
    
    this.whiteAttackers = 0;
    this.blackAttackers = 0;
  }
  update() {
    if (this.piece != 'empty' && this.selected && this.piece != 'enPassant') {
      this.piece.showValidMoves = true;
    } else if (!this.selected && this.piece != 'empty' && this.piece != 'enPassant') {
      this.piece.showValidMoves = false;
    }
    let wAttackers = 0;
    let bAttackers = 0;
    this.game.pieces.forEach(p => {
      p.validSquares.forEach(v => {
        if (v.position == this.position) {
          if (p.team == 'white') {
            wAttackers += 1;
          }
          if (p.team == 'black') {
            bAttackers += 1;
          }
        } 
      });
    });
    this.whiteAttackers = wAttackers;
    this.blackAttackers = bAttackers;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.font = "15px serif";
    ctx.fillText(this.position, this.x, this.y + 12);
    // ctx.fillText("rank: " + this.rank, this.x + this.width - 50, this.y + 12);
    // ctx.fillText("file: " + this.file, this.x + this.width - 50, this.y + 30);
    if (this.selected) {
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "black";
      ctx.font = "15px serif";
      ctx.fillText(this.position, this.x, this.y + 12);
    }
    
  }
  drawAttacks(ctx) {
    if (this.drawAttackW) {
      ctx.fillStyle = "white";
      ctx.fillText("white: " + this.whiteAttackers, this.x, this.y + 20);
    }
    if (this.drawAttackB) {
      console.log("bigger")
      ctx.fillStyle = "black";
      ctx.fillText("black: " + this.blackAttackers, this.x + 50, this.y + 40);
    }
  }
}
