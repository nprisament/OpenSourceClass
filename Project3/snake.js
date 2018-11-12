const WIDTH = 100, HEIGHT = 100, size = 4;
let grid, isStart = false, isPaused = false;
let snake, length = 5, xDot, yDot, direction = 'right';

function setup() { 
	grid = new Array(HEIGHT).fill(new Array(WIDTH).fill(0));
	snake = new Array(2).fill(new Array(1).fill(WIDTH / 2));
	//load the grid
	noStroke();
	createCanvas(400, 400);
} 

function draw() {
	//if start screen
	//if paused, continue

	//find the keyboard input
	background(220);
	//move snake
	//check for collision
	//print snake and board
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
  }
}
