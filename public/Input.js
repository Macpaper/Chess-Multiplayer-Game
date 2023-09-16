export default class Input {
  constructor(game) {
    this.game = game;
    this.mouseX = 0;
    this.mouseY = 0;
    this.clicking = false;

    this.left = false;
    this.right = true;
    document.addEventListener("mousemove", e => {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
    });
    document.addEventListener("mousedown", e => {
      this.clicking = true;
    });
    document.addEventListener("mouseup", e => {
      this.clicking = false;
    });

    document.addEventListener("keydown", e => {
      this.handleKeys(e.key, true);
    });
    document.addEventListener("keyup", e => {
      this.handleKeys(e.key, false);
    });
    this.clickingCheck = false;

    this.leftCheck = false;
    this.rightCheck = false;
  }
  update() {
    if (this.left) {
      this.leftCheck = true;
    }
    if (!this.left) {
      if (this.leftCheck) {
        this.leftCheck = false;
        // set state to last state (if any state before current exists)
      }
    }
    if (this.right) {
      this.rightCheck = true;
    }
    if (!this.right) {
      if (this.rightCheck) {
        this.rightCheck = false;
        // set state to next state (if any state after current exists)
      }
    }
  }
  draw(ctx) {

    this.game.board.squares.forEach(s => {
      if (this.mouseX > s.x && this.mouseX < s.x + s.width) {
        if (this.mouseY > s.y && this.mouseY < s.y + s.height) {

          if (this.clicking) {
            this.clickingCheck = true;  
          }
          if (!this.clicking) {
            if(this.clickingCheck && !this.game.noneSelected()) {
              this.clickingCheck = false;
              this.game.pawnPromote = null;
              this.game.pieces.forEach(p => {
                if(p.name == 'pawn') {
                  p.promoteSquare = null;
                  p.drawPromotion = false;
                } 
              });

              // s.piece = this.game.selectedSquare.piece;

              if (this.game.turn == this.game.selectedSquare.piece.team) {
                if (s != this.game.selectedSquare) { // <--- MAKES SURE YOURE RELEASING ON A DIFFERENT SQUARE
                  // console.log("here 2 " + s.piece);
                  if (s.piece == 'empty') { // <---- MOVES TO EMPTY SQUARE
                    if (this.game.turn == this.game.myTurn && this.game.selectedSquare.piece.validMove(s)) {
                      // PAWN PROMOTION
                      if (this.game.selectedSquare.piece.name == 'pawn' && this.game.selectedSquare.piece.team == 'white' && s.rank == 8) { // <-- for pawn promotion
                        this.game.selectedSquare.piece.promote(s);
                      } else if (this.game.selectedSquare.piece.name == 'pawn' && this.game.selectedSquare.piece.team == 'black' && s.rank == 1) {
                        this.game.selectedSquare.piece.promote(s);
                      } else {
                        this.game.selectedSquare.piece.pieceTo(s);
  
                        // do this in socket client so that both boards update. the current turn 
                        // will update using frontend, enemy will be told to update with server 
                        // frontend will update from server message.

                        // this.game.turns += 1;
                        // this.game.turn = (this.game.turn == 'white' ? 'black' : 'white');
                        // console.log(this.game.boardState.state);
                        console.log("sending this baord info 1: ");
                        console.log(this.game.boardState.info);
                        localStorage.setItem('gameState', this.game.boardState.getState());
                        this.game.socket.emit("next turn", this.game.boardState.state, this.game.boardState.info);
                      }

                    }
                    this.unselectSquare();
                  }
                  else if (this.game.selectedSquare.piece.team != s.piece.team) {// <---CAPTURES ENEMY PIECE
                    if (this.game.turn == this.game.myTurn && this.game.selectedSquare.piece.validMove(s)) {
                      if (this.game.selectedSquare.piece.name == 'pawn' && this.game.selectedSquare.piece.team == 'white' && s.rank == 8) { // <-- for pawn promotion
                        this.game.selectedSquare.piece.promote(s);
                      }  else if (this.game.selectedSquare.piece.name == 'pawn' && this.game.selectedSquare.piece.team == 'black' && s.rank == 1) {
                        this.game.selectedSquare.piece.promote(s);
                      } else {

                        s.piece.deleted = true;
                        // s is the new square
                        // selectedSquare is the old square after this move
                        this.game.selectedSquare.piece.pieceTo(s);
                        console.log("sending this baord info 2: ");
                        console.log(this.game.boardState.info);
                        this.game.socket.emit("next turn", this.game.boardState.state, this.game.boardState.info);
                        // this.game.turns += 1;
                        // this.game.turn = (this.game.turn == 'white' ? 'black' : 'white');
                      }
                    }
                    
                    this.unselectSquare();
                  } else if (this.game.selectedSquare.piece.team == s.piece.team) {

                    this.unselectSquare();
                    this.selectSquare(s);
                    
                  }
                }  
              } else {

                this.unselectSquare();
              } 
            }
          }

          if (this.clicking) {
            
            // square isn't empty and none are already selected
            if (s.piece != 'empty' && this.game.noneSelected()) {
              this.game.board.squares.forEach(s => {
                s.selected = false;
              });
              s.selected = true;
              this.game.selectedSquare = s;
            }
            // // a piece (square really) has been selected
            // if (s.piece != 'none') {
              
            // }

          }

          ctx.fillStyle = "rgba(255,255,255,0.5)";
          ctx.fillRect(s.x, s.y, s.width, s.height);
        }
      }
    });
  }

  handleKeys(key, isPressed) {
    if (key == "ArrowLeft") {
      this.left = isPressed;
    } else if (key == "ArrowRight") {
      this.right = isPressed;
    }
  }

  unselectSquare() {
    this.game.selectedSquare.selected = false;
    this.game.selectedSquare = null;
  }

  selectSquare(s) {
    if (this.game.selectedSquare) {
      this.game.selectedSquare.selected = false;
    }
    this.game.selectedSquare = s;
    s.selected = true;
  }
}