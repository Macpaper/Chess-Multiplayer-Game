import CircleGuy from "./CircleGuy.js";
import { Board as ChessBoard } from "./Board.js";
import BoardState from "./BoardState.js";

import Pawn from "./pieces/Pawn.js";
import Knight from "./pieces/Knight.js";
import Bishop from "./pieces/Bishop.js";
import Rook from "./pieces/Rook.js";
import Queen from "./pieces/Queen.js";
import King from "./pieces/King.js";
import PawnPassant from "./PawnPassant.js";

import Input from "./Input.js";
// import Button from "./Button.js";

export default class Game {
  constructor(WIDTH, HEIGHT) {
    this.pawnImgW = new Image();
    this.bishopImgW = new Image();
    this.rookImgW = new Image();
    this.knightImgW = new Image();
    this.queenImgW = new Image();
    this.kingImgW = new Image();

    this.pawnImgB = new Image();
    this.bishopImgB = new Image();
    this.rookImgB = new Image();
    this.knightImgB = new Image();
    this.queenImgB = new Image();
    this.kingImgB = new Image();

    this.pawnImgW.src = "/images/pawnW.png";
    this.bishopImgW.src = "/images/bishopW.png";
    this.rookImgW.src = "/images/rookW.png";
    this.knightImgW.src = "/images/knightW.png";
    this.queenImgW.src = "/images/queenW.png";
    this.kingImgW.src = "/images/kingW.png";

    this.pawnImgB.src = "/images/pawnB.png";
    this.bishopImgB.src = "/images/bishopB.png";
    this.rookImgB.src = "/images/rookB.png";
    this.knightImgB.src = "/images/knightB.png";
    this.queenImgB.src = "/images/queenB.png";
    this.kingImgB.src = "/images/kingB.png";

    this.pieceMoveSound = new Audio("/sounds/movePiece.mp3");
    this.pieceCheckSound = new Audio("/sounds/checkPiece.mp3");
    this.pieceTakeSound = new Audio("/sounds/takePiece.mp3");

    this.gameWidth = WIDTH;
    this.gameHeight = HEIGHT;

    // this.whiteButton = new Button(this, this.gameWidth - 100, 100, "White Attackers");
    // this.blackButton = new Button(this, this.gameWidth - 100, 200, "Black Attackers", 'black');
    this.showWhiteAttackers = false;
    this.showBlackAttackers = false;

 
    this.input = new Input(this);
    
    this.squareMap = new Map();
    this.board = new ChessBoard(this);

    this.boardState = new BoardState(this);
    this.gameState = this.boardState.state;
    this.gameStates = [];
    this.gameStates.push(this.gameState);
    this.pieces = [];

    this.selectedSquare = null;
    this.whiteKing = null;
    this.blackKing = null;
    let count = 0;
    // rank = row, file = col
    for(let rank = 0; rank < this.gameState.length; rank++) {
      for(let file = 0; file < this.gameState.length; file++) {
        // this goes IN ORDER!!
        let arr = this.gameState[rank][file].split("");
        let square = this.board.squares[count];
        let team = 'white';
        let x = this.board.squares[count].x;
        let y = this.board.squares[count].y;
        if (arr[0] != 'ee') {
          if (arr[0] == 'b') {
            team = 'black';
          }
          if (arr[1] == 'p') {
            let img = (team == 'white' ? this.pawnImgW : this.pawnImgB);
            new Pawn(this, x, y, team, square, img);
          }
          if (arr[1] == 'n') {
            let img = (team == 'white' ? this.knightImgW : this.knightImgB);
            new Knight(this, x, y, team, square, img);
          }
          if (arr[1] == 'r') {
            let img = (team == 'white' ? this.rookImgW : this.rookImgB);
            new Rook(this, x, y, team, square, img);
          }
          if (arr[1] == 'b') {
            let img = (team == 'white' ? this.bishopImgW : this.bishopImgB);
            new Bishop(this, x, y, team, square, img);
          }
          if (arr[1] == 'k') {
            let img = (team == 'white' ? this.kingImgW : this.kingImgB);
            new King(this, x, y, team, square, img);
          }
          if (arr[1] == 'q') {
            let img = (team == 'white' ? this.queenImgW : this.queenImgB);
            new Queen(this, x, y, team, square, img);
          }
        }
        count += 1;
      }
    } // out of double for loop

    this.pawnEnPassant = null;
    this.pawnPromote = null;


    this.drawCheckMate = false;
    this.turn = 'white';
    this.myTurn = null;
    this.turns = 1;
    // this.currentTurn = 'white';
  } // out of constructor
  update() {
    // show attackers got bored now
    // this.pieces.forEach(p => {
    //   if (p.team == 'white') {
    //     p.validSquares.forEach(s => {
    //       if (s != 'none') {
    //         s.drawAttackW = !s.drawAttackW;
    //       }
          
    //     });
    //   }
    // });

    // this.game.pieces.forEach(p => {
    //   if (p.team == 'black') {
    //     p.validSquares.forEach(s => {
    //       if (s != 'none') {
    //         s.drawAttackB = !s.drawAttackB;
    //       }
    //     });
    //   }
    // });

    this.pieces = this.pieces.filter(p => !p.deleted);


    this.pieces.forEach((p) => {
      p.update();
    });
    if (this.pawnEnPassant) {
      this.pawnEnPassant.update();
    }
    if (this.pawnPromote) {
      this.pawnPromote.update();
    }
    this.board.update();
    this.input.update();
    // this.whiteButton.update();
    // this.blackButton.update();

    let checkmateDraw = true;
    let checkmate = false;
    this.pieces.forEach(p => {
      if (p.team == this.turn) {
        p.findValidSquares().forEach(s => {
          if (p.validMove(s)) {
            checkmateDraw = false;
          }
        });
      }
    });
    if (checkmateDraw) {
      if (this.turn == 'white') {
        this.pieces.forEach(p => {
          if (p.team == 'black') {
            p.findValidSquares().forEach(v => {
              if (v.position == this.whiteKing.square.position) {
                checkmate = true;
              }
            });
          }
        });
      }
      if (this.turn == 'black') {
        this.pieces.forEach(p => {
          if (p.team == 'white') {
            p.findValidSquares().forEach(v => {
              if (v.position == this.blackKing.square.position) {
                checkmate = true;
              }
            });
          }
        });
      }
      if (checkmate) {
        if (this.turn == 'black') {
          console.log("WHITE WINS!! CHECKMATE!!");
          this.drawCheckMate = true;
        } else {
          console.log("BLACK WINS!! CHEKMCATRE!");
        }
      } else {
        console.log("DRAW!!!");
      }
    }
  }

