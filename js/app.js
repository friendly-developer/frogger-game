'use strict';
// Enemies our player must avoid
// Parameter: x,y Location where the bugs need to be placed at instantiation
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y =y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.    
    this.x = this.x+((Math.random() * (15 - 1 + 1) + 1)*dt*35);
    if (this.x >= 505) {
    	this.x = 0;
    }
    check_for_collision(this.x,this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var check_for_collision = function(x,y){
	console.log('Enemy x = ',x,' and y = ',y);
	console.log('Gamer x = ',player.x,' and y = ',player.y);
	if ((player.x < x+10) && (player.x > x-10) && (player.y < y+10) && (player.y > y-10)){
		player.x = 200;
		player.y = 365;
	}
};

var Gamer = function(){
	this.x = 200;
	this.y = 365;
	this.sprite ='images/char-pink-girl.png';
};

Gamer.prototype.handleInput = function(val){
	if(val == 'left')
		this.update(-100,0);
	else if(val == 'down')
		this.update(0,75);
	else if(val == 'up')
		this.update(0,-75);
	else 
		this.update(100,0);
};

Gamer.prototype.update = function(x,y) {
	console.log(this.x,this.y);	
	this.x = ((this.x+x)<500)&&((this.x+x)>-1)?(this.x+x):this.x;
	this.y = (this.y+y)<425&&(this.y+y)>-60?(this.y+y):this.y;
	check_if_won();
};

var check_if_won = function(){
	if (player.y == -10)
		player.sprite = 'images/Star.png';
	else
		player.sprite ='images/char-pink-girl.png';
};

Gamer.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
var First_row_enemy = function(){
	Enemy.call(this,0,60);
};
First_row_enemy.prototype = Object.create(Enemy.prototype);
First_row_enemy.prototype.constructor = First_row_enemy;

/*Creating second row only enemies*/
var Second_row_enemy = function(){
	Enemy.call(this,0,135);
};
Second_row_enemy.prototype = Object.create(Enemy.prototype);
Second_row_enemy.prototype.constructor = Second_row_enemy;


var Third_row_enemy = function(){
	Enemy.call(this,0,215);
};
Third_row_enemy.prototype = Object.create(Enemy.prototype);
Third_row_enemy.prototype.constructor = Third_row_enemy;
// Place all enemy objects in an array called allEnemies
var allEnemies=[];
allEnemies.push(new First_row_enemy());
allEnemies.push(new Second_row_enemy());
allEnemies.push(new Third_row_enemy());

// Place the player object in a variable called player
var player =  new Gamer();

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
