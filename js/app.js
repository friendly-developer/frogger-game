// Enemies our player must avoid
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
    
   this.x = this.x+((Math.random() * (11 - 1 + 1) + 1)*dt*35);
   
   this.y = this.y;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Gamer = function(){
	this.x= 10;
	this.y = 300;
 this.sprite ='images/char-pink-girl.png';
}

Gamer.prototype.handleInput = function(val){
	debugger;
	if(val == 'left')
		this.update(-100,0);
	else if(val == 'down')
		this.update(0,100);
	else if(val == 'up')
		this.update(0,-100);
	else 
		this.update(100,0);
}
Gamer.prototype.update = function(x,y) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(!x&&!y) {
    	x=0;
    	y=0;
    }
    
    this.x = this.x+x;
    this.y = this.y+y;
};

Gamer.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies=[];
allEnemies.push(new Enemy(0,135))
allEnemies.push(new Enemy(0,225))
allEnemies.push(new Enemy(0,50))
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
