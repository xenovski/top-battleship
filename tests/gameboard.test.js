const GameBoard = require('../src/gameboard.js');
const Ship = require('../src/ship.js');

describe('Set up GameBoard', () => {
    test('initializes with correct board', () => {
        const gameboard = new GameBoard();
        expect(gameboard.board).toEqual(Array.from({ length: 10 }, () => Array(10).fill('e')));
    });

    test('initializes with correct ships', () => {
        const gameboard = new GameBoard();
        expect(gameboard.ships).toEqual([new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)]);
    });

    // Test placing ships at valid positions
    test('place ship horizontally at valid position', () => {
        const gameboard = new GameBoard();
        expect(gameboard.placeShip(gameboard.ships[3], 0, 0, 'horizontal')).toBe(true);
    });

    test('place ship vertically at valid position', () => {
        const gameboard = new GameBoard();
        expect(gameboard.placeShip(gameboard.ships[3], 0, 0, 'vertical')).toBe(true);
    });

    test('place ship horizontally at invalid position', () => {
        const gameboard = new GameBoard();
        expect(gameboard.placeShip(gameboard.ships[3], 9, 9, 'horizontal')).toBe(false);
    });

    test('place ship vertically at invalid position', () => {
        const gameboard = new GameBoard();
        expect(gameboard.placeShip(gameboard.ships[3], 8, 8, 'vertical')).toBe(false);
    });

    test('place ship horizontally at valid position and check board', () => {
        const gameboard = new GameBoard();
        expect(gameboard.placeShip(gameboard.ships[3], 0, 0, 'horizontal')).toBe(true);
        expect(gameboard.board[0][0]).toBe(gameboard.ships[3]);
        expect(gameboard.board[0][1]).toBe(gameboard.ships[3]);
        expect(gameboard.board[0][2]).toBe(gameboard.ships[3]);
    });

    test('place ship horizontally at another valid position and check board', () => {
        const gameboard = new GameBoard();
        expect(gameboard.placeShip(gameboard.ships[3], 1, 1, 'horizontal')).toBe(true);
        expect(gameboard.board[1][1]).toBe(gameboard.ships[3]);
        expect(gameboard.board[1][2]).toBe(gameboard.ships[3]);
        expect(gameboard.board[1][3]).toBe(gameboard.ships[3]);
    });

    test('cannot place a ship where another ship is already placed', () => {
        const gameboard = new GameBoard();
        expect(gameboard.placeShip(gameboard.ships[3], 0, 0, 'horizontal')).toBe(true);
        expect(gameboard.placeShip(gameboard.ships[2], 0, 1, 'horizontal')).toBe(false);
    });

    test('cannot place a ship that is already placed', () => {
        const gameboard = new GameBoard();
        expect(gameboard.placeShip(gameboard.ships[3], 0, 0, 'horizontal')).toBe(true);
        expect(gameboard.placeShip(gameboard.ships[3], 4, 4, 'horizontal')).toBe(false);
    });

    describe('Play GameBoard', () => {
        test('attack a ship', () => {
            const gameboard = new GameBoard();
            gameboard.placeShip(gameboard.ships[3], 0, 0, 'horizontal');
            expect(gameboard.attack(0, 0)).toBe('hit!');
            expect(gameboard.ships[3].hits).toBe(1);
            expect(gameboard.board[0][0]).toBe('x');
        });

        test('missed a ship', () => {
            const gameboard = new GameBoard();
            gameboard.placeShip(gameboard.ships[3], 0, 0, 'horizontal');
            expect(gameboard.attack(1, 1)).toBe('miss!');
            expect(gameboard.board[1][1]).toBe('m');
        });

        test('attack an invalid position', () => {
            const gameboard = new GameBoard();
            expect(gameboard.attack(11, 11)).toBe('invalid position');
        });

        test('sink a ship', () => {
            const gameboard = new GameBoard();
            gameboard.placeShip(gameboard.ships[3], 0, 0, 'horizontal');
            gameboard.attack(0, 0);
            gameboard.attack(0, 1);
            expect(gameboard.attack(0, 2)).toBe('You sunk my battleship!');
            expect(gameboard.ships[3].isSunk()).toBe(true);
        });
    });

});

