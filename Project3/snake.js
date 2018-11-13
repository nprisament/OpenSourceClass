const WIDTH = 70, HEIGHT = 70, size = 10;
let grid, isStart = true, pause = false, party = false, over = false, score, scores = [];
let xSnake, ySnake, length, xDot, yDot, lastDirection, direction;

function setup() {
	createCanvas(WIDTH * size, HEIGHT * size);
	frameRate(15);
  	stroke(255);
	textStyle(NORMAL);
	init();
}

function draw() {
	if (over) {
		gameOverDraw();
		return;
	}
	if (isStart) {
		startDraw();
		return;
	}
	if (pause) {
		pauseDraw();
		return;
	}
	background(100);
	if (party) partyDraw();
	moveSnake();
	strokeWeight(size);
	snakeDraw();
	gridDraw();
	fill(255);
  	strokeWeight(0);
	textSize(size*2);
	text('Score: ' + score, 10, 30);
}

function init() {
	grid = new Array(HEIGHT).fill(new Array(WIDTH).fill(false));
	xSnake = new Array(1).fill(floor(WIDTH / 2));
	ySnake = new Array(1).fill(floor(HEIGHT / 2));
	score = -1;
	length = 2;
	pause = false;
	lastDirection = direction = 'right';
	eatDot();
	//load the grid
}

function moveSnake() {
	let newX = xSnake[xSnake.length - 1];
	let newY = ySnake[ySnake.length - 1];
	if (direction == 'right' && lastDirection == 'left') direction = 'left';
	if (direction == 'left' && lastDirection == 'right') direction = 'right';
	if (direction == 'up' && lastDirection == 'down') direction = 'down';
	if (direction == 'down' && lastDirection == 'up') direction = 'up';
	switch(direction) {
		case 'right':
			newX++;
			break;
		case 'left':
			newX--;
			break;
		case 'down':
			newY++;
			break;
		case 'up':
			newY--;
			break;
	}
	if (newX == xDot && newY == yDot) eatDot();
	else if (newX > WIDTH - 1 || newX < 0 ||
		newY > HEIGHT - 1 || newY < 0) gameOver(); 
	else if (grid[newX][newY]) gameOver();
	else {
		let inSnake = false;
		for (let i = 0; i < xSnake.length; i++) {
			if (xSnake[i] == newX && ySnake[i] == newY)
				inSnake = true;
		}
		if (inSnake) gameOver();
		else {
			xSnake.push(newX);
			ySnake.push(newY);
		}
	}
	if (xSnake.length > length) {
		xSnake.shift();
		ySnake.shift();
	}
	lastDirection = direction;
}

function eatDot() {
	score++;
	length += 3;
	let makingDot = true;
	while(makingDot) {
		xDot = floor(random(10, WIDTH - 10));
		yDot = floor(random(10, HEIGHT - 10));
		if (grid[xDot][yDot]) continue;
		let inSnake = false;
		for (let i = 0; i < xSnake.length; i++) {
			if (xSnake[i] == xDot && ySnake[i] == yDot)
				inSnake = true;
		}
		if (inSnake) continue;
		makingDot = false;
	}
	addBarrier();
}

function addBarrier() {
//later
}

function gameOver() {
	scores.push(score);
	init();
	over = true;
	isStart = true;
}

mod = (num) => num * size + floor(size / 2);

function snakeDraw() {
	for (let i = 0; i < xSnake.length - 1; i++)
		line(mod(xSnake[i]), mod(ySnake[i]), mod(xSnake[i + 1]), mod(ySnake[i + 1]));
}

function gridDraw() {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++)
			if (grid[i][j]) line(mod(i), mod(j), mod(i), mod(j));
	}
	line(mod(xDot), mod(yDot), mod(xDot), mod(yDot));
}

function startDraw() {
	background(0);
	//some design
	//name
	//how to start
}

function gameOverDraw() {
	background(0);
	//draw a game over state,
	//make it clickable to go back to start menu	
}

function pauseDraw() {
	textSize(size * 4);
	text('Paused', mod(WIDTH / 4), mod(HEIGHT / 2));
}

function partyDraw() {

}

function keyPressed() {
	switch (key) {
		case 'a':
		case 'ArrowLeft':
			if (direction != 'right')
				direction = 'left';
			break;
		case 'd':
		case 'ArrowRight':
			if (direction != 'left')
				direction = 'right';
			break;
		case 'w':
		case 'ArrowUp':
			if (direction != 'down')
				direction = 'up';
			break;
		case 's':
		case 'ArrowDown':
			if (direction != 'up')
				direction = 'down';
			break;
		case '1':
			over = false;
			isStart = false;
			break;
		case 'Delete':
			isStart = true;
			break;
		case 'q':
		case 'Shift':
			pause = !pause;
			break;
		case 'p':
			party = !party;
			break;
  }
}
