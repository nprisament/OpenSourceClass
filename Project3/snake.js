const WIDTH = 100, HEIGHT = 100, size = 4;
let grid, isStart = true, isPaused = false;
let snake, length = 5, xDot, yDot, direction = 'right';

function setup() { 
	grid = new Array(HEIGHT).fill(new Array(WIDTH).fill(0));
	snake = new Array(2).fill(new Array(1).fill(WIDTH / 2));
	//load the grid
	noStroke();
	createCanvas(400, 400);
}

function draw() {
	if (start) {
		startDraw();
		return;
	}
	if (paused) return;
	background(220);
	moveSnake();
	check();
	snakeDraw();
	gridDraw();
}

function startDraw() {

}

function snakeDraw() {

}

function gridDraw() {

}

function moveSnake() {

}

function check() {

}

function keyPressed() {
  switch (keyCode) {
    case 74:
      if (direction != 'right') {
        direction = 'left';
      }
      break;
    case 76:
      if (direction != 'left') {
        direction = 'right';
      }
      break;
    case 73:
      if (direction != 'down') {
        direction = 'up';
      }
      break;
    case 75:
      if (direction != 'up') {
        direction = 'down';
      }
      break;
    case start:
    	isStart = false;
    	break;
    case pause:
    	pause = !pause;
  }
}
