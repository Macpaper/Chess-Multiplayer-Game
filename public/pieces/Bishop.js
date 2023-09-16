import Piece from "./Piece.js";
export default class Bishop extends Piece {
  constructor(game, x, y, team, square, image, updateState = false) {
    super(game, x, y, team, square, image, updateState);
    this.name = 'bishop';
    this.gameStatePiece = "b";
    if (this.updateState) {
      this.game.boardState.updateState(square.position, this.gameStateTeam + this.gameStatePiece);
    }
  }
  update() {
    this.validSquares = this.findValidSquares();
    this.attackingSquares = this.validSquares;
  }
  findValidSquares() {
    let arr = [];

    // top right
    let nextPos = this.square.position-7;
    while(nextPos > 0 && nextPos % 8 != 1) {
      if (this.game.squareMap.get(nextPos).piece != 'empty') {
        if (this.game.squareMap.get(nextPos).piece.team != this.team) {
          arr.push(this.game.squareMap.get(nextPos));
        }
        break;
      }
      arr.push(this.game.squareMap.get(nextPos));
      nextPos -= 7;
    }

    // top left
    nextPos = this.square.position-9;
    while(nextPos > 0 && nextPos % 8 != 0) {
      if (this.game.squareMap.get(nextPos).piece != 'empty') {
        if (this.game.squareMap.get(nextPos).piece.team != this.team) {
          arr.push(this.game.squareMap.get(nextPos));
        }
        break;
      }
      arr.push(this.game.squareMap.get(nextPos));
      nextPos -= 9;
    }

    // bottom left
    nextPos = this.square.position + 7;
    while(nextPos < 65 && nextPos % 8 != 0) {
      if (this.game.squareMap.get(nextPos).piece != 'empty') {
        if (this.game.squareMap.get(nextPos).piece.team != this.team) {
          arr.push(this.game.squareMap.get(nextPos));
        }
        break;
      }
      arr.push(this.game.squareMap.get(nextPos));
      nextPos += 7;
    }

    // bottom right
    nextPos = this.square.position + 9;
    while(nextPos < 65 && nextPos % 8 != 1) {
      if (this.game.squareMap.get(nextPos).piece != 'empty') {
        if (this.game.squareMap.get(nextPos).piece.team != this.team) {
          arr.push(this.game.squareMap.get(nextPos));
        }
        break;
      }
      arr.push(this.game.squareMap.get(nextPos));
      nextPos += 9;
    }

    return arr;
    
  }
}