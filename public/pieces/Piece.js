import PawnPassant from "../PawnPassant.js";
export default class Piece {
  constructor(game, x, y, team = "white", square, image, updateState = false) {
    this.game = game;
    this.updateState = updateState;
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
    this.attackingSquares = []; // like valid squares but literally only for pawn holup

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
  // only used for king checks, maybe a better way to do this
  moveToSquare(newSquare) {
    // this.moveTo(square);
    
    this.square.piece = 'empty';
    newSquare.piece = this;
    this.square = newSquare;
  }
  moveTo(square) {
    this.x = square.x;
    this.y = square.y;
  }
  validMove(square) {
    let value = false;

    this.findValidSquares().forEach(v => {
      if (v.position == square.position) {
        value = true;
      }
    });

 
    // CHECKING IF A PIECE IS PINNED (this also works for checks??/)
    // if true, this means square is a valid square
    if (value) {
      // now let's say, hypothetically, you moved the piece to this square.
      let oldSquare = this.square;
      let newSquareOldPiece = square.piece;
      this.moveToSquare(square);
      
      this.game.pieces.forEach(p => {
        if (p.team != this.team && p != newSquareOldPiece) {
          let validEnemySquares = p.findValidSquares();
          validEnemySquares.forEach(s => {
            if (this.team == 'white') {
              if (s.position == this.game.whiteKing.square.position) {
                value = false;
              }
            }
            if (this.team == 'black') {
              if (s.position == this.game.blackKing.square.position) {
                value = false;
              }
            }
          });
        }
      });
      this.moveToSquare(oldSquare);
      square.piece = newSquareOldPiece;
    }
    return value;
  }

  findValidSquares() {
    // return a list of Squares
    return [];
  }

  addPieceToSquare(aPiece, square) {

  }
  removePiece(rPiece) {
    // get this piece's square and set the square's piece property to 'empty'. updates state!!
    rPiece.square.piece = 'empty';
    rPiece.deleted = true;
    this.game.boardState.updateState(rPiece.square.position, "ee");
  }

  // does a full move. moves drawing, sets square of piece to new square, sets piece of square to this, sets old square to empty
  pieceTo(square) {
    this.game.boardState.updateState(this.square.position, 'ee');
    let playEmpty = (square.piece == 'empty');

    if (this.name == 'rook') {
      if (this.position == 1) {
        this.game.boardState.info.blackCastleL = false;
      }
      if (this.position == 8) {
        this.game.boardState.info.blackCastleR = false;
      }
      if (this.position == 57) {
        this.game.boardState.info.whiteCastleL = false;
      }
      if (this.position == 64) {
        this.game.boardState.info.whiteCastleR = false;
      }
    }

    // if being en passanted?
    if (square.piece.name == 'enPassant' && this.name == 'pawn' && square.piece.team != this.game.selectedSquare.piece.team) {
      this.removePiece(square.piece.pawn);
    }
  
    // remove the en passant that exists if it does
    if (this.game.pawnEnPassant) {
      this.removePiece(this.game.pawnEnPassant);
      this.game.pawnEnPassant = null;
    } 
    

    // IF PAWN IS MOVING UP TWICE (EN PASSANT)
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

    // move square (idk what happens if i move this, maybe need to keep above castling code or change it)
    this.moveTo(square);
    this.square = square;
    square.piece = this;
    this.game.selectedSquare.piece = 'empty';

  
    // castling (change these to ez looking functions ?)
    if (this.name == 'king' && this.team == 'black' && square.position == 7) {
      // black castling right
      // if squares 6 and 7 arent being attacked: do all this
      this.game.squareMap.get(8).piece.moveTo(this.game.squareMap.get(6));
      this.game.squareMap.get(6).piece = this.game.squareMap.get(8).piece;
      this.game.squareMap.get(8).piece = 'empty';
      this.game.squareMap.get(6).piece.square = this.game.squareMap.get(6);
      this.game.boardState.updateState(8, 'ee');
      this.game.boardState.updateState(6, 'br');
    }
    if (this.name == 'king' && this.team == 'black' && square.position == 3) {
      // black castling left
      this.game.squareMap.get(1).piece.moveTo(this.game.squareMap.get(4));
      this.game.squareMap.get(4).piece = this.game.squareMap.get(1).piece;
      this.game.squareMap.get(1).piece = 'empty';
      this.game.squareMap.get(4).piece.square = this.game.squareMap.get(4);
      this.game.boardState.updateState(1, 'ee');
      this.game.boardState.updateState(4, 'br'); 
    }
    if (this.name == 'king' && this.team == 'white' && square.position == 63) {
      // white castling right
      this.game.squareMap.get(64).piece.moveTo(this.game.squareMap.get(62));
      this.game.squareMap.get(62).piece = this.game.squareMap.get(64).piece;
      this.game.squareMap.get(64).piece = 'empty';
      this.game.squareMap.get(62).piece.square = this.game.squareMap.get(62);
      this.game.boardState.updateState(64, 'ee');
      this.game.boardState.updateState(62, 'wr'); 
    }
    if (this.name == 'king' && this.team == 'white' && square.position == 59) {
      // white castling left
      this.game.squareMap.get(57).piece.moveTo(this.game.squareMap.get(60));
      this.game.squareMap.get(60).piece = this.game.squareMap.get(57).piece;
      this.game.squareMap.get(57).piece = 'empty';
      this.game.squareMap.get(60).piece.square = this.game.squareMap.get(60);
      this.game.boardState.updateState(57, 'ee');
      this.game.boardState.updateState(60, 'wr'); 
    }


    this.firstMove = false;
    if (this.name == 'king') {
      console.log("NIGGAS SET TO FALSE?");
      if (this.team == 'black') {
        this.game.boardState.info.blackCastleL = false;
        this.game.boardState.info.blackCastleR = false;
      } else {
        this.game.boardState.info.whiteCastleR = false;
        this.game.boardState.info.whiteCastleL = false;
      }
    }

    let playTake = true;
    this.game.pieces.forEach(p => {
      p.findValidSquares().forEach(v => {
        if (this.team == 'white') {
          if (v.position == this.game.blackKing.square.position) {
            this.game.pieceCheckSound.play();
            playEmpty = false;
            playTake = false;
          }
        } else {
          if (v.position == this.game.whiteKing.square.position) {
            this.game.pieceCheckSound.play();
            playEmpty = false;
            playTake = false;
          }
        }
      });
    });


    if(playEmpty) {
      this.game.pieceMoveSound.play();
    } else if (playTake) {
      this.game.pieceTakeSound.play();
    }
    

    // PAWN PROMOTION
    if (this.name == 'pawn' && this.team == 'white') {
      if (square.rank == 8) {
        console.log("PAWN PROMOTION")
      }
    }

    if (this.name == 'pawn' && this.team == 'black') {
      if (square.rank == 1) {
        console.log("PAWN PROMOTION")
      }
    }



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
  drawValidSquares(ctx) {
    this.validSquares.forEach(s => {
      let x = s.x + s.width / 2;
      let y = s.y + s.height / 2;
      this.drawMoveCircle(x, y, ctx);
    });
  }
  setValidMoves(v) {
    this.validMoves = v;
  }
}
