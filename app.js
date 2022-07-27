// GLOBAL DOM / VARIABLES
const die = document.getElementById('roll');
const rollButton = document.getElementById('die-button');
const rollDisplay = document.getElementById('number');
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

// function to roll 20 sided die
function rollDie() {
    rollResult = 1 + Math.floor(Math.random() * 20);
    rollDisplay.textContent = rollResult;
    console.log(rollResult)
}

// rollDie();