  setNewState() {
    let count = 0;
    // rank = row, file = col
    // console.log(this.gameState);
    this.board.squares.forEach(s => {
      if(s.piece != 'empty') {
        s.piece.deleted = true;
        s.piece = 'empty';
      }
    });

    for(let rank = 0; rank < this.boardState.state.length; rank++) {
      for(let file = 0; file < this.boardState.state.length; file++) {
        // this goes IN ORDER!!
        let arr = this.boardState.state[rank][file].split("");
        let square = this.board.squares[count];
        let team = 'white';
        let x = this.board.squares[count].x;
        let y = this.board.squares[count].y;
        if (arr[0] != 'ee') {
          if (arr[0] == 'b') {
            team = 'black';
          }
          if (arr[1] == 'p') {
            let img = (team == 'white' ? this.pawnImgW : this.pawnImgB);
            new Pawn(this, x, y, team, square, img);
          }
          if (arr[1] == 'n') {
            let img = (team == 'white' ? this.knightImgW : this.knightImgB);
            new Knight(this, x, y, team, square, img);
          }
          if (arr[1] == 'r') {
            let img = (team == 'white' ? this.rookImgW : this.rookImgB);
            new Rook(this, x, y, team, square, img);
          }
          if (arr[1] == 'b') {
            let img = (team == 'white' ? this.bishopImgW : this.bishopImgB);
            new Bishop(this, x, y, team, square, img);
          }
          if (arr[1] == 'k') {
            let img = (team == 'white' ? this.kingImgW : this.kingImgB);
            new King(this, x, y, team, square, img);
          }
          if (arr[1] == 'q') {
            let img = (team == 'white' ? this.queenImgW : this.queenImgB);
            new Queen(this, x, y, team, square, img);
          }
          // en passant
        }
        count += 1;
      }
    } // out of double for loop

    count = 0;
    for(let rank = 0; rank < this.boardState.state.length; rank++) {
      for(let file = 0; file < this.boardState.state.length; file++) {
        // this goes IN ORDER!!
        let arr = this.boardState.state[rank][file].split("");
        let square = this.board.squares[count];
        let team = 'white';
        let x = this.board.squares[count].x;
        let y = this.board.squares[count].y;
        if (arr[0] != 'ee') {
          if (arr[0] == 'b') {
            team = 'black';
          }
          if (arr[1] == 'e' && arr[0] != 'e') {
            let pawn;
            if (arr[0] == 'b') {
              console.log("square b: " + (square.position + 8));
              // en passant is created before pawn is created here. need to do this.
              pawn = this.squareMap.get(square.position + 8).piece
            } else {
              
              console.log("square w: " + (square.position - 8));
              pawn = this.squareMap.get(square.position - 8).piece
            }
            console.log("adding en passant to? " + square.position);
            console.log(pawn);
            new PawnPassant(this, team, pawn, this.squareMap.get(square.position));
          }
        }
        count += 1;
      }
    } // out of double for loop

    console.log("NEW STATE: ");
    console.log(this.boardState.state);
  }

  draw(ctx) {;
    this.board.draw(ctx);

    this.pieces.forEach((p) => {
      p.draw(ctx);
    });

    this.pieces.forEach(p => {
      if (p.showValidMoves) {
        p.drawValidSquares(ctx);
      }
    });
    if (this.pawnEnPassant) {
      this.pawnEnPassant.draw(ctx);
    }

    if (this.pawnPromote) {
      this.pawnPromote.draw(ctx);
    }

    this.board.drawAttackers(ctx);
    this.input.draw(ctx)
    
    ctx.fillStyle = "white";
    ctx.font = "bold 32px monospace";
    ctx.fillText("Current turn: " + this.turn, 25, 50);

    if (this.drawCheckMate) {
      console.log("HUH");
      if (this.turn == 'black') {
        console.log("HI");
        ctx.fillStyle = "white";
        ctx.fillText("WHITE WINS!!!", 100, 200);
      } else {
        ctx.fillStyle = "black";
        ctx.fillText("BLACK WINS!!", 100, 200);
      }
    }

  }


  noneSelected() {
    let anySelected = false;
    this.board.squares.forEach(s => {
      if (s.selected) {
        anySelected = true;
      }
    });
    return !anySelected;
  }
  removeArr(arr, element) {
    let index = arr.indexOf(element);
    if (index > -1) {
      arr.splice(index, 1);  
    }
  }
}
    // this.pawnPositionsWhite = ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'];
    // this.pawnPositionsBlack = ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'];