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


const playerGameboard = new GameBoard('player');
const computerGameboard = new GameBoard('computer');
playerGameboard.initialiseRandomly();
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


// Add your application code here
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded and ready!');
});

window.GameBoard = GameBoard;
window.Ship = Ship;