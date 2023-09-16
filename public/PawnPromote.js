import Knight from "./pieces/Knight.js";
import Bishop from "./pieces/Bishop.js";
import Rook from "./pieces/Rook.js";
import Queen from "./pieces/Queen.js";

export default class PawnPromote {
  constructor(game, square, pawn) {
    this.game = game;
    this.square = square;
    this.pawn = pawn;

    this.x = 350;
    this.y = 350;
    this.width = square.width;
    this.height = square.height;

    this.color = "rgba(50, 50, 50, 0.5)";

    console.log("pawn promote created");
    this.game.pawnPromote = this;
    this.clicking = false;
    this.clickingCheck = false;

    this.deleted = false;
  }

  update() {
    this.clicking = this.game.input.clicking;
  }
  draw(ctx) {
    ctx.fillStyle = "rgba(50,50,50, 0.5)";
    ctx.fillRect(this.x, this.y, this.width, this.height*4);
    let img = this.game.queenImgW;
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
    img = this.game.rookImgW;
    ctx.drawImage(img, this.x, this.y + this.height, this.width, this.height);
    img = this.game.knightImgW;
    ctx.drawImage(img, this.x, this.y + this.height*2, this.width, this.height);
    img = this.game.bishopImgW;
    ctx.drawImage(img, this.x, this.y + this.height*3, this.width, this.height);

    let team = this.pawn.team;

    let mX = this.game.input.mouseX;
    let mY = this.game.input.mouseY;
    if (mX > this.x && mX < this.x + this.width) {
      if(mY > this.y && mY < this.y + this.height) {
        ctx.fillStyle = "rgba(150, 50, 50, 0.75)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.clicking) {
          // console.log("create queen");
          this.clicking = false;
          if (this.square.piece != 'empty') {
            this.square.piece.deleted = true;
          }
          let img = (team == 'white' ? this.game.queenImgW : this.game.queenImgB);
          if (this.square.piece != 'empty') {
            this.square.piece.deleted = true;
            this.square.piece = 'empty';
          }
          new Queen(this.game, this.square.x, this.square.y, this.pawn.team, this.square, img, true);
          this.game.pawnPromote = null;
          this.pawn.removePiece(this.pawn);
          this.game.socket.emit("next turn", this.game.boardState.state, this.game.boardState.info);
          // this.game.turns += 1;
          // this.game.turn = (this.game.turn == 'white' ? 'black' : 'white');
        }
      }
      if(mY > this.y + this.height && mY < this.y + this.height * 2) {
        ctx.fillStyle = "rgba(50, 150, 50, 0.75)";
        ctx.fillRect(this.x, this.y + this.height, this.width, this.height);
        if (this.clicking) {
          // console.log("create rook");
          this.clicking = false;
          if (this.square.piece != 'empty') {
            this.square.piece.deleted = true;
            this.square.piece = 'empty';
          }
          let img = (team == 'white' ? this.game.rookImgW : this.game.rookImgB);
          new Rook(this.game, this.square.x, this.square.y, this.pawn.team, this.square, img, true)
          this.game.pawnPromote = null;
          this.pawn.removePiece(this.pawn);
          this.game.socket.emit("next turn", this.game.boardState.state, this.game.boardState.info);
          // this.game.turns += 1;
          // this.game.turn = (this.game.turn == 'white' ? 'black' : 'white');
          // UPDATE STATE TO ADD NEW PIECE TOO!!! DONT FORGET
        }
      }
      if(mY > this.y + this.height * 2 && mY < this.y + this.height * 3) {
        ctx.fillStyle = "rgba(50, 50, 150, 0.75)";
        ctx.fillRect(this.x, this.y + this.height * 2, this.width, this.height);
        
        if (this.clicking) {
          // console.log("create kngiht");
          this.clicking = false;
          if (this.square.piece != 'empty') {
            this.square.piece.deleted = true;
            this.square.piece = 'empty';
          }
          let img = (team == 'white' ? this.game.knightImgW : this.game.knightImgB);
          new Knight(this.game, this.square.x, this.square.y, this.pawn.team, this.square, img, true);
          this.game.pawnPromote = null;
          this.pawn.removePiece(this.pawn);
          this.game.turns += 1;
          this.game.turn = (this.game.turn == 'white' ? 'black' : 'white');
        }
      }
      if(mY > this.y + this.height * 3 && mY < this.y + this.height * 4) {
        ctx.fillStyle = "rgba(150, 150, 50, 0.75)";
        ctx.fillRect(this.x, this.y + this.height * 3, this.width, this.height);
        if (this.clicking) {
          // console.log("create bishop");
          this.clicking = false;
          if (this.square.piece != 'empty') {
            this.square.piece.deleted = true;
            this.square.piece = 'empty';
          }
          let img = (team == 'white' ? this.game.bishopImgW : this.game.bishopImgB);
          new Bishop(this.game, this.square.x, this.square.y, this.pawn.team, this.square, img, true);
          this.game.pawnPromote = null;
          this.pawn.removePiece(this.pawn);
          this.game.turns += 1;
          this.game.turn = (this.game.turn == 'white' ? 'black' : 'white');
        }
      }
    }


  }
}