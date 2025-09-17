const GameController = require('../src/gameController.js');
const GameBoard = require('../src/gameboard.js');

describe('Set up GameController', () => {
    test('initializes with correct gameboards', () => {
        const gameController = new GameController();
        expect(gameController.playerGameboard).toBeInstanceOf(GameBoard);
        expect(gameController.computerGameboard).toBeInstanceOf(GameBoard);
    });

    
});