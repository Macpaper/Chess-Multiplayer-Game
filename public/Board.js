import Square from "./Square.js";
class Board {
  constructor(game) {
    // top left of board (idk if that's the best way to do it)
    this.game = game;
  
    this.height = this.game.gameHeight / 4 * 3;
    this.width = this.height;

    if (this.game.gameHeight > this.game.gameWidth) {
      this.width = this.game.gameWidth / 4 * 3;
      this.height = this.width;
    }

    window.addEventListener("resize", e => {
      console.log("am i resizing?");
      this.game.gameWidth = window.innerWidth;
      this.game.gameHeight = window.innerHeight;

      this.height = this.game.gameHeight / 4 * 3;
      this.width = this.height;
      
      if (this.game.gameHeight > this.game.gameWidth) {
        this.width = this.game.gameWidth / 4 * 3;
        this.height = this.width;
      }
      this.squareWidth = this.width / this.squareNum;
      this.squareHeight = this.height / this.squareNum;
    });
    

    this.x = this.game.gameWidth / 2 - this.width / 2;
    this.y = this.game.gameHeight / 2 - this.height / 2;
    this.squareNum = 8;
    this.squareWidth = this.width / this.squareNum;
    this.squareHeight = this.height / this.squareNum;

    this.squares = [];
    let count = 1;

    let ranks = [8, 7, 6, 5, 4, 3, 2, 1];
    let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    this.color1 = "rgb(200, 200, 200)";
    this.color2 = "rgb(100, 175, 200)";

    for (let j = 0; j < this.squareNum; j++) {

      for(let i = 0; i < this.squareNum; i++) {

        let color = this.color1;

        if ((i + j) % 2 == 1) {
          color = this.color2;
        }

        let rank = ranks[j];
        let file = files[i];

        let square = new Square(this.game, this.x + this.squareWidth * i, this.y + this.squareHeight * j, this.squareWidth, this.squareHeight, color, count, rank, file);
        this.game.squareMap.set(count, square);
        this.squares.push(square);

        count += 1;
      }
    }
  }

  update() {
    this.squares.forEach(s => {
      // implement user responsiveness later probably
      // s.width = this.squareWidth;
      // s.height = this.squareHeight;
      s.update()
    });
  }

  draw(ctx) {
    this.squares.forEach(s => s.draw(ctx));
  }

  drawAttackers(ctx) {
   this.squares.forEach(s => { s.drawAttacks(ctx) }); 
  }
}

export { Board };