import Piece from "./Piece.js";
export default class Knight extends Piece {
  constructor(game, x, y, team, square, image) {
    super(game, x, y, team, square, image);
    this.name = 'knight';
    this.gameStatePiece = "n";
  }
  update() {
    let arr = [];
    // clockwise: top two, right, down, left
    let knightMoves = [-17, -15, -6, 10, 17, 15, 6, -10];
    // if knight is on almost left edge
    let nextPos = this.square.position;
    if (nextPos % 8 == 1 || nextPos % 8 == 2) {
      this.game.removeArr(knightMoves, -10);
      this.game.removeArr(knightMoves, 6);
    } 
    // if knight is on very left edge
    if (nextPos % 8 == 1) {
      this.game.removeArr(knightMoves, -17);
      this.game.removeArr(knightMoves, 15);
    }

    // if knight is on almost right edge
    if (nextPos % 8 == 0 || nextPos % 8 == 7) {
      this.game.removeArr(knightMoves, -6);
      this.game.removeArr(knightMoves, 10);
    } 
    // if knight is on very right edge
    if (nextPos % 8 == 0) {
      this.game.removeArr(knightMoves, -15);
      this.game.removeArr(knightMoves, 17);
    } 
    // if knight is on almost top edge
    if (nextPos < 17) {
      this.game.removeArr(knightMoves, -17);
      this.game.removeArr(knightMoves, -15);
    } 
    // if knight is on top edge
    if (nextPos < 9) {
      this.game.removeArr(knightMoves, -10);
      this.game.removeArr(knightMoves, -6);
    } 
    // if knight is on almost bottom edge
    if (nextPos > 48) {
      this.game.removeArr(knightMoves, 15);
      this.game.removeArr(knightMoves, 17);
    } 
    // if knight is on bottom edge
    if (nextPos > 56) {
      this.game.removeArr(knightMoves, 6);
      this.game.removeArr(knightMoves, 10);
    } 
    for(let i = 0; i < knightMoves.length; i++) {
      // console.log(nextPos + knightMoves[i]);
      let potentialSquare = this.game.squareMap.get(nextPos + knightMoves[i]);
      if (potentialSquare.piece == 'empty' || potentialSquare.piece.team != this.team) {
        arr.push(this.game.squareMap.get(nextPos + knightMoves[i]));
      }
    }
    this.validSquares = arr;
  }
  // draw(ctx) {
  //   if (this.team == 'white') {
  //     ctx.fillStyle = "brown";
  //     ctx.fillRect(this.x + this.offSetX, this.y + this.offSetY, this.width, this.height);
  //     ctx.fillStyle = "black";
  //     ctx.fillText("W Knight", this.x + this.offSetX * 2, this.y + this.offSetY * 4);
  //   } 
  //   if (this.team == 'black') {
  //     ctx.fillStyle = "purple";
  //     ctx.fillRect(this.x + this.offSetX, this.y + this.offSetY, this.width, this.height);
  //     ctx.fillStyle = "black";
  //     ctx.fillText("B Knight", this.x + this.offSetX * 2, this.y + this.offSetY * 4);
  //   }
  // }
}