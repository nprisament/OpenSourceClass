const WIDTH = 100, HEIGHT = 100, size = 4;
let grid, isStart = true, pause = false;
let snake, length = 5, xDot, yDot, direction = 'right';

function setup() { 
	grid = new Array(HEIGHT).fill(new Array(WIDTH).fill(0));
	snake = new Array(2).fill(new Array(1));
  snake[0][0] = floor(HEIGHT / 2);
  snake[1][0] = floor(WIDTH / 2);
	//load the grid
	noStroke();
	createCanvas(400, 400);
}

function draw() {
	if (isStart) {
		startDraw();
		return;
	}
	if (pause) return;
	background(220);
  text(key, 33, 65);
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
  switch (key) {
    case 'a':
    case 'ArrowLeft':
      if (direction != 'right') {
        direction = 'left';
      }
      break;
    case 'd':
    case 'ArrowRight':
      if (direction != 'left') {
        direction = 'right';
      }
      break;
    case 'w':
    case 'ArrowUp':
      if (direction != 'down') {
        direction = 'up';
      }
      break;
    case 's':
    case 'ArrowDown':
      if (direction != 'up') {
        direction = 'down';
      }
      break;
    case '1':
    case 'Control':
    	isStart = false;
    	break;
    case 'Delete':
      isStart = true;
      break;
    case 'q':
    case 'Shift':
    	pause = !pause;
  }
}
