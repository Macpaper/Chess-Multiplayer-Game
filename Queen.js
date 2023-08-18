import Piece from "./Piece.js";
export default class Queen extends Piece {
  constructor(game, x, y, team, square, image) {
    super(game, x, y, team, square, image);
    this.name = 'queen';
    this.gameStatePiece = "q";
  }
  update() {
    // LITERALLY JUST COPY AND PASTE ROOK AND BISHOP CODE EZ
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

      // right
      nextPos = this.square.position+1;
      while(nextPos % 8 != 1) {
        if (this.game.squareMap.get(nextPos).piece != 'empty') {
          if (this.game.squareMap.get(nextPos).piece.team != this.team) {
            arr.push(this.game.squareMap.get(nextPos));
          }
          break;
        }
        arr.push(this.game.squareMap.get(nextPos));
        nextPos+= 1;
      }
  
      // left
      nextPos = this.square.position-1;
      while(nextPos % 8 != 0) {
        if (this.game.squareMap.get(nextPos).piece != 'empty') {
          if (this.game.squareMap.get(nextPos).piece.team != this.team) {
            arr.push(this.game.squareMap.get(nextPos));
          }
          break;
        }
        arr.push(this.game.squareMap.get(nextPos));
        nextPos -= 1;
      }
  
      // up
      nextPos = this.square.position-8;
      while(nextPos > 0) {
        if (this.game.squareMap.get(nextPos).piece != 'empty') {
          if (this.game.squareMap.get(nextPos).piece.team != this.team) {
            arr.push(this.game.squareMap.get(nextPos));
          }
          break;
        }
        arr.push(this.game.squareMap.get(nextPos));
        nextPos -= 8;
      }
  
  
      nextPos = this.square.position+8;
      while(nextPos < 65) {
        if (this.game.squareMap.get(nextPos).piece != 'empty') {
          if (this.game.squareMap.get(nextPos).piece.team != this.team) {
            arr.push(this.game.squareMap.get(nextPos));
          }
          break;
        }
        arr.push(this.game.squareMap.get(nextPos));
        nextPos += 8;
      }
  
      this.validSquares = arr;
  }
  // draw(ctx) {
  //   if (this.team == 'white') {
  //     ctx.fillStyle = "cyan";
  //     ctx.fillRect(this.x + this.offSetX, this.y + this.offSetY, this.width, this.height);
  //     ctx.fillStyle = "black";
  //     ctx.fillText("W Queen", this.x + this.offSetX * 2, this.y + this.offSetY * 4);
  //   } 
  //   if (this.team == 'black') {
  //     ctx.fillStyle = "hotpink";
  //     ctx.fillRect(this.x + this.offSetX, this.y + this.offSetY, this.width, this.height);
  //     ctx.fillStyle = "black";
  //     ctx.fillText("B Queen", this.x + this.offSetX * 2, this.y + this.offSetY * 4);
  //   }
  // }
}