import Piece from "./Piece.js";
export default class King extends Piece {
  constructor(game, x, y, team, square, image, updateState = false) {
    super(game, x, y, team, square, image, updateState);
    this.name = 'king';
    this.inCheck = false;
    this.gameStatePiece = "k";
    if (this.team == 'black') {
      this.game.blackKing = this;
    }
    if (this.team == 'white') {
      this.game.whiteKing = this;
    }
  }
  update() {
    this.validSquares = this.findValidSquares();
    this.attackingSquares = this.validSquares;
  } // outside update

  findValidSquares() {
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
      if (this.game.boardState.info.blackCastleR) { // squareRook1.piece.name == 'rook' && 
        if (this.game.squareMap.get(6).piece == 'empty' && this.game.squareMap.get(7).piece == 'empty') {
          if (this.game.squareMap.get(6).whiteAttackers < 1 && this.game.squareMap.get(7).whiteAttackers < 1) {
            arr.push(this.game.squareMap.get(7));
          }
        }
      }

      // castling left

      // let squareRook2 = this.game.squareMap.get(1);
      if (this.game.boardState.info.blackCastleL) {
        if (this.game.squareMap.get(2).piece == 'empty' && this.game.squareMap.get(3).piece == 'empty' && this.game.squareMap.get(4).piece == 'empty') {
          if (this.game.squareMap.get(3).whiteAttackers < 1 && this.game.squareMap.get(4).whiteAttackers < 1) {
            arr.push(this.game.squareMap.get(3));
          }
        }
      }

    }
  
    if (this.team == 'white') {
      // castling right
      if (this.game.boardState.info.whiteCastleR) {
        if (this.game.squareMap.get(62).piece == 'empty' && this.game.squareMap.get(63).piece == 'empty') {
          if (this.game.squareMap.get(62).blackAttackers < 1 && this.game.squareMap.get(63).blackAttackers < 1) {
            arr.push(this.game.squareMap.get(63));
          }
        }
      }

      // castling left
      if (this.game.boardState.info.whiteCastleL) {
        if (this.game.squareMap.get(58).piece == 'empty' && this.game.squareMap.get(59).piece == 'empty' && this.game.squareMap.get(60).piece == 'empty') {
          if (this.game.squareMap.get(59).blackAttackers < 1 && this.game.squareMap.get(60).blackAttackers < 1) {
            arr.push(this.game.squareMap.get(59));
          }
        }
      }
    }

    return arr;
    
  }
}
