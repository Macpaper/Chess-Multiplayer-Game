export default class PawnPassant {
  constructor(game, team, pawn, square) {
    this.game = game;

    this.name = 'enPassant';
    this.team = team;
    this.gameStateTeam = this.team[0];
    this.gameStatePiece = "e"; 

    this.deleted = false; // for deletion

    this.square = square; // a piece always has a square
    this.square.piece = this; // set piece property of square
    this.pawn = pawn;
    this.game.pawnEnPassant = this;
  } 
  update() {

  }



  removePiece(rPiece) {
    // get this piece's square and set the square's piece property to 'empty'. updates state!!
    rPiece.square.piece = 'empty';
    rPiece.deleted = true;
    this.game.boardState.updateState(rPiece.square.position, "ee");
  }
  draw(ctx) {
    ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
    ctx.beginPath();
    ctx.arc(this.square.x + 50, this.square.y + 50, 50, 0, Math.PI * 2, false);
    ctx.fill();
  }
}   