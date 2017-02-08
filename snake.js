function Snake(scale) {

	var lastX = 0;
	var lastY = 0;

	var x = 0;
	var y = 0;

	var xSpeed = 0;
	var ySpeed = 1;

	var tail = [];

	var score = 0;
	var highScore = 0;

	var food;

	var setup = function setup() {
		food = new Food(scale);
		food.draw();
	};

	var draw = function draw() {
		if (hasEatenSelf()) {
			x = 0;
			y = 0;
			xSpeed = 0;
			ySpeed = 0;

			tail = [];
			if (highScore < score)
				highScore = score;
			score = 0;
		}
		else {
			if (isEating()) {
				food.update();
				score++;
				tail.push({ 
					x: x,
					y: y,
					xSpeed: 0,
					ySpeed: 0
				});
			}
			updateHead();
			updateTail();
			setScores();
		}
		
		fill(255);
		rect(x, y, scale, scale);

		drawTail();

		food.draw();
	};

	var setScores = function setScores() {
		document.getElementById('score').innerHTML = score;
		document.getElementById('high-score').innerHTML = highScore;
	};

	var updateHead = function updateHead() {

		lastX = x;
		lastY = y;

		// Right Edge
		if (x === width - scale
			&& xSpeed === 1){
			x = 0;
		}

		// Bottom Edge
		else if (y === height - scale
			&& ySpeed === 1){
			y = 0
		}

		// Left Edge
		else if (x === 0
			&& xSpeed === -1){
			x = width - scale;
		}

		// Top Edge
		else if (y === 0
			&& ySpeed === -1){
			y = height - scale;
		}

		// No edge
		else {
			x += xSpeed * scale;
			y += ySpeed * scale;
		}	
	}

	var drawTail = function drawTail() {
		for(var i = 0; i < tail.length; i++) {
			fill(255);
			var ct = tail[i];
			rect(ct.x + ct.xSpeed, ct.y + ct.ySpeed, scale, scale);

			var nt = tail[i+1];
			if (nt) {
				nt.xSpeed = ct.xSpeed;
				nt.ySpeed = ct.ySpeed;
			}
		}
	}

	var updateTail = function updateTail() {
		var tempX = 0;
		var tempY = 0;

		var nextX = lastX;
		var nextY = lastY;
      	for (var i = 0; i < tail.length; i++) {
	      	tempX = tail[i].x;
	      	tempY = tail[i].y;

	      	tail[i].x = nextX;
	      	tail[i].y = nextY;

	      	nextX = tempX;
	      	nextY = tempY;
	      } 
	}

	var setDirection = function setDirection() {
		if (keyCode === UP_ARROW && xSpeed !== 0) {
			xSpeed = 0;
			ySpeed = -1;
		} else if (keyCode === DOWN_ARROW && xSpeed !== 0) {
			xSpeed = 0;
			ySpeed = 1;
		} else if (keyCode === RIGHT_ARROW && ySpeed !== 0) {
			xSpeed = 1;
			ySpeed = 0;
		} else if (keyCode === LEFT_ARROW && ySpeed !== 0) {
			xSpeed = -1;
			ySpeed = 0;
		}
	}

	var isEating = function isEating() {
		var d = int(dist(x, y, food.x, food.y));
		if (d === 0)
			return true;
		return false;
	}

	var hasEatenSelf = function hasEatenSelf() {
		for (var i = 0; i < tail.length; i++) {
			if(0 === int(dist(x, y, tail[i].x, tail[i].y))) {				
				return true;
			}	
		}
		return false;
	}

	return {
		setup: setup,
		draw: draw,
		setDirection: setDirection
	};
}