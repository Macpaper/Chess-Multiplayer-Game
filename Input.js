export default class Input {
  constructor(game) {
    this.game = game;
    this.mouseX = 0;
    this.mouseY = 0;
    this.clicking = false;
    document.addEventListener("mousemove", e => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    document.addEventListener("mousedown", e => {
      this.clicking = true;

      this.game.whiteButton.clicking = true;
      this.game.blackButton.clicking = true;
    });
    document.addEventListener("mouseup", e => {
      this.clicking = false;
      this.game.whiteButton.clicking = false;
      this.game.blackButton.clicking = false;
    });

    this.clickingCheck = false;
  }
  update() {

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
              
              // s.piece = this.game.selectedSquare.piece;

              // console.log(this.game.selectedSquare.piece.name);
              if (this.game.turn == this.game.selectedSquare.piece.team) {
                if (s != this.game.selectedSquare) { // <--- MAKES SURE YOURE RELEASING ON A DIFFERENT SQUARE
                  if (s.piece == 'empty') { // <---- MOVES TO EMPTY SQUARE
                    // console.log("IT IS: " + this.game.selectedSquare.piece.validMove(s));
                    if (this.game.selectedSquare.piece.validMove(s) == true) {
                      // console.log("right here");
                      this.game.selectedSquare.piece.pieceTo(s);
                      this.game.turns += 1;
                      this.game.turn = (this.game.turn == 'white' ? 'black' : 'white');
                    }
                    this.unselectSquare();
                  }
                  else if (this.game.selectedSquare.piece.team != s.piece.team) {// <---CAPTURES ENEMY PIECE

                    if (this.game.selectedSquare.piece.validMove(s)) {
                      s.piece.deleted = true;
                      // s is the new square
                      // selectedSquare is the old square after this move
                      this.game.selectedSquare.piece.pieceTo(s);

                      this.game.turns += 1;
                      this.game.turn = (this.game.turn == 'white' ? 'black' : 'white');
                    }
                    
                    this.unselectSquare();
                  } else if (this.game.selectedSquare.piece.team == s.piece.team) {
                    // check if castling here later
                    this.unselectSquare();
                    this.selectSquare(s)
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

                      // this.game.selectedSquare.piece.moveTo(s);
                      // s.piece = this.game.selectedSquare.piece;
                      // this.game.selectedSquare.piece = 'empty';