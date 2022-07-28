// GLOBAL DOM / VARIABLES
const die = document.getElementById('roll');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const rollButton = document.getElementById('die-button');
const rollDisplay = document.getElementById('number');
const journeyButtons = document.getElementById('game-buttons');
const playerInfo = document.getElementById('player-info');
const hallway = document.getElementById('hallway');
const stairs = document.getElementById('stairs');
const kitchen = document.getElementById('kitchen');
const gameText = document.getElementById('journey-message');
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
    sneakButton.innerText = 'sneak past the bedrooms';
    sneakButton.addEventListener('click', sneak);
}

// remove existing buttons in the game-area div
function removeButtons() {
    let gameButtons = document.getElementById('game-buttons');
    if (gameButtons.children.length > 0) {
        // if (gameButtons.children.length === 0) { break; }
        gameButtons.remove();
    } 
}

// add new buttons

function newButton(theButtonId, buttonCreate) {
    if (!theButtonId) {
    journeyButtons.appendChild(buttonCreate);
    }
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
    removeButtons();
    hallway.style.display = 'none';
    stairs.style.display = 'inline';
    gameText.innerText = "Phew! The kids are still sound asleep. Now time to go down the stairs... watch out for the cats...";
    let stairsButton = document.createElement('button');
    stairsButton.setAttribute('id', 'downstairs');
    let stairs1 = document.getElementById('downstairs');
    // function newButton() {
    //     if (!stairs1) {
    //     journeyButtons.appendChild(stairsButton);
    //     }
    // }
    // newButton();
    newButton(stairs1,stairsButton);
    stairsButton.innerText = 'proceed down the stairs';
    stairsButton.addEventListener('click', goUpstairs);
};

// go upstairs
function goUpstairs() {
    rollDie();
    hallway.style.display = 'none';
    stairs.style.display = 'none';
    kitchen.style.display = 'inline';
    gameText.innerText = "You made it down the stairs. Onward to the kitchen!"
    
};

// get snack
function getSnack() {

};

// reset back to start
function resetGame() {
    // removeButtons();
    gameText.innerText = "It's midnight, you're still up, and you want a midnight snack... don't wake up the kids!";
    hallway.style.display = 'inline';
    stairs.style.display = 'none';
    kitchen.style.display = 'none';
};