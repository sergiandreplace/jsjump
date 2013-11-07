var width=320;
var height=500;
var numCircles=10;
var circles=[];
var deltaY=10;
var player=new Player();
var numPlatforms=7;
var platforms=[];





/**
 * Creates a new circle
 * @return {circle} A brand new Circle
 */
var createCircle= function(fromBottom) {
	var circle={};
	circle.size=Math.random() * 100;
	circle.x=Math.random() * width;
	if (fromBottom) {
		circle.y=-circle.size;
	}else{
		circle.y=Math.random() * height; 
	}
	circle.alpha=Math.random() /2 + 0.25;
	return circle;
}



/**
 * clears screen
 * @return nothing
 */
var clear = function() {
	ctx.fillStyle = '#d0e7f9';
	ctx.beginPath();
	ctx.rect(0,0,width,height);
	ctx.closePath();
	ctx.fill();

};

/**
 * Performs a complete drawing of all circles
 * @return Nothing
 */
var drawCircles = function () {
	for (var i = 0; i<numCircles;i++) {
		ctx.fillStyle = 'rgba(255,255,255, ' + circles [i].alpha + ')';
		ctx.beginPath();
		ctx.arc(circles[i].x, circles[i].y, circles[i].size,0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}
};

/**
 * Scrolls all circles. Recreates them if out of screen
 * @return Nothing
 */
var moveCircles = function () {
	for (var i=0; i<numCircles; i++) {
		if (circles[i].y - circles[i].size>height) {
			circles[i]=createCircle(true);
		}else{
			circles[i].y += deltaY;
		}
	}
};

document.onmousemove = function(e) {
	if (player.x + c.offsetLeft > e.pageX) {
		player.moveLeft();
	}else if (player.x + c.offsetLeft < e.pageX) {
		player.moveRight();
	}
}

var generatePlatforms=function () {
	var position=0, type;
	for (var i=0; i<numPlatforms; i++) {
		type = ~~(Math.random()*5);
		type = (type==0) ? 1 : 0;
		platforms.push(new Platform(
			Math.random()*(width-platformWidth),position,type));
		if (position < height - platformHeight) { 
			position += ~~(height / numPlatforms);
		}
	}	
}

var checkCollisions=function() {
	platforms.forEach(
		function(platform,ind) {
			if(player.isFalling && 
				(player.x < platform.x + platformWidth) &&
				(player.x + player.width > platform.x) &&
				(player.y + player.height < platform.y + platformHeight) &&
				(player.y + player.height > platform.y)) {
					platform.onCollide();
				}
		}
	);
}


/**
 * Main game loop
 * @return Nothing
 */

var gameLoop = function() {
	clear();
	moveCircles();
	drawCircles();
	platforms.forEach(function(platform) {platform.draw();});
	checkCollisions();
	player.draw(ctx);
	if (player.isJumping) player.checkJump();
	if (player.isFalling) player.checkFall(height);
	gLoop = setTimeout(gameLoop, 1000/50);

};

//retrieve the canvas
c = document.getElementById('c');

ctx = c.getContext('2d');

c.width=width;
c.height=height;

// create clouds

for (var i=0; i<numCircles;i++) {
	circles.push(createCircle()); // transparency (0 transparent, 1 solid)
}
generatePlatforms();
//initializes player
player.setPosition(~~((width-player.width)/2),  ~~((height - player.height)/2));
player.jump();



gameLoop();