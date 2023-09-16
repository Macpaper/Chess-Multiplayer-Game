// export default class Button {
//   constructor(game, x, y, text = "Button", team = 'white') {
//     this.game = game;
//     this.x = x;
//     this.y = y;
//     this.text = text;
//     this.width = 100;
//     this.height = 25;
//     this.color = "rgba(50, 50, 50, 0.75)";
    
//     this.clicking = false;

//     this.showTeam = team;
//   }
//   update() {

//   }
//   draw(ctx) {

//     let mX = this.game.input.mouseX;
//     let mY = this.game.input.mouseY;
//     this.color = "rgba(50, 50, 50, 0.75)";
//     if (mX > this.x && mX < this.x + this.width) {
//       if(mY > this.y && mY < this.y + this.height) {
//         this.color = "rgba(100, 100, 100, 0.75)";
//         if (this.clicking) {
//           this.clicking = false;

//           if (this.showTeam == 'white') {
//             this.game.showWhiteAttackers = !this.game.showWhiteAttackers;
//           }
//           if (this.showTeam == 'black') {
//             this.game.showBlackAttackers = !this.game.showBlackAttackers;
//           }
//         }
//       }
//     }




//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x, this.y, this.width, this.height);
//     ctx.fillStyle = "white";
//     ctx.font = "20px";
//     ctx.fillText(this.text, this.x, this.y);

//   }
// }