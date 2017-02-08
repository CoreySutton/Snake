var snake;

function setup() {
	var scale = 15;
	var canvasScale = 30;
	
	createCanvas(canvasScale * scale, canvasScale * scale);
	
	frameRate(15);
	
	snake = new Snake(scale);
	snake.setup();
}

function draw() {
	background(51);
	snake.draw();
}

function keyPressed() {
	snake.setDirection();
}