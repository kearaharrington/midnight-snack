// GLOBAL DOM / VARIABLES
const die = document.getElementById('roll');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const rollButton = document.getElementById('die-button');
const rollDisplay = document.getElementById('number');
const journeyButtons = document.getElementById('game-buttons');
const playerInfo = document.getElementById('player-info');
let rollResult;

// ====================== PAINT INTIAL SCREEN ======================= //

// EVENT LISTENERS
rollButton.addEventListener('click', rollDie);
startButton.addEventListener('click', start);
resetButton.addEventListener('click', resetGame);

// ====================== ENTITIES ======================= //
class Player {
    // constructor(playerName) {
    constructor() {
        // this.name = playerName,
        // this.class = '',
        this.maxHP = 100,
        this.currentHP = 100,
        this.maxStealth = 100,
        this.stealth = 100,
        this.hasEaten = false,
        this.alive = true
    };
};

let player1 = new Player();

// Function to show player stats on page
function displayPlayerInfo() {
    let life = document.createElement('p');
    playerInfo.appendChild(life);
    life.innerText = `Alive: ${player1.alive}`;

    let hp = document.createElement('p');
    playerInfo.appendChild(hp);
    // hp.setAttribute('id', 'HP');
    // let playerHp = document.getElementById('HP');
    hp.innerText = `HP: ${player1.currentHP}`;
    
    let stealth = document.createElement('p');
    playerInfo.appendChild(stealth);
    // stealth.setAttribute('id', 'stealth');
    // let stealthValue = document.getElementById('stealth');
    stealth.innerText = `Stealth: ${player1.stealth}`;

    let eat = document.createElement('p');
    playerInfo.appendChild(eat);
    // eat.setAttribute('id', 'snacked');
    playerInfo.appendChild(eat);

    function snacked() {
        if (player1.hasEaten) {
            eat.innerText = 'Status: Successfully snacked!'
        } else {
            eat.innerText = 'Status: Still hungry...'
        }
    }
    snacked();
};

displayPlayerInfo();

// ====================== GAME PROCESSES ======================= //

// start game
function start() {
    let sneakButton = document.createElement('button');
    sneakButton.setAttribute('id', 'sneak');
    let sneak1 = document.getElementById('sneak');
    function newButton() {
        if (!sneak1) {
        journeyButtons.appendChild(sneakButton);
        }
    }
    newButton();
    sneakButton.innerText = 'sneak';
    sneakButton.addEventListener('click', sneak);
}

// roll 20 sided die
function rollDie() {
    rollResult = 1 + Math.floor(Math.random() * 20);
    rollDisplay.textContent = rollResult;
    // return rollResult;
    console.log(rollResult);
};

// sneak past kids' rooms
function sneak() {
    rollDie();
    let gameButtons = document.getElementById('game-buttons');
    if (gameButtons.children.length > -1) {
        gameButtons.remove();
    }
};

// go upstairs
function goUpstairs() {

};

// get snack


// reset back to start
function resetGame() {

};