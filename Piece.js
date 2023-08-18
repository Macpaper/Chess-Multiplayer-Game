import PawnPassant from "./PawnPassant.js";
export default class Piece {
  constructor(game, x, y, team = "white", square, image) {
    this.game = game;

    this.image = image;

    this.team = team;
    this.gameStateTeam = this.team[0];
    this.gameStatePiece = "";
    this.x = x;
    this.y = y;

    let ratio = 3/4                                     // drawing
    this.width = this.game.board.squareWidth * ratio;
    this.height = this.game.board.squareHeight * ratio;
    this.offSetX =  this.game.board.squareWidth * (1 - ratio) / 2;
    this.offSetY =  this.game.board.squareHeight * (1 - ratio) / 2;

    this.deleted = false; // for deletion

    this.square = square; // a piece always has a square
    this.square.piece = this; // set piece property of square
   
    this.showValidMoves = false;
    this.validSquares = []; // arr of Squares that piece can move to

    this.firstMove = true; // for pawn (bad design? idk)

    // add this piece to be updated in game
    this.game.pieces.push(this);
  }

  update() {
    if (this.square != 'none' && this.square.selected) {
      this.showValidMoves = true;
    } else {
      this.showValidMoves = false;
    }

    this.validSquares = this.validSquares.filter(v => {
      if (v == 'none') {
        return false;
      }
      return true;
    });

    
  }
  draw(ctx) {
      ctx.drawImage(this.image, this.x + this.offSetX, this.y + this.offSetY, this.width, this.height);
  }
  moveTo(square) {
    this.x = square.x;
    this.y = square.y;
  }
  validMove(square) {
    let value = false;

    this.validSquares.forEach(v => {
      if (v.position == square.position) {
        value = true;
      }
    });



    return value;
  }

  addPieceToSquare(aPiece, square) {

  }
  removePiece(rPiece) {
    // get this piece's square and set the square's piece property to 'empty'
    rPiece.square.piece = 'empty';
    rPiece.deleted = true;
    this.game.boardState.updateState(rPiece.square.position, "ee");
  }

  // does a full move. moves drawing, sets square of piece to new square, sets piece of square to this, sets old square to empty
  pieceTo(square) {
    this.game.boardState.updateState(this.square.position, 'ee');

    if (square.piece.name == 'enPassant' && this.name == 'pawn' && square.piece.team != this.game.selectedSquare.piece.team) {
      this.removePiece(square.piece.pawn);
    }
  
    if (this.game.pawnEnPassant) {
      this.removePiece(this.game.pawnEnPassant);
      this.game.pawnEnPassant = null;
    } 
    

    // IF PAWN IS MOVING UP TWICE
    if (this.name == 'pawn') {
      if (square.position == this.square.position - 16) {
        let pos = this.game.selectedSquare.position - 8;
        new PawnPassant(this.game, "white", this, this.game.squareMap.get(pos));
        this.game.boardState.updateState(pos, "we");
      }
      if (square.position == this.square.position + 16) {
        let pos = this.game.selectedSquare.position + 8;
        new PawnPassant(this.game, "black", this, this.game.squareMap.get(pos));
        this.game.boardState.updateState(pos, "be");
      }
    }

    // if (this.name == 'king' && this.team == 'black' && square.position == 7) {
    //   // black castling right
    //   this.game.squareMap.get(8).piece.pieceTo(this.game.squareMap.get(6));
    // }

    this.moveTo(square);

    this.firstMove = false;
    this.game.pieceMoveSound.play();

    this.square = square;
    square.piece = this;
    this.game.selectedSquare.piece = 'empty';


    this.game.boardState.updateState(square.position, this.gameStateTeam + this.gameStatePiece);
    console.log("NEW GAME STATE: ");
    console.log(this.game.gameState);
  }

  drawMoveCircle(x, y, ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(x, y, this.width / 1.5, 0, Math.PI * 2, false);
    ctx.fill();
  }
  drawValidSquares(validSquares, ctx) {
    validSquares.forEach(s => {
      let x = s.x + s.width / 2;
      let y = s.y + s.height / 2;
      this.drawMoveCircle(x, y, ctx);
    });
  }
  setValidMoves(v) {
    this.validMoves = v;
  }
}
