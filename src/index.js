// You can import CSS files here
import './styles.css';
const GameBoard = require('./gameboard.js');
const Ship = require('./ship.js');
const boardsContainer = document.querySelector('#boards-container');

let gameOver = false;
let playerTurn = true;


function createUIBoard(name) {
    const boardName = document.createElement('h2');
    boardName.textContent = name;
    boardsContainer.appendChild(boardName);
    const boardContainer = document.createElement('div');
    boardContainer.classList.add('game-board');
    boardContainer.id = name + '-board';
    boardContainer.style.backgroundColor = 'gray';
    boardsContainer.appendChild(boardContainer);

    for (let i = 0; i < 100; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.id = name + '-block-' + i;
        boardContainer.appendChild(block);
    }
}

createUIBoard('player');
createUIBoard('computer');

function createUIShips() {
    const shipsContainer = document.querySelector('.ships-container');
    const destroyerShip = document.createElement('div');
    destroyerShip.classList.add('destroyer-ship');
    destroyerShip.id = 0;
    destroyerShip.setAttribute('length', '2');
    const cruiserShip = document.createElement('div');
    cruiserShip.classList.add('cruiser-ship');
    cruiserShip.id = 1;
    cruiserShip.setAttribute('length', '3');
    const submarineShip = document.createElement('div');
    submarineShip.classList.add('submarine-ship');
    submarineShip.id = 2;
    submarineShip.setAttribute('length', '3');
    const battleshipShip = document.createElement('div');
    battleshipShip.classList.add('battleship-ship');
    battleshipShip.id = 3;
    battleshipShip.setAttribute('length', '4');
    const carrierShip = document.createElement('div');
    carrierShip.classList.add('carrier-ship');
    carrierShip.id = 4;
    carrierShip.setAttribute('length', '5');
    shipsContainer.appendChild(destroyerShip);
    shipsContainer.appendChild(cruiserShip);
    shipsContainer.appendChild(submarineShip);
    shipsContainer.appendChild(battleshipShip);
    shipsContainer.appendChild(carrierShip);
}

createUIShips();

const playerGameboard = new GameBoard('player');
const computerGameboard = new GameBoard('computer');
// playerGameboard.initialiseRandomly();
computerGameboard.initialiseRandomly();
renderUIBoard(computerGameboard, 'computer');
renderUIBoard(playerGameboard, 'player');

const blocks = document.querySelectorAll('.block');
blocks.forEach(block => {
    block.addEventListener('click', function handleClick(event) {
        console.log(`Block clicked: ${block.id}`);
        if (block.classList.contains('ship-block')) {
            block.classList.add('hit');
        } else {
            block.classList.add('miss');
        }

        // Remove this event listener so the block can't be clicked again
        block.removeEventListener('click', handleClick);
        playerTurn = !playerTurn;
        
        if (!playerTurn) {
            computerAttacks();
        }

    });
});



function renderUIBoard(gameboard, name) {
    // const boardContainer = document.getElementById(name + '-board');

    // Remove any previous ship markings
    for (let i = 0; i < 100; i++) {
        const block = document.getElementById(name + '-block-' + i);
        block.classList.remove('ship-block');
    }

    // For each ship, mark its location on the board
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = gameboard.board[row][col];
            if (cell instanceof Ship) {
                const blockIndex = row * 10 + col;
                const block = document.getElementById(name + '-block-' + blockIndex);
                if (block) {
                    block.classList.add('ship-block');
                }
            }
        }
    }
}

function computerAttacks() {
    // Simulate a click on a random block inside of player-board
    const playerBlocks = document.querySelectorAll('[id^="player-block"]');
    if (playerBlocks.length > 0) {
        // Pick a random block that hasn't been hit or missed yet
        const availableBlocks = Array.from(playerBlocks).filter(
            block => !block.classList.contains('hit') && !block.classList.contains('miss')
        );
        if (availableBlocks.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableBlocks.length);
            availableBlocks[randomIndex].click();
        }
    }
}

// Add dragstart event listeners to each ship div
const shipDivs = document.querySelectorAll('.ships-container > div');
shipDivs.forEach(shipDiv => {
    shipDiv.setAttribute('draggable', 'true');
    shipDiv.addEventListener('dragstart', function (event) {
        // Set the ship index and length as data for the drop event
        event.dataTransfer.setData(
            'application/json',
            JSON.stringify({ id: shipDiv.id, length: shipDiv.getAttribute('length') })
          );
        // You can also add a visual effect if desired
        shipDiv.style.opacity = '0.05';
        shipDiv.style.cursor = 'grab';
    });
    shipDiv.addEventListener('dragend', function (event) {
        shipDiv.style.opacity = '';
    });
});

// Add dragover event listeners to each player board block.  when drop happens, add the ship to the gameboard
const playerBlocks = document.querySelectorAll('[id^="player-block"]');
playerBlocks.forEach(block => {
    block.addEventListener('dragover', function(event) {
        event.preventDefault(); // Necessary to allow a drop
        // Optionally, add a visual effect to indicate droppable area
        block.style.backgroundColor = '#b3d1ff';
    });
    block.addEventListener('dragleave', function(event) {
        // Remove the visual effect when drag leaves
        block.style.backgroundColor = '';
    });
    block.addEventListener('drop', function(event) {
        event.preventDefault();
        block.style.backgroundColor = '';
        
        // Get the ship index from the drag data
        const data = JSON.parse(event.dataTransfer.getData('application/json'));
        const shipIndex = Number(data.id);
        let blockId = Number(block.id.split('-')[2]);
        let row = Math.floor(blockId / 10);
        let col = blockId % 10;
        
        // Remove the ship from the ships-container
        if (playerGameboard.placeShip(playerGameboard.ships[shipIndex], row, col, 'horizontal')) {
            const shipDiv = document.getElementById(shipIndex);
            shipDiv.parentNode.removeChild(shipDiv);
            renderUIBoard(playerGameboard, 'player');
        }
    });
});



// Add your application code here
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded and ready!');
});

window.GameBoard = GameBoard;
window.Ship = Ship;