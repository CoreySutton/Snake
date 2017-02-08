function Food(scale) {

	this.cols = floor(width / scale);
	this.rows = floor(height / scale);

	this.x = floor(random(this.cols)) * scale;
	this.y = floor(random(this.rows)) * scale;

	this.draw = function draw() {
		fill(255, 0, 0);
		rect(this.x, this.y, scale, scale);
	};

	this.update = function update() {
		this.x = floor(random(this.cols)) * scale;
		this.y = floor(random(this.rows)) * scale;
	};
}