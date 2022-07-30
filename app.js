// GLOBAL DOM / VARIABLES
const die = document.getElementById('roll');
const rollButton = document.getElementById('die-button');
const rollDisplay = document.getElementById('number');

const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

const journeyButtons = document.getElementById('game-buttons');
const sneakButton = document.getElementById('sneak');
const stairsButton = document.getElementById('downstairs');
const kitchenButton = document.getElementById('make-snack');

const playerInfo = document.getElementById('player-info');

const hallway = document.getElementById('hallway');
const stairs = document.getElementById('stairs');
const kitchen = document.getElementById('kitchen');

const gameText = document.getElementById('journey-message');

const life = document.getElementById('life');
const hp = document.getElementById('hp');
const stealth = document.getElementById('stealth');
const eat = document.getElementById('eaten');

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
    let life = document.getElementById('life');
    life.innerText = `Alive: ${player1.alive}`;

    let hp = document.getElementById('hp');
    hp.innerText = `HP: ${player1.currentHP}`;
    
    let stealth = document.getElementById('stealth');
    stealth.innerText = `Stealth: ${player1.stealth}`;

    let eat = document.getElementById('eaten');
    eat.innerText = 'Status: Still hungry...'
};

displayPlayerInfo();

// ====================== GAME PROCESSES ======================= //

// start game
// function start() {
//     let sneakButton = document.createElement('button');
//     sneakButton.setAttribute('id', 'sneak');
//     let sneak1 = document.getElementById('sneak');
//     function newButton() {
//         if (!sneak1) {
//         journeyButtons.appendChild(sneakButton);
//         }
//     }
//     newButton();
//     sneakButton.innerText = 'sneak past the bedrooms';
//     sneakButton.addEventListener('click', sneak);
// }

function start() {
    sneakButton.style.display = 'block'
    sneakButton.innerText = 'sneak past the bedrooms';
    sneakButton.addEventListener('click', sneak);
    startButton.style.display = 'none';
    resetButton.style.display = 'block';
}

// remove existing buttons in the game-area div
function removeButtons() {
    if (journeyButtons.children.length > 0) {
        journeyButtons.remove();
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
    return rollResult;
    // console.log(rollResult);
};

// sneak past kids' rooms
function sneak() {
    let roll = rollDie();
    function score1(user) {
        if (roll < 3) {
            user.currentHP = 0;
            user.alive = false;
            removeButtons();
            gameText.innerText = 'Game Over: Swarmed by children!!'
            // alert('game over! no snack for you');
        } else if (roll > 2 && roll < 10) {
            user.stealth -= 25;
            gameText.innerText = "Phew! The kids are still sound asleep. Now time to go down the stairs... watch out for the cats...";
        }
    };
    score1(player1);
    displayPlayerInfo();

    hallway.style.display = 'none';
    stairs.style.display = 'inline';
    
    sneakButton.style.display = 'none';
    stairsButton.style.display = 'block';
    stairsButton.addEventListener('click', goUpstairs);
};

// go upstairs
function goUpstairs() {
    let roll = rollDie();
    function score(user) {
        if (roll < 3) {
            user.currentHP = 0;
            user.alive = false;
            removeButtons();
            gameText.innerText = 'Game Over: You tripped over your cat and fell down the stairs!!';
        } else if (roll > 2 && roll < 10) {
            user.stealth -= 25;
            gameText.innerText = "You made it to the kitchen!";
        } else {
            gameText.innerText = "You made it to the kitchen!";
        }
    }
    score(player1);
    displayPlayerInfo();
    
    hallway.style.display = 'none';
    stairs.style.display = 'none';
    kitchen.style.display = 'inline';
    
    stairsButton.style.display = 'none';
    kitchenButton.style.display = 'block';
    kitchenButton.addEventListener('click', getSnack);
};

// kids ate snacks
function ohNo(user) {
    if (user.stealth <=25) {
        gameText.innerText = 'Your kids beat you to the kitchen! All the snacks are gone!'
    } else {
        user.hasEaten = true;
        snacked();
    }
}

// you ate snack
function snacked() {
    if (player1.hasEaten) {
        gameText.innerText = 'success! you got your snack!'
        eat.innerText = 'Status: Sated and sleeeeepy'
    }
}


// get snack
function getSnack() {
    let roll = rollDie();
    function score(user) {
        if (roll < 3) {
            user.currentHP = 0;
            user.alive = false;
            removeButtons();
            gameText.innerText = 'Game Over: You burnt your house down!!'
        } else if (roll > 2 && roll < 10) {
            user.stealth -= 25;
            ohNo(user);
        } else if (roll >= 10) {
            user.hasEaten = true;
            snacked();
        }
    }
    score(player1);
    displayPlayerInfo();

    kitchenButton.style.display = 'none'
};

// reset back to start
function resetGame() {
    // removeButtons();
    gameText.innerText = "It's midnight, you're still up, and you want a midnight snack... don't wake up the kids!";
    hallway.style.display = 'inline';
    stairs.style.display = 'none';
    kitchen.style.display = 'none';
};