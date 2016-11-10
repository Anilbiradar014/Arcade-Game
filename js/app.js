// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var bugX = this.x;
    if (bugX < 550) {
        this.x = bugX + 140 * dt;
    } else {
        this.x = -2;
    }
};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

var Player = function(x, y) {

    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.previousLocation = {
        x: this.x,
        y: this.y
    };

};

// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function() {

    if (this.pressedKey === 'left' && this.x > 0) { //player isn't on left edge
        this.x = this.x - 100;
    }

    //if right arrow is pressed:
    if (this.pressedKey === 'right' && this.x < 400) { //player isn't on right edge
        this.x = this.x + 100;
    }

    //if up arrow is pressed:
    if (this.pressedKey === 'up' && this.y > 0) {
        this.y = this.y - 85;
    }

    //if down arrow is pressed:
    if (this.pressedKey === 'down' && this.y < 400) {
        this.y = this.y + 85;
    }

    this.pressedKey = null;

    //if player reaches destination, position reset:
    if (this.y < -1) {
        this.reset();
    }
    //To check collisions while travelling to destination
    this.checkCollisions();

};

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

//Helps to move the player  "left" "right" "up" and "down" with lot of contraints

Player.prototype.handleInput = function(direction) {

    this.previousLocation.x = this.x;
    this.previousLocation.y = this.y;

    if (direction === 'left' && this.x > 1 && this.x < 410) {

        this.x -= 100;
    }

    if (direction === 'up' && this.y > 1 && this.y < 410) {

        this.y -= 81;
    }

    if (direction === 'right' && this.x > -1 && this.x < 400) {

        this.x += 100;
    }

    if (direction === 'down' && this.y > -101 && this.y < 390) {

        this.y += 80;
    }


};


//Reset the player position to normal

Player.prototype.reset = function() {

    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

var allEnemies = [

    new Enemy(100, 300),
    new Enemy(400, 300),
    new Enemy(100, 200),
    new Enemy(300, 200),
    new Enemy(100, 100),
    new Enemy(300, 100)

];

Player.prototype.checkCollisions = function() {

    for (i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 60 &&
            this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 75 &&
            this.y + 75 > allEnemies[i].y) {
            console.log("game over");
            this.reset();
        }
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});