// const GameBoard = require('./gameboard.js');

// class GameController {
//     constructor() {
//         this.playerGameboard = new GameBoard();
//         this.computerGameboard = new GameBoard();
//         this.initComputerGameboard();
//         this.state = "setting up"; // Possible states: "setting up", "in progress", "game over"
//     }

//     printBoards() {
//         console.log('Player Board:');
//         this.playerGameboard.printBoard();
//         console.log('Computer Board:');
//         this.computerGameboard.printBoard();
//     }

//     initComputerGameboard() {
//         this.computerGameboard.placeShip(this.computerGameboard.ships[0], 0, 0, 'horizontal');
//         this.computerGameboard.placeShip(this.computerGameboard.ships[1], 1, 1, 'horizontal');
//         this.computerGameboard.placeShip(this.computerGameboard.ships[2], 2, 2, 'horizontal');
//         this.computerGameboard.placeShip(this.computerGameboard.ships[3], 3, 3, 'horizontal');
//         this.computerGameboard.placeShip(this.computerGameboard.ships[4], 4, 4, 'horizontal');
//     }
// }

// module.exports = GameController;