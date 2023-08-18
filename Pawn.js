import PawnPassant from "./PawnPassant.js";
import Piece from "./Piece.js";
export default class Pawn extends Piece {
  constructor(game, x, y, team, square, image) {
    super(game, x, y, team, square, image);
    this.name = 'pawn';
    this.gameStatePiece = "p";
    this.enPassantable = false;
  }
  update() {
    // MOVING ONE SQUARE UP
    if (this.team == 'white' && this.square.position > 8 && this.game.squareMap.get(this.square.position - 8).piece == 'empty') {
      this.validSquares[0] = this.game.squareMap.get(this.square.position - 8);
    } else if (this.team == 'black' && this.square.position < 57 && this.game.squareMap.get(this.square.position + 8).piece == 'empty') {
      this.validSquares[0] = this.game.squareMap.get(this.square.position + 8);
    } else {
      this.validSquares[0] = 'none';
    }

    // FIRST MOVE CAN MOVE TWO SQUARES
    if (this.team == 'white' && this.firstMove && this.game.squareMap.get(this.square.position - 16).piece == 'empty' && this.game.squareMap.get(this.square.position - 8).piece == 'empty') {
      this.validSquares[1] = this.game.squareMap.get(this.square.position - 16);
    } else if (this.team == 'black' && this.firstMove && this.game.squareMap.get(this.square.position + 16).piece == 'empty' && this.game.squareMap.get(this.square.position + 8).piece == 'empty') {
      this.validSquares[1] = this.game.squareMap.get(this.square.position + 16);
    } else {
      this.validSquares[1] = 'none';
    }

    // TAKING PIECES
    if (this.team == 'white') {
      if(this.square.position % 8 != 1 && this.square.position > 8 && this.game.squareMap.get(this.square.position - 9).piece != 'empty' && this.game.squareMap.get(this.square.position - 9).piece.team != this.team) {
        this.validSquares[2] = this.game.squareMap.get(this.square.position - 9);
      } else {
        this.validSquares[2] = 'none';
      }
      if (this.square.position % 8 != 0 && this.square.position > 8 && this.game.squareMap.get(this.square.position - 7).piece != 'empty' && this.game.squareMap.get(this.square.position - 7).piece.team != this.team) {
        this.validSquares[3] = this.game.squareMap.get(this.square.position - 7);
      } else {
        this.validSquares[3] = 'none';
      }
    }

    if (this.team == 'black') {
      if(this.square.position % 8 != 1 && this.square.position < 57 && this.game.squareMap.get(this.square.position + 7).piece != 'empty' && this.game.squareMap.get(this.square.position + 7).piece.team != this.team) {
        this.validSquares[2] = this.game.squareMap.get(this.square.position + 7);
      } else {
        this.validSquares[2] = 'none';
      }
      if (this.square.position % 8 != 0 && this.square.position < 57 && this.game.squareMap.get(this.square.position + 9).piece != 'empty' && this.game.squareMap.get(this.square.position + 9).piece.team != this.team) {
        this.validSquares[3] = this.game.squareMap.get(this.square.position + 9);
      } else {
        this.validSquares[3] = 'none';
      }
    }

    let count = 0;
  }

    draw(ctx) {
      super.draw(ctx);
      if (this.enPassantable) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        if (this.team == 'white') {

        }
        if (this.team == 'black') {

        }

        ctx.fill();
      }
    }

  // draw(ctx) {


  //   if (this.team == 'white') {
  //     ctx.drawImage(this.image, this.x + this.offSetX, this.y + this.offSetY, this.width, this.height);
  //     // ctx.fillStyle = "pink";
  //     // ctx.fillRect(this.x + this.offSetX, this.y + this.offSetY, this.width, this.height);
  //     // ctx.fillStyle = "black";
  //     // ctx.fillText("W Pawn", this.x + this.offSetX * 2, this.y + this.offSetY * 4);
  //   } 
  //   if (this.team == 'black') {
  //     ctx.fillStyle = "red";
  //     ctx.fillRect(this.x + this.offSetX, this.y + this.offSetY, this.width, this.height);
  //     ctx.fillStyle = "black";
  //     ctx.fillText("B Pawn", this.x + this.offSetX * 2, this.y + this.offSetY * 4);
  //   }


  // }
}