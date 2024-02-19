export default class BoardState {
  constructor(game) {
    this.game = game;
    this.state = this.defaultStart();

    this.info = {
      blackCastleR: true,
      whiteCastleR: true,
      blackCastleL: true,
      whiteCastleL: true
    };
    this.updated = false;
  }
  update() {

  }
  setState(state) {

    this.state = state;
    this.game.setNewState();
  }

  getState() {
    return this.state;
  }

  // used for localstorage converting. localstorage saves things as Strings, so we have to convert it back.
  convertState(stateStr) {
    let s = [];
    let pieceArr = stateStr.split(',');
    let count = 0;
    for(let i = 0; i < 8; i++) {
      let rank = [];
      for(let j = 0; j < 8; j++) {
        rank.push(pieceArr[count]);
        count += 1;
      }
      s.push(rank);
    }
    console.log(s);
    return s;
  }

  defaultStart() {
    // structure: b = black, 2nd letter = type of piece (r = rook, n = knight, etc)
    let state = [['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
                 ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
                 ['ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee'],
                 ['ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee'],
                 ['ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee'],
                 ['ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee'],
                 ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
                 ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
                ];
  //   let state = [['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
  //                ['ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee'],
  //                ['ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee'],
  //                ['ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee'],
  //                ['ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee'],
  //                ['ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee'],
  //                ['ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee'],
  //                ['ee', 'ee', 'ee', 'ee', 'wk', 'ee', 'ee', 'ee'],
  //  ];
    return state;
  }
  updateState(position, code) {
    let count = 1;
    for(let row = 0; row < this.state.length; row++) {
      for(let col = 0; col < this.state[0].length; col++) {
        if (count == position) {
          this.state[row][col] = code;
        } 
        count += 1;
      }
    }
    this.game.gameStates.push(this.game.gameState);
  }
  // some random test state
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