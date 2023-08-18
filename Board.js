import Square from "./Square.js";
class Board {
  constructor(game, width = 800, height = 800, squareNum = 8) {
    // top left of board (idk if that's the best way to do it)
    this.game = game;
    this.x = this.game.gameWidth / 4 + 200;
    this.y = 50;
    this.width = width;
    this.height = height;

    this.squareNum = squareNum;
    this.squareWidth = this.width / this.squareNum;
    this.squareHeight = this.height / this.squareNum;

    this.squares = [];
    let count = 1;

    let ranks = [8, 7, 6, 5, 4, 3, 2, 1];
    let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    this.color1 = "rgb(200, 200, 200)";
    this.color2 = "rgb(100, 175, 200)";
    // make the Squares
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
    // console.log("# of squares: " + this.squares.length)


    // add the pawns
    

    // add rooks

    // add queen

    // add bishops

    // add knights

    // add king

  }
  update() {
    this.squares.forEach(s => s.update());
  }
  draw(ctx) {

    
    this.squares.forEach(s => s.draw(ctx));
  }

  drawAttackers(ctx) {
   this.squares.forEach(s => { s.drawAttacks(ctx) }); 
  }
}

export { Board };