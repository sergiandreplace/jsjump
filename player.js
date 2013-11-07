function Player() {
	var that=this;
	that.image=new Image();	
	that.width=65;
	that.height=95;
	that.x=0;
	that.y=0;
	that.frames=2;
	that.frame=0;
	that.interval=0;
	that.maxInterval=4;
	that.isJumping=false;
	that.isFalling=false;
	that.jumpSpeed=0;
	that.fallSpeed=0;
	that.moveStep=5;



	that.image.src = 'angel.png';
	

	that.setPosition=function (x,y) {
		that.x=x;
		that.y=y;
	};

	that.draw = function(ctx) {
		try {
	        ctx.drawImage(that.image, 
	        	0, that.height * that.frame, 
	        	that.width, that.height, 
	        	that.x, that.y, 
	        	that.width, that.height);
		}catch(e) {
		}
		if (that.interval>=that.maxInterval) {
			that.frame++;
			if (that.frame>=that.frames) that.frame = 0;
			that.interval=0;
		}
		that.interval++;
	}

	that.jump = function () {
		if (!that.isJumping && !that.isFalling) {
			that.fallSpeed=0;
			that.isJumping=true;
			that.jumpSpeed=17;
		}
	}

	that.checkJump = function() {
		if (that.y > height * 0.4) {
			that.setPosition(that.x, that.y - that.jumpSpeed);
		}else{
			moveCircles(that.jumpSpeed * 0.5);
			platforms.forEach(function(platform,ind) {
				platform.y += that.jumpSpeed;
				if (platform.y>height) {
					var type=~~(Math.random() * 5);
					type = (type==0) ? 1 : 0;
					platforms[ind] = new Platform (
						Math.random() * width - platformWidth,
						platform.y - height, type
					);
				}
			});
		}
		that.jumpSpeed--;
		if (that.jumpSpeed<=0) {
			that.isJumping=false;
			that.isFalling=true;
			that.fallSpeed=1;
		}
	}

	that.checkFall = function (height) {
		if (that.y< height - that.height) {
			that.setPosition(that.x, that.y + that.fallSpeed);
			that.fallSpeed++;
		}else{
			that.fallStop();
		}
		
	}

	that.fallStop = function() {
		that.isFalling = false;
		that.fallSpeed=0;
		that.jump();
	}

	that.moveLeft = function() {
		if (that.x>0) {
			that.setPosition(that.x - that.moveStep, that.y);
		}
	}

	that.moveRight = function() {
		if (that.x + that.width < width) {
			that.setPosition(that.x + that.moveStep, that.y);
		}
	}

};