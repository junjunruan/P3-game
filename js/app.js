/**
 * Enemies our player must avoid.
 * @constructor
 * @param {number} locX - x position of an enemy
 * @param {number} locY - y position of an enemy
 * @param {number} speed - the speed of an enemy
 */
var Enemy = function(locX, locY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = locX;
    this.y = locY;
    this.speed = speed;
};

/**
 * Update the enemy's position, required method for game.
 *
 * @param {number} dt - a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * 70 * this.speed;

    //bugs restart to running
    if(this.x > 700) {
        this.x = 0;
    }
};

/**
 * Draw the enemy on the screen, required method for game.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * This class requires an update(), render() and
 * a handleInput() method.
 * @constructor
 */
var player = function() {
    this.sprite = game.character[game.characterSelection];
    this.x = 200;
    this.y = 400;
    this.score = 0;
};

/**
 * Check a player's collision with an enemy
 * and update its position to the start point.
 *
 * @param {number} dt - a time delta between ticks
 */
player.prototype.update = function(dt) {
    var enemyWidth = 50,
        enemyHeight = 50,
        playerWidth = 50,
        playerHeight = 50;

    //collision detected
    for(var j=0; j<allEnemies.length; j++) {
        if(this.x < allEnemies[j].x + enemyWidth &&
           this.x + playerWidth > allEnemies[j].x &&
           this.y < allEnemies[j].y + enemyHeight &&
           this.y + playerHeight > allEnemies[j].y) {
            this.x = 200;
            this.y = 400;
        }
    }
};

/**
 * Draw the player on the screen.
 */
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Control the game with keyboard.
 *
 * @param {string} key - event listener
 */
player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            (game.state == 'menu') ? game.moveArrowLeft() : this.moveLeft();
            break;
        case 'right':
            (game.state == 'menu') ? game.moveArrowRight() : this.moveRight();
            break;
        case 'up':
            this.moveUp();
            break;
        case 'down':
            this.moveDown();
            break;
        case 'enter':
            if(game.state == 'inGame') {
                game.state = 'menu';
            } else {
                game.state = 'inGame';
                this.sprite = game.character[game.characterSelection];
            }
            break;
    }
};

/**
 * Control the player's left movement and don't move off the screen.
 */
player.prototype.moveLeft = function() {
    this.x = (this.x > 99) ? (this.x - 100) : 0;
};

/**
 * Control the player's right movement and don't move off the screen.
 */
player.prototype.moveRight = function() {
    this.x = (this.x < 400) ? (this.x + 100) : 400;
};

/**
 * Control the player's up movement and don't move off the screen.
 */
player.prototype.moveUp = function() {
    if(this.y > 60) {
        this.y -= 85;
    } else {
        this.score += 1;
        this.x = 200;
        this.y = 400;
    }
};

/**
 * Control the player's down movement and don't move off the screen.
 */
player.prototype.moveDown = function() {
    this.y = (this.y < 300) ? (this.y + 85) : 400;
};

/**
 * A game class to show game state and character selection.
 * @constructor
 * @param {string} state - the game state: it can be 'menu' or 'inGame'
 * @param {number} characterSelection - the Nth character was selected
 */
var Game = function(state, characterSelection) {
    this.state = state;
    this.characterSelection = characterSelection;
    this.sprite = 'images/characterSelection.png';
    this.character = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];
};

/**
 * Draw the current character selection arrow.
 */
Game.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), 30 + this.characterSelection * 100, 225, 40, 40);
};

/**
 * Control the arrow's left movement for character selection.
 */
Game.prototype.moveArrowLeft = function() {
    this.characterSelection = (this.characterSelection > 0) ? (this.characterSelection - 1) : 4;
};

/**
 * Control the arrow's rigth movement for character selection.
 */
Game.prototype.moveArrowRight = function() {
    this.characterSelection = (this.characterSelection < 4) ? (this.characterSelection + 1) : 0;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var game = new Game('menu',0);

var allEnemies = [];

allEnemies.push(new Enemy(0,65,Math.random()+1));
allEnemies.push(new Enemy(0,150,Math.random()+1));
allEnemies.push(new Enemy(0,235,Math.random()+1));
allEnemies.push(new Enemy(-200,235,Math.random()+1));

var player = new player();

/*
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
