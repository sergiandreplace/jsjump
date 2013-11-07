var platformWidth=70;
var platformHeight=20;

function Platform(x, y, type) {
	var that=this;

	that.x=~~x;
	that.y=y;
	that.type=type;


	if (type==1) {
		that.firstColor='#AADD00';
		that.secondColor='#698B22';
		that.onCollide = function() {
			player.fallStop();
			player.jumpSpeed=50;
		}
	}else{
		that.firstColor='#FF8C00';
		that.secondColor='#EEEE00';
		that.onCollide = function () {
			player.fallStop();
		}
	}

	that.draw = function () {
		ctx.fillStyle = 'rgba(255,255,255,1)';
		var gradient=ctx.createRadialGradient(
			that.x + (platformWidth/2), that.y + platformHeight/2,5, 
			that.x + (platformWidth/2), that.y + (platformHeight/2), 45);
		gradient.addColorStop(0, that.firstColor);
		gradient.addColorStop(1, that.secondColor);
		ctx.fillStyle=gradient;
		ctx.fillRect(that.x, that.y, platformWidth, platformHeight);

	}
	


	return that;
}