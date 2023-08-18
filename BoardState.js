export default class BoardState {
  constructor(game) {
    this.game = game;

    this.state = this.defaultStart();
  }

  defaultStart() {
    // structure: b = black, 2nd letter = type of piece (r = rook, n = knight, etc)
    let state = [['br', 'bn', 'bb', 'bq', 'bk', 'ee', 'ee', 'br'],
                 ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
                 ['ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee'],
                 ['ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee'],
                 ['ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee'],
                 ['ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee'],
                 ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
                 ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
                ];
    return state;
  }
  updateState(position, code) {
    let count = 1;
    for(let row = 0; row < this.state.length; row++) {
      for(let col = 0; col < this.state[0].length; col++) {
        if (count == position) {
          this.game.gameState[row][col] = code;
        } 
        count += 1;
      }
    }

    this.game.gameStates.push(this.game.gameState);
  }
  rookState() {
    let state = 
    [['br', 'ee', 'ee', 'e', 'e', 'e', 'e', 'e'],
    ['ee', 'ee', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['ee',  'ee',  'e',  'br',  'e',  'wr',  'e',  'e',],
    ['e',  'e',  'br',  'e',  'e',  'e',  'e',  'wp',],
    ['wp',  'e',  'e',  'e',  'wr',  'e',  'e',  'e',],
    ['e',  'br',  'e',  'wr',  'e',  'e',  'e',  'e',],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
   ];
   return state;
  }
}