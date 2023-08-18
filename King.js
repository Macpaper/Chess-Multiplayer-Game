import Piece from "./Piece.js";
export default class King extends Piece {
  constructor(game, x, y, team, square, image) {
    super(game, x, y, team, square, image);
    this.name = 'king';
    this.inCheck = false;
    this.gameStatePiece = "k";
  }
  update() {
    let kingMoves = [-9, -8, -7, 1, 9, 8, 7, -1];
    let arr = [];
    let nextPos = this.square.position;
    if (nextPos % 8 == 1) {
      this.game.removeArr(kingMoves, -9);
      this.game.removeArr(kingMoves, -1);
      this.game.removeArr(kingMoves, 7);
    }
    if (nextPos < 9) {
      this.game.removeArr(kingMoves, -9);
      this.game.removeArr(kingMoves, -8);
      this.game.removeArr(kingMoves, -7);
    }
    if (nextPos % 8 == 0) {
      this.game.removeArr(kingMoves, -7);
      this.game.removeArr(kingMoves, 1);
      this.game.removeArr(kingMoves, 9);
    }
    if (nextPos > 56) {
      this.game.removeArr(kingMoves, 9);
      this.game.removeArr(kingMoves, 8);
      this.game.removeArr(kingMoves, 7);
    }
    
    for(let i = 0; i < kingMoves.length; i++) {
      let squareMove = this.game.squareMap.get(this.square.position + kingMoves[i]);
      if (squareMove.piece == 'empty' || squareMove.piece.team != this.team) {
        arr.push(squareMove);
      }
    }
    
    if (this.team == 'black') {
      // castling right
      let squareRook1 = this.game.squareMap.get(8);
      if (squareRook1.piece.name == 'rook' && squareRook1.piece.firstMove && this.firstMove) {
        // console.log("here 3");
        if (this.game.squareMap.get(6).piece == 'empty' && this.game.squareMap.get(7).piece == 'empty') {
          // console.log("here 2");
          if (this.game.squareMap.get(6).whiteAttackers < 1 && this.game.squareMap.get(7).whiteAttackers < 1) {
            arr.push(this.game.squareMap.get(7));
            // console.log("here 1");
          }
        }
      }

      // castling left

      let squareRook2 = this.game.squareMap.get(1);
      if (squareRook2.piece.name == 'rook' && squareRook2.piece.firstMove && this.firstMove) {
        // console.log("here 3");
        if (this.game.squareMap.get(2).piece == 'empty' && this.game.squareMap.get(3).piece == 'empty' && this.game.squareMap.get(4).piece == 'empty') {
          // console.log("here 2");
          if (this.game.squareMap.get(2).whiteAttackers < 1 && this.game.squareMap.get(3).whiteAttackers < 1 && this.game.squareMap.get(4).whiteAttackers < 1) {
            arr.push(this.game.squareMap.get(3));
            // console.log("here 1");
          }
        }
      }

    }

    this.validSquares = arr;
  } // outside update


  // draw(ctx) {
  //   if (this.team == 'white') {
  //     ctx.fillStyle = "gold";
  //     ctx.fillRect(this.x + this.offSetX, this.y + this.offSetY, this.width, this.height);
  //     ctx.fillStyle = "black";
  //     ctx.fillText("W King", this.x + this.offSetX * 2, this.y + this.offSetY * 4);
  //   } 
  //   if (this.team == 'black') {
  //     ctx.fillStyle = "yellow";
  //     ctx.fillRect(this.x + this.offSetX, this.y + this.offSetY, this.width, this.height);
  //     ctx.fillStyle = "black";
  //     ctx.fillText("B King", this.x + this.offSetX * 2, this.y + this.offSetY * 4);
  //   }
  // }
}