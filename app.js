// GLOBAL DOM / VARIABLES
const die = document.getElementById('roll');
const rollButton = document.getElementById('die-button');
const rollDisplay = document.getElementById('number');
const journeyButtons = document.getElementById('game-buttons')
let rollResult;

// ====================== PAINT INTIAL SCREEN ======================= //

// EVENT LISTENERS
rollButton.addEventListener("click", rollDie);

// ====================== ENTITIES ======================= //
let player = {
    name: '',
    class: '',
    maxHP: 100,
    currentHP: 100,
    hasEaten: false,
    alive: true,
}

// ====================== GAME PROCESSES ======================= //

// roll 20 sided die
function rollDie() {
    rollResult = 1 + Math.floor(Math.random() * 20);
    rollDisplay.textContent = rollResult;
    // return rollResult;
    console.log(rollResult);
}

// sneak past kids' rooms
function sneak() {
    
}

// go upstairs

// get snack

// reset back to start
