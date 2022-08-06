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

continueBtn.addEventListener('click', continueOption);

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
    rollDisplay.textContent = `You rolled ${rollResult}`;
    return rollResult;
};

// function so that you can only roll if you've chosen an option and have not yet rolled
function rollOk() {
    if (stage !== 0 && pathChosen === true) {
        outcome();
        pathChosen = false;
    };
    rollButton.style.display = 'none';
}

function outcome() {
    let roll = rollDie();
    function score(user) {
        // hall options
        if (stage === 1 && hallChoice === 0 && roll <= 5) {
            user.currentHP = 0;
            user.alive = false;
            gameText.innerText = "Game Over: Your eyes haven't yet adjusted to the dark hallway when your foot catches on something light but unstable. In a freak accident, you try to catch yourself but it's to no avail. Contorted into a pile of limbs you've managed to break your neck. The only snacking you'll be doing is in the afterlife..."
        } else if (stage === 1 && hallChoice === 0 && roll >= 6 && roll <= 15) {
            user.stealth -= 25;
            gameText.innerText = "You trip and make a thumping sound. You think you hear a noise coming from behind one of the bedroom doors but you remain alone in the hallway..."
            stageTwo();
        } else if (stage === 1 && hallChoice === 0 && roll >= 16) {
            gameText.innerText = "You pass by the bedrooms without making a single sound. No sign of your roommates thus far..."
            stageTwo();
        } else if (stage === 1 && hallChoice === 1 && roll <= 5) {
            user.currentHP -= 25;
            user.stealth -= 25;
            gameText.innerText = "Josephine hisses, startling you and you stumble backwards and falling as she runs for the stairs. You think you hear a rustling coming from one of the bedrooms but no one comes out..."
            stageTwo();
        } else if (stage === 1 && hallChoice === 1 && roll >= 6 && roll <= 15) {
            user.stealth -= 25;
            gameText.innerText = "You scare Josephine and she jumps up, runs for the stairs, slides on the rug that you never put a non-slip pad under, and smacks headfirst into the wall..."
            stageTwo();
        } else if (stage === 1 && hallChoice === 1 && roll >= 16) {
            gameText.innerText = "Josephine pads away and you quietly make it over to the top of the stairs..."
            stageTwo();
        } else if (stage === 2 && stairsChoice === 0 && roll <= 5) { // stairs options
            user.currentHP = 0;
            user.alive = false;
            gameText.innerText = "Game Over: You spook Josephine and it pounces on your legs, scratching and biting. You can't maintain your balance! You trip and tumble down the stairs to your death."
        } else if (stage === 2 && stairsChoice === 0 && roll >= 6 && roll <= 15) {
            user.currentHP -= 25;
            user.stealth -= 25;
            gameText.innerText = "You move around Josephine and overshoot the next step, tumbling downward you manage to catch yourself on the banister and head into the kitchen... now let's see what forbidden delights await you..."
            stageThree();
        } else if (stage === 2 && stairsChoice === 0 && roll >= 16) {
            gameText.innerText = "You make it down the stairs and head towards the kitchen... You peer into the fridge taking stock of your roommates' food... maybe you should smoke first..."
            stageThree();
        } else if (stage === 2 && stairsChoice === 1 && roll <= 5) {
            user.currentHP = 0;
            user.alive = false;
            gameText.innerText = "Game Over: You tripped over Josephine and fell down the stairs.";
        } else if (stage === 2 && stairsChoice === 1 && roll >= 6 && roll <= 15) {
            user.currentHP -= 25;
            user.stealth -= 25;
            gameText.innerText = "You spook Josephine and she pounces on your legs, scratching and biting. You can't maintain your balance! You yelp as you trip but you manage not to fall. Peering into the fridge you take stock of your roommates' food... maybe you should smoke first..."
            stageThree();
        } else if (stage === 2 && stairsChoice === 1 && roll >= 16) {
            gameText.innerText = "You make it down the stairs and head towards the kitchen... now let's see what forbidden delights await you..."
            stageThree();
        } else if (stage === 3 && kitchenChoice === 0 && roll <=5) { // kitchen - smoke first
            user.currentHP = 0;
            user.alive = false;
            gameText.innerText = "Game Over: Attempting to smoke out the window, you light up...... the curtains! You panic and slip, knocking your head on the counter and passing out. Congratulations, you've killed everyone... and the cat."
        } else if (stage === 3 && kitchenChoice === 0 && roll >= 6 && roll <= 15) {
            gameText.innerText = "Game Over: Shit... you've been staring at the closed fridge for who knows how long when you realize you're too high for this. You head back to your room in defeat."
            // gameText.innerText = "You fell asleep petting Josephine and giving it treats. You forgot you came to the kitchen for your own snack."
        } else if (stage === 3 && kitchenChoice === 0 && roll >= 16) {
            user.currentHP = 100;
            gameText.innerText = "Just the right amount of toasty, you're ready to eat..."
            stageThreeSmoked();
        } else if (stage === 3 && kitchenChoice === 1 && roll <=5) { // kitchen - microwave burrito
            user.currentHP = 0;
            user.alive = false;
            gameText.innerText = "Game Over: What's that crackling sound you hear? You're not making popcorn. You left the foil on! The entire house explodes! Plans foiled."
        } else if (stage === 3 && kitchenChoice === 1 && roll >= 6 && roll <= 15) {
            user.currentHP -= 15;
            gameText.innerText = "Distracted by your phone, you realize too late you've pressed an extra zero. Aww you burnt the burrito... still good though..."
            stageFour();
        } else if (stage === 3 && kitchenChoice === 1 && roll >= 16) {
            user.hasEaten = true;
            snacked();
        } else if (stage === 3 && kitchenChoice === 2 && roll <=5) { // kitchen - cereal
            user.currentHP = 0;
            user.alive = false;
            gameText.innerText = "Game Over: Josephine startles you and you take a sharp inhale as you're attempting to swallow your first bite of cereal. You can't catch your breath. The room goes dark... Josephine's a cereal killer."
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
            gameText.innerText = "Game Over: That sushi wasn't from last night... that sushi was from last MONTH! Death."
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
    rollButton.style.display = 'inline';
};

// sneak past roommates' rooms
function sneak() {
    stage = 1;
    hallChoice = 0;
    pathChosen = true;
    sneakButton.style.display = 'none';
    shooButton.style.display = 'none';
    rollButton.style.display = 'inline';
};

// walk around cat
function downAround() {
    stairsChoice = 0;
    pathChosen = true;
    stairsAroundBtn.style.display = 'none';
    stairsOverBtn.style.display = 'none';
    rollButton.style.display = 'inline';
};

// step over cat
function downOver() {
    stairsChoice = 1;
    pathChosen = true;
    stairsAroundBtn.style.display = 'none';
    stairsOverBtn.style.display = 'none';
    rollButton.style.display = 'inline';
};

// choose to smoke first
function chooseSmoke() {
    kitchenChoice = 0;
    pathChosen = true;
    smokeBtn.style.display = 'none';
    burritoBtn.style.display = 'none';
    cerealBtn.style.display = 'none';
    sushiBtn.style.display = 'none';
    rollButton.style.display = 'inline';
};

// choose microwave burrito
function chooseBurrito() {
    kitchenChoice = 1;
    pathChosen = true;
    smokeBtn.style.display = 'none';
    burritoBtn.style.display = 'none';
    cerealBtn.style.display = 'none';
    sushiBtn.style.display = 'none';
    rollButton.style.display = 'inline';
};

function chooseCereal() {
    kitchenChoice = 2;
    pathChosen = true;
    smokeBtn.style.display = 'none';
    burritoBtn.style.display = 'none';
    cerealBtn.style.display = 'none';
    sushiBtn.style.display = 'none';
    rollButton.style.display = 'inline';
};

function chooseSushi() {
    kitchenChoice = 3;
    pathChosen = true;
    smokeBtn.style.display = 'none';
    burritoBtn.style.display = 'none';
    cerealBtn.style.display = 'none';
    sushiBtn.style.display = 'none';
    rollButton.style.display = 'inline';
};

// kids ate snacks
function continueOption() {
    if (player1.stealth <=25) {
        gameText.innerText = "You've made so much noise you've attracted the attention of your roommates. In an effort to conceal your true purpose, you reach for the one thing you have in the kitchen... a bottle of tequila. You start pouring shots. You pass out before you manage to sneak a snack."
    } else {
        player1.hasEaten = true;
        snacked();
    };
    continueBtn.style.display = 'none';
    // rollButton.style.display = 'inline';
};

// you ate snack
function snacked() {
    if (player1.hasEaten) {
        gameText.innerText = "Belly full, eyes getting sleepy, you head back to your room. Another wonderful midnight snack courtesy of your roommates."
        eat.innerText = 'Status: Hunger Sated'
    }
};

// reset back to start
function resetGame() {
    gameText.innerText = "It's midnight... you're still up... and what's that? You hear a rumbling! But that's not the monster in your closet nor under your bed... it's your monstrous appetite and you need a snack. Too bad you haven't gotten groceries in weeks. Better not disturb your roommates or their cat, Josephine...";
    
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
    continueBtn.style.display = 'none';
    rollButton.style.display = 'none';
    
    pathChosen = false;

    hallway.style.display = 'inline';
    stairs.style.display = 'none';
    kitchen.style.display = 'none';

    rollDisplay.innerText = '';

    player1.maxHP = 100;
    player1.currentHP = 100;
    player1.maxStealth = 100;
    player1.stealth = 100;
    player1.hasEaten = false;
    player1.alive = true;

    displayPlayerInfo();
};