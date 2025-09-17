class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hits = 0;
        this.placed = false;
        this.location = [];
    }

    hit() {
        if (this.hits >= this.length) {
            throw new Error('Ship is already sunk');
        }
        this.hits++;
    }

    isSunk() {
        return this.hits === this.length;
    }

    isPlaced() {
        return this.placed;
    }

    setPlaced(placed) {
        this.placed = placed;
    }

    location() {
        return this.location;
    }

    setLocation(row, col, orientation) {
        this.location = [row, col, orientation];
    }
}

module.exports = Ship;
