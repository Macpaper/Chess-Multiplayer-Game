import Piece from "./Piece.js";
export default class Rook extends Piece {
  constructor(game, x, y, team, square, image, updateState = false) {
    super(game, x, y, team, square, image, updateState);
    this.name = 'rook';
    this.gameStatePiece = "r";
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
    
    // s is actually the key not value (position, 1,2,3,4,5,...)
    // checking right

    let nextPos = this.square.position+1;
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

    return arr;
  }

}




  // draw(ctx) {
  //   if (this.team == 'white') {
  //     ctx.fillStyle = "grey";
  //     ctx.fillRect(this.x + this.offSetX, this.y + this.offSetY, this.width, this.height);
  //     ctx.fillStyle = "black";
  //     ctx.fillText("W Rook", this.x + this.offSetX * 2, this.y + this.offSetY * 4);
  //   } 
  //   if (this.team == 'black') {
  //     ctx.fillStyle = "darkgrey";
  //     ctx.fillRect(this.x + this.offSetX, this.y + this.offSetY, this.width, this.height);
  //     ctx.fillStyle = "black";
  //     ctx.fillText("B Rook", this.x + this.offSetX * 2, this.y + this.offSetY * 4);
  //   }
  // }

    // let arr = [];
    // // s is actually the key not value (position, 1,2,3,4,5,...)
    // // checking right
    // // let currentPos = this.square.position;

    // // right
    // let nextPos = this.square.position+1;
    // while(nextPos % 8 != 1) {
    //   if (this.game.squareMap.get(nextPos).piece != 'empty') {
    //     if (this.game.squareMap.get(nextPos).piece.team != this.team) {
    //       arr.push(this.game.squareMap.get(nextPos));
    //     }
    //     break;
    //   }
    //   arr.push(this.game.squareMap.get(nextPos));
    //   nextPos+= 1;
    // }

    // // left
    // nextPos = this.square.position-1;
    // while(nextPos % 8 != 0) {
    //   if (this.game.squareMap.get(nextPos).piece != 'empty') {
    //     if (this.game.squareMap.get(nextPos).piece.team != this.team) {
    //       arr.push(this.game.squareMap.get(nextPos));
    //     }
    //     break;
    //   }
    //   arr.push(this.game.squareMap.get(nextPos));
    //   nextPos -= 1;
    // }

    // // up
    // nextPos = this.square.position-8;
    // while(nextPos > 0) {
    //   if (this.game.squareMap.get(nextPos).piece != 'empty') {
    //     if (this.game.squareMap.get(nextPos).piece.team != this.team) {
    //       arr.push(this.game.squareMap.get(nextPos));
    //     }
    //     break;
    //   }
    //   arr.push(this.game.squareMap.get(nextPos));
    //   nextPos -= 8;
    // }


    // nextPos = this.square.position+8;
    // while(nextPos < 65) {
    //   if (this.game.squareMap.get(nextPos).piece != 'empty') {
    //     if (this.game.squareMap.get(nextPos).piece.team != this.team) {
    //       arr.push(this.game.squareMap.get(nextPos));
    //     }
    //     break;
    //   }
    //   arr.push(this.game.squareMap.get(nextPos));
    //   nextPos += 8;
    // }