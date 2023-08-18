import Piece from "./Piece.js";
export default class Bishop extends Piece {
  constructor(game, x, y, team, square, image) {
    super(game, x, y, team, square, image);
    this.name = 'bishop';
    this.gameStatePiece = "b";
  }
  update() {
    // similar to rook
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

    this.validSquares = arr;

  }
  // draw(ctx) {
  //   if (this.team == 'white') {
  //     ctx.fillStyle = "green";
  //     ctx.fillRect(this.x + this.offSetX, this.y + this.offSetY, this.width, this.height);
  //     ctx.fillStyle = "black";
  //     ctx.fillText("W Bishop", this.x + this.offSetX * 2, this.y + this.offSetY * 4);
  //   } 
  //   if (this.team == 'black') {
  //     ctx.fillStyle = "darkgreen";
  //     ctx.fillRect(this.x + this.offSetX, this.y + this.offSetY, this.width, this.height);
  //     ctx.fillStyle = "black";
  //     ctx.fillText("B Bishop", this.x + this.offSetX * 2, this.y + this.offSetY * 4);
  //   }
  // }
}