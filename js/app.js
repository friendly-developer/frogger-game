'use strict';
const cheat_codes = 'jay';
let curr_code = '',
	allEnemies = [],
	max_speed = 15,
	min_speed = 1;

/**
 * Character is our base class for both Player and enemy
 * @param {[int]} x      [location on x-axis]
 * @param {[int]} y      [location on y-axis]
 * @param {[string]} sprite [image location]
 */
var Character = function(x, y, sprite) {
	this.sprite = sprite;
	this.x = x;
	this.y = y;
};

/**
 * renders the character with location and image
 */
Character.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Enemies our player must avoid
 * Parameter: x,y Location where the bugs need to be placed at instantiation
 * @param {[int]} x      [location on x-axis]
 * @param {[int]} y      [location on y-axis]
 */
var Enemy = function(x, y) {
	const sprite = 'images/enemy-bug.png';
	Character.call(this, x, y, sprite);
};


Enemy.prototype = Object.create(Character.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.

	this.x = this.x + ((Math.random() * (max_speed - min_speed + 1) + min_speed) * dt * 35);
	if (this.x >= 505) {
		this.x = 0;
	}
	this.check_for_collision(this.x, this.y);
};
/**
 * resets player to default location
 * @param  {[palyer object]} self
 */
var reset_player = function(self) {
	self.x = 200;
	self.y = 365
};
/**
 * [sets current level in view]
 * @param {[player]} self
 */
var set_level = function(self) {
	document.querySelector('#level').innerHTML = self.level
};
/**
 * [check_for_collision, if so reset all the properties of the game ]
 * @param  {[type]} x [current location of x]
 * @param  {[type]} y [current location of y] *
 */
Enemy.prototype.check_for_collision = function(x, y) {
	if ((player.x < x + 10) && (player.x > x - 10) && (player.y < y + 10) && (player.y > y - 10)) {
		reset_player(player);
		player.level = 1;
		allEnemies = [];
		max_speed = 15;
		min_speed = 1;
		send_enemies();
		set_level(player);
		player.sprite = 'images/char-boy.png';
	}
};

/**
 * Creating Enemies for each row
 */
var First_row_enemy = function() {
	Enemy.call(this, 0, 60);
};
First_row_enemy.prototype = Object.create(Enemy.prototype);
First_row_enemy.prototype.constructor = First_row_enemy;
var Second_row_enemy = function() {
	Enemy.call(this, 0, 135);
};
Second_row_enemy.prototype = Object.create(Enemy.prototype);
Second_row_enemy.prototype.constructor = Second_row_enemy;
var Third_row_enemy = function() {
	Enemy.call(this, 0, 215);
};
Third_row_enemy.prototype = Object.create(Enemy.prototype);
Third_row_enemy.prototype.constructor = Third_row_enemy;


/**
 * send a wave of enemies into the all enemies object
 */
var send_enemies = function() {
	allEnemies.push(new First_row_enemy());
	allEnemies.push(new Second_row_enemy());
	allEnemies.push(new Third_row_enemy());
};
send_enemies();

/**
 * Our player object which controls the player
 */
var Player = function() {
	const x = 200,
		y = 365,
		current_level = 1,
		sprite = 'images/char-boy.png';
	Character.call(this, x, y, sprite);
	this.level = current_level;

};
Player.prototype = Object.create(Character.prototype);
/**
 * [handleInput checks what are provided and also allows cheat codes to be entered]
 * @param  {[string]} val [is the key value that is currently being entered]
 */
//TODO:: Add background music everytime an input is provided
Player.prototype.handleInput = function(val) {

	if (val == 'left') {
		this.update(-100, 0);
	} else if (val == 'down') {
		this.update(0, 75);
	} else if (val == 'up') {
		this.update(0, -75);
	} else if (val == 'right') {
		this.update(100, 0);
	} else if (cheat_codes.indexOf(val) > -1 && (curr_code === '' || cheat_codes.indexOf(curr_code) > -1)) {
		curr_code = curr_code + val;
		cheat_codes === curr_code ? this.change_char() : '';
	} else curr_code = '';

};
/**
 * [changes characters sprite image]
 */
Player.prototype.change_char = function() {
	this.sprite = 'images/char-princess-girl.png';
}
//TODO :: Add jewels or bonus items once in a while for changing the character

/**
 * updates the current players location based on the arguments provided
 * also checking if any collision occured after moving
 * @param  {[type]} x [description]
 * @param  {[type]} y [description]
 */
Player.prototype.update = function(x, y) {
	this.x = ((this.x + x) < 500) && ((this.x + x) > -1) ? (this.x + x) : this.x;
	this.y = (this.y + y) < 425 && (this.y + y) > -60 ? (this.y + y) : this.y;
	this.check_if_won();
};
/**
 * [check_if_won description if so then increase the level and also increase the speed
 * and also change the character]
 */
Player.prototype.check_if_won = function() {
	if (this.y == -10) {
		reset_player(this);
		this.sprite = 'images/char-pink-girl.png';
		this.level = this.level + 1;
		set_level(this);
		send_enemies();
		max_speed +=0.5;
		min_speed+=0.5;
	}
};

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	console.log(e.keyCode)
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
		74: 'j',
		65: 'a',
		89: 'y'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});