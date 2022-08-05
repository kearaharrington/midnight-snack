// GLOBAL DOM / VARIABLES

const die = document.getElementById('roll');
const rollButton = document.getElementById('die-button');
const rollDisplay = document.getElementById('number');

const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

const journeyButtons = document.getElementById('game-buttons');
const sneakButton = document.getElementById('sneak');
const shooButton = document.getElementById('shoo');
const stairsAroundBtn = document.getElementById('downstairs-around');
const stairsOverBtn = document.getElementById('downstairs-over');
const smokeBtn = document.getElementById('smoke');
const burritoBtn = document.getElementById('burrito');
const cerealBtn = document.getElementById('cereal');
const sushiBtn = document.getElementById('sushi');
const continueBtn = document.getElementById('continue');

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
let hallChoice;
let stairsChoice;
let kitchenChoice;
let stage;
let pathChosen = false;

// ====================== PAINT INTIAL SCREEN ======================= //

// EVENT LISTENERS
rollButton.addEventListener('click', rollOk);
startButton.addEventListener('click', start);
resetButton.addEventListener('click', resetGame);

sneakButton.addEventListener('click', sneak);
shooButton.addEventListener('click', shoo);

stairsAroundBtn.addEventListener('click', downAround);
stairsOverBtn.addEventListener('click', downOver);

smokeBtn.addEventListener('click', chooseSmoke);
burritoBtn.addEventListener('click', chooseBurrito);
cerealBtn.addEventListener('click', chooseCereal);
sushiBtn.addEventListener('click', chooseSushi);

continueBtn.addEventListener('click', ohNo);

// ====================== ENTITIES ======================= //
class Player {
    constructor() {
        this.maxHP = 100;
        this.currentHP = 100;
        this.maxStealth = 100;
        this.stealth = 100;
        this.hasEaten = false;
        this.alive = true;
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
};

// function so that you can only roll if you've chosen an option and have not yet rolled
function rollOk() {
    if (stage !== 0 && pathChosen === true) {
        outcome();
        pathChosen = false;
    };
}

function outcome() {
    let roll = rollDie();
    function score(user) {
        // hall options
        if (stage === 1 && hallChoice === 0 && roll <= 5) {
            user.currentHP = 0;
            gameText.innerText = "Game Over: Swarmed by drunk roommates, you can't make it to the kitchen"
        } else if (stage === 1 && hallChoice === 0 && roll >= 6 && roll <= 15) {
            user.stealth -= 25;
            gameText.innerText = "You trip and make a thumping sound. You think you hear a noise coming from behind one of the bedroom doors but you remain alone in the hallway."
            stageTwo();
        } else if (stage === 1 && hallChoice === 0 && roll >= 16) {
            gameText.innerText = "You pass by the bedrooms without making a single sound. Your roommates are still snoozing."
            stageTwo();
        } else if (stage === 1 && hallChoice === 1 && roll <= 5) {
            user.currentHP -= 25;
            gameText.innerText = "You stumble over your cat and fall down as it runs for the stairs. You think you hear a rustling coming from one of the bedrooms but no one comes out."
            stageTwo();
        } else if (stage === 1 && hallChoice === 1 && roll >= 6 && roll <= 15) {
            user.stealth -= 25;
            gameText.innerText = "You scare your cat and it jumps up, runs for the stairs, slides on the rug that you never put a non-slip pad under, and smacks headfirst into the wall."
            stageTwo();
        } else if (stage === 1 && hallChoice === 1 && roll >= 16) {
            gameText.innerText = "Your cat pads away and you quietly make it over to the top of the stairs."
            stageTwo();
        } else if (stage === 2 && stairsChoice === 0 && roll <= 5) { // stairs options
            user.currentHP = 0;
            user.alive = false;
            gameText.innerText = "Game Over: You tripped over your cat and fell down the stairs!!";
        } else if (stage === 2 && stairsChoice === 0 && roll >= 6 && roll <= 15) {
            user.currentHP -= 25;
            user.stealth -= 25;
            gameText.innerText = "You move around your cat and overshoot the next step, stumbling down the stairs."
            stageThree();
        } else if (stage === 2 && stairsChoice === 0 && roll >= 16) {
            gameText.innerText = "You make it down the stairs and head towards the kitchen."
            stageThree();
        } else if (stage === 2 && stairsChoice === 1 && roll <= 5) {
            user.currentHP = 0;
            user.alive = false;
            gameText.innerText = "Game Over: You spook your cat and it pounces on your legs, scratching and biting. You can't maintain your balance! You trip and tumble down the stairs to your death."
        } else if (stage === 2 && stairsChoice === 1 && roll >= 6 && roll <= 15) {
            user.currentHP -= 25;
            user.stealth -= 25;
            gameText.innerText = "You spook your cat and it pounces on your legs, scratching and biting. You can't maintain your balance! You yelp as you trip but you manage not to fall."
            stageThree();
        } else if (stage === 2 && stairsChoice === 1 && roll >= 16) {
            gameText.innerText = "You make it down the stairs and head towards the kitchen"
            stageThree();
        } else if (stage === 3 && kitchenChoice === 0 && roll <=5) { // kitchen - smoke first
            user.currentHP = 0;
            user.alive = false;
            gameText.innerText = "Game Over: You've set your house on fire! No snack! And you're dead!"
        } else if (stage === 3 && kitchenChoice === 0 && roll >= 6 && roll <= 15) {
            gameText.innerText = "Game Over: You fell asleep petting your cat and giving it treats. You forgot you came to the kitchen for your own snack."
        } else if (stage === 3 && kitchenChoice === 0 && roll >= 16) {
            user.currentHP = 100;
            gameText.innerText = "Ok ok ok, back to choosing your snack..."
            stageThreeSmoked();
        } else if (stage === 3 && kitchenChoice === 1 && roll <=5) { // kitchen - microwave burrito
            user.currentHP = 0;
            user.alive = false;
            gameText.innerText = "Game Over: You left the foil on! The entire house exploded!"
        } else if (stage === 3 && kitchenChoice === 1 && roll >= 6 && roll <= 15) {
            user.currentHP -= 15;
            gameText.innerText = "Aww you burnt the burrito... still good though"
            stageFour();
        } else if (stage === 3 && kitchenChoice === 1 && roll >= 16) {
            user.hasEaten = true;
            snacked();
        } else if (stage === 3 && kitchenChoice === 2 && roll <=5) { // kitchen - cereal
            user.currentHP = 0;
            user.alive = false;
            gameText.innerText = "Game Over: You eat so fast you choke on your cereal. Death."
        } else if (stage === 3 && kitchenChoice === 2 && roll >= 6 && roll <= 15) {
            user.stealth -= 50;
            gameText.innerText = "Uh oh! You drop the cereal bowl and it shatters, little pieces clattering all over the floor..."
            stageFour();
        } else if (stage === 3 && kitchenChoice === 2 && roll >= 16) {
            user.hasEaten = true;
            snacked();
        } else if (stage === 3 && kitchenChoice === 3 && roll <=5) { // kitchen - sushi
            user.currentHP = 0;
            user.alive = false;
            gameText.innerText = "Game Over: That sushi wasn't from last night... that sushi was from last WEEK! Death."
        } else if (stage === 3 && kitchenChoice === 3 && roll >= 6 && roll <= 15) {
            gameText.innerText = "You ate your sushi but it smelled just a little off..."
            stageFour();
        } else if (stage === 3 && kitchenChoice === 0 && roll >= 16) {
            user.hasEaten = true;
            snacked();
        };
    };
    score(player1);
    displayPlayerInfo();
};

function stageTwo() {
    stage = 2;
    hallway.style.display = 'none';
    stairs.style.display = 'inline';
    
    stairsAroundBtn.style.display = 'inline';
    stairsOverBtn.style.display = 'inline';
};

function stageThree() {
    stage = 3;
    hallway.style.display = 'none';
    stairs.style.display = 'none';
    kitchen.style.display = 'inline';
    
    smokeBtn.style.display = 'inline';
    burritoBtn.style.display = 'inline';
    cerealBtn.style.display = 'inline';
    sushiBtn.style.display = 'inline';
};

function stageThreeSmoked() {
    burritoBtn.style.display = 'inline';
    cerealBtn.style.display = 'inline';
    sushiBtn.style.display = 'inline';
};

function stageFour() {
    stage = 4;
    continueBtn.style.display = 'inline';
};

// start game
function start() {
    stage = 0;
    sneakButton.style.display = 'inline';
    shooButton.style.display = 'inline';
    startButton.style.display = 'none';
    resetButton.style.display = 'inline';
};

// shoo cat
function shoo() {
    stage = 1;
    hallChoice = 1;
    pathChosen = true;
    sneakButton.style.display = 'none';
    shooButton.style.display = 'none';
};

// sneak past roommates' rooms
function sneak() {
    stage = 1;
    hallChoice = 0;
    pathChosen = true;
    sneakButton.style.display = 'none';
    shooButton.style.display = 'none';
};

// walk around cat
function downAround() {
    stairsChoice = 0;
    pathChosen = true;
    stairsAroundBtn.style.display = 'none';
    stairsOverBtn.style.display = 'none';
};

// step over cat
function downOver() {
    stairsChoice = 1;
    pathChosen = true;
    stairsAroundBtn.style.display = 'none';
    stairsOverBtn.style.display = 'none';
};

// choose to smoke first
function chooseSmoke() {
    kitchenChoice = 0;
    pathChosen = true;
    smokeBtn.style.display = 'none';
    burritoBtn.style.display = 'none';
    cerealBtn.style.display = 'none';
    sushiBtn.style.display = 'none';
};

// choose microwave burrito
function chooseBurrito() {
    kitchenChoice = 1;
    pathChosen = true;
    smokeBtn.style.display = 'none';
    burritoBtn.style.display = 'none';
    cerealBtn.style.display = 'none';
    sushiBtn.style.display = 'none';
};

function chooseCereal() {
    kitchenChoice = 2;
    pathChosen = true;
    smokeBtn.style.display = 'none';
    burritoBtn.style.display = 'none';
    cerealBtn.style.display = 'none';
    sushiBtn.style.display = 'none';
};

function chooseSushi() {
    kitchenChoice = 3;
    pathChosen = true;
    smokeBtn.style.display = 'none';
    burritoBtn.style.display = 'none';
    cerealBtn.style.display = 'none';
    sushiBtn.style.display = 'none';
};

// kids ate snacks
function ohNo() {
    if (player1.stealth <=25) {
        gameText.innerText = 'Your roommates beat you to the kitchen! All the snacks are gone!'
    } else {
        player1.hasEaten = true;
        snacked();
    };
    continueBtn.style.display = 'none';
};

// you ate snack
function snacked() {
    if (player1.hasEaten) {
        gameText.innerText = 'success! you got your snack!'
        eat.innerText = 'Status: Happy and sleeeeepy'
    }
};

// reset back to start
function resetGame() {
    gameText.innerText = "It's midnight, you're still up, and you want a midnight snack... don't wake up your roommates!";
    
    startButton.style.display = 'inline';
    resetButton.style.display = 'none';
    sneakButton.style.display = 'none';
    shooButton.style.display = 'none';
    stairsAroundBtn.style.display = 'none';
    stairsOverBtn.style.display = 'none';
    smokeBtn.style.display = 'none';
    burritoBtn.style.display = 'none';
    cerealBtn.style.display = 'none';
    sushiBtn.style.display = 'none';
    
    pathChosen = false;

    hallway.style.display = 'inline';
    stairs.style.display = 'none';
    kitchen.style.display = 'none';

    rollDisplay.innerText = '1';

    player1.maxHP = 100;
    player1.currentHP = 100;
    player1.maxStealth = 100;
    player1.stealth = 100;
    player1.hasEaten = false;
    player1.alive = true;

    displayPlayerInfo();
};