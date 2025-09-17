const Ship = require('../src/ship.js');

class GameBoard {
    constructor(owner) {
        this.owner = owner;
        this.board = Array.from({ length: 10 }, () => Array(10).fill('e'));
        this.ships = [
            new Ship('destroyer', 2),
            new Ship('cruiser', 3),
            new Ship('submarine', 3),
            new Ship('battleship', 4),
            new Ship('carrier', 5)];
    }


    initialiseRandomly() {
        for (const ship of this.ships) {
            this.#placeShipRandomly(this, ship);
        }
    }

    placeShip(ship, row, col, orientation) {
        if (!this.#isValidPlacement(ship, row, col, orientation)) {
            return false;
        }

        // Only place ship if validation passed
        if (orientation === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                this.board[row][col + i] = ship;
            }
        } else if (orientation === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                this.board[row + i][col] = ship;
            }
        }
        
        ship.setPlaced(true);
        this.ships.push(ship);
        return true;
    }

    attack(row, col) {
        if (row < 0 || row > 9 || col < 0 || col > 9) {
            return 'invalid position';
        }
        if (this.board[row][col] instanceof Ship) {
            this.board[row][col].hit();
            if (this.board[row][col].isSunk()) {
                this.board[row][col] = 'x';
                return 'You sunk my battleship!';
            }
            this.board[row][col] = 'x';
            return 'hit!';
        }
        this.board[row][col] = 'm';
        return 'miss!';
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }

    printBoard() {
        console.log(this.board.map(row => row.join(' ')).join('\n'));
    }

    #isValidPlacement(ship, row, col, orientation) {
        // Guard
        if (ship.isPlaced()) {
            return false;
        }

        if (orientation === 'horizontal' && col + ship.length > 10) {
            return false;
        }
        if (orientation === 'vertical' && row + ship.length > 10) {
            return false;
        }

        // Validate placement first (without mutating)
        if (orientation === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                if (this.board[row][col + i] !== 'e') {
                    return false;
                }
            }
        } else if (orientation === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                if (this.board[row + i][col] !== 'e') {
                    return false;
                }
            }
        } else {
            // Invalid orientation
            return false;
        }
        return true;
    }

    #placeShipRandomly(gameboard, ship) {
        while (!ship.isPlaced()) {
            let orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);
            gameboard.placeShip(ship, row, col, orientation);
        }
    }
}

module.exports = GameBoard;
