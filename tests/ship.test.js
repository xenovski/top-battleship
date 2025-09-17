const Ship = require('../src/ship.js');

describe('Ship', () => {
    test('initializes with correct length and 0 hits', () => {
        const ship = new Ship(3);
        expect(ship.length).toBe(3);
        expect(ship.hits).toBe(0);
    });

    test('hit() increments hits', () => {
        const ship = new Ship(2);
        ship.hit();
        expect(ship.hits).toBe(1);
        ship.hit();
        expect(ship.hits).toBe(2);
    });

    test('isSunk() returns false if not enough hits', () => {
        const ship = new Ship(4);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    });

    test('isSunk() returns true when hits equal length', () => {
        const ship = new Ship(2);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });

    test('isSunk() returns false for zero hits', () => {
        const ship = new Ship(5);
        expect(ship.isSunk()).toBe(false);
    });

    test('hit() throws error if hits exceed length', () => {
        const ship = new Ship(2);
        ship.hit();
        ship.hit();
        expect(() => ship.hit()).toThrow('Ship is already sunk');
    });
});
