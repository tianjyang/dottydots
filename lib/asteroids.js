const Game = require('./game.js');
const GameView = require('./game_view.js');

let ctx = document.getElementById("game-canvas").getContext("2d");
let newGame = new Game();
let newGameView = new GameView(newGame, ctx);
newGameView.start();
