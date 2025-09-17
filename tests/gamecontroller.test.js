const GameController = require('../src/gameController.js');
const GameBoard = require('../src/gameboard.js');

describe('Set up GameController', () => {
    test('initializes with correct gameboards', () => {
        const controller = new GameController();
        expect(controller.playerGameboard).toBeInstanceOf(GameBoard);
        expect(controller.computerGameboard).toBeInstanceOf(GameBoard);
    });

});