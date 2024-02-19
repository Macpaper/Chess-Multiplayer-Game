import PawnPromote from "../PawnPromote.js";
import Piece from "./Piece.js";
export default class Pawn extends Piece {
  constructor(game, x, y, team, square, image, updateState = false) {
    super(game, x, y, team, square, image, updateState);
    this.name = 'pawn';
    this.gameStatePiece = "p";
    this.enPassantable = false;
    this.promoteSquare = null;
    this.drawPromotion = false;
    // this.square.piece = this;
    if (this.updateState) {
      this.game.boardState.updateState(square.position, this.gameStateTeam + this.gameStatePiece);
    }
  }
  update() {

    this.validSquares = this.findValidSquares();
  }

    draw(ctx) {
      super.draw(ctx);
      // if (this.drawPromotion) {
      //   ctx.fillStyle = "black";
      //   for(let i = 0; i < 4; i++) {
      //     ctx.fillRect(50, this.promoteSquare.y + i * 100, 100, 100);
      //   }
      // }
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

  findValidSquares() {
    let arr = [];
    if (this.team == 'white' && this.square.position > 8 && this.game.squareMap.get(this.square.position - 8).piece == 'empty') {
      arr.push(this.game.squareMap.get(this.square.position - 8));
    } else if (this.team == 'black' && this.square.position < 57 && this.game.squareMap.get(this.square.position + 8).piece == 'empty') {
      arr.push(this.game.squareMap.get(this.square.position + 8));
    }

    // FIRST MOVE CAN MOVE TWO SQUARES
    if (this.team == 'white' && (this.square.position <= 56 && this.square.position >= 49) && this.game.squareMap.get(this.square.position - 16).piece == 'empty' && this.game.squareMap.get(this.square.position - 8).piece == 'empty') {
      arr.push(this.game.squareMap.get(this.square.position - 16));
    } else if (this.team == 'black' && (this.square.position <= 16 && this.square.position >= 9) && this.game.squareMap.get(this.square.position + 16).piece == 'empty' && this.game.squareMap.get(this.square.position + 8).piece == 'empty') {
      arr.push(this.game.squareMap.get(this.square.position + 16));
    }

    // TAKING PIECES
    if (this.team == 'white') {
      if(this.square.position % 8 != 1 && this.square.position > 8 && this.game.squareMap.get(this.square.position - 9).piece != 'empty' && this.game.squareMap.get(this.square.position - 9).piece.team != this.team) {
        arr.push(this.game.squareMap.get(this.square.position - 9));
      }
      if (this.square.position % 8 != 0 && this.square.position > 8 && this.game.squareMap.get(this.square.position - 7).piece != 'empty' && this.game.squareMap.get(this.square.position - 7).piece.team != this.team) {
        arr.push(this.game.squareMap.get(this.square.position - 7));
      }
    }

    if (this.team == 'black') {
      if(this.square.position % 8 != 1 && this.square.position < 57 && this.game.squareMap.get(this.square.position + 7).piece != 'empty' && this.game.squareMap.get(this.square.position + 7).piece.team != this.team) {
        arr.push(this.game.squareMap.get(this.square.position + 7));
      }
      if (this.square.position % 8 != 0 && this.square.position < 57 && this.game.squareMap.get(this.square.position + 9).piece != 'empty' && this.game.squareMap.get(this.square.position + 9).piece.team != this.team) {
        arr.push(this.game.squareMap.get(this.square.position + 9));
      }
    }
    return arr;
  }

  promote(square) {
    // this.drawPromotion = true;
    this.promoteSquare = square;
    new PawnPromote(this.game, square, this);
  }
  
}