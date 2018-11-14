// Uses data provided by mtgjson4

const WIDTH = 70, HEIGHT = 70, size = 10, keys = Object.keys(data);
let grid, xSnake, ySnake, length, xDot, yDot, lastDirection, direction;
let isStart = true, pause = false, party = false, over = false;
let num = 0, score, highScore = 0, name;

const mod = (num) => num * size + floor(size / 2);
const gameOver = () => {highScore = (highScore < score ? score : highScore); over = true;}

// takes a uuid and returns a hashed code from 0 to the maximum integer value
// not made by me, credit to bryc on GitHub (using open source code snippets)
function hashCode(s) {
    for(var i = 0, h = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h;
}

function setup() {
	createCanvas(WIDTH * size, HEIGHT * size);
	frameRate(5);
	stroke(255);
	textStyle(NORMAL);
}

// initialize game variables
function init() {
	frameRate(15);
	xSnake = new Array(1).fill(floor(WIDTH / 2));
	ySnake = new Array(1).fill(floor(HEIGHT / 2));
	score = -1;
	length = 2;
	pause = false;
	lastDirection = direction = 'right';
	grid = new Array();
	for (let i = 0; i < WIDTH; i++)
		grid.push(new Array(HEIGHT).fill(false));
	const index = floor(random(0, keys.length)), 
		int = abs(hashCode(data[keys[index]].uuid)),
		digits = (""+int).split(""),
		cmc = data[keys[index]].convertedManaCost;
	name = data[keys[index]].name;
	for (var i = 0; i < cmc * 3 && i < floor(digits.length / 2); i += 2) {
		grid[(digits[i] * (int % WIDTH)) % WIDTH]
			[(digits[i + 1] * (int % HEIGHT)) % HEIGHT] = true;
	}
	eatDot();
}

// the game loop
function draw() {
	if (over) {
		strokeWeight(0);
		fill(0);
		textSize(size * 3);
		text('Game Over     High Score: ' + highScore, mod(WIDTH / 5), mod(HEIGHT / 2));
		text('Press 1 to Start a New Game', mod(WIDTH / 5), mod(5 * HEIGHT / 8));
	return;
	}
	if (isStart) {
		startDraw();
		return;
	}
	if (pause) {
		strokeWeight(0);
		fill(0);
		textSize(size * 4);
		text('Paused', mod(WIDTH / 3), mod(HEIGHT / 2));
		return;
	}
	background(100);
	if (party) partyDraw();
	moveSnake();
	//game elements
	snakeDraw();
	gridDraw();
	//score
	fill(200);
	strokeWeight(0);
	textSize(size*2);
	text('Score: ' + score, 10, 30);
	text('Name: ' + name, WIDTH * size / 3, 30);
}

// moves the snake for one game frame
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
	if (newX == xDot && newY == yDot) {
		eatDot();
		addBarrier();
	} else if (newX > WIDTH - 1 || newX < 0 ||
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

// tests if the given point can be
// used for a barrier of a dot
function testPoint(x, y) {
	if (grid[x][y]) return false;
	let inSnake = false;
	for (let i = 0; i < xSnake.length; i++) {
		if (xSnake[i] == x && ySnake[i] == y)
			inSnake = true;
	}
	return !inSnake;  
}

// adjusts the snake and makes a new dot
function eatDot() {
	score++;
	length += 3 + (score > 5 ? score - 5 : 0) ;
	let makingDot = true;
	while(makingDot) {
		xDot = floor(random(10, WIDTH - 10));
		yDot = floor(random(10, HEIGHT - 10));
		makingDot = !testPoint(xDot, yDot);
	}
}

// makes a new barrier
function addBarrier() {
	let makingBarrier = true;
	let xB, yB;
	while(makingBarrier) {
		xB = floor(random(0, WIDTH));
		yB = floor(random(0, HEIGHT));  
		makingBarrier = !testPoint(xB, yB);
	}
	grid[xB][yB] = true;
}

// draws out the snake
function snakeDraw() {
	strokeWeight(size);
	stroke(255);
	for (let i = 0; i < xSnake.length - 1; i++)
		line(mod(xSnake[i]), mod(ySnake[i]), mod(xSnake[i + 1]), mod(ySnake[i + 1]));
}

// draws out the barriers
function gridDraw() {
	strokeWeight(size);
	stroke(0, 0, 180);
	//draw barriers
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++)
			if (grid[i][j]) line(mod(i), mod(j), mod(i), mod(j));
	}
	//draw dot
	stroke(180,0,0);
	line(mod(xDot), mod(yDot), mod(xDot), mod(yDot));
}

// draws the start page/menu
function startDraw() {
	background(80);
	fill(random(0, 255), random(0, 255), random(0, 255));
	rect(WIDTH * size / 8, HEIGHT * size / 8, 3 * WIDTH * size / 4, 3 * HEIGHT * size / 4, 40);
	strokeWeight(0);
	fill(0);
	textSize(size * 3);
	text('P5 SNAKE', mod(WIDTH / 4), mod(HEIGHT / 2));
	text('Press 1 to Start', mod(WIDTH / 4), mod(5 * HEIGHT / 8));
	textSize(size * 2);
	text('By Noah Prisament', mod(WIDTH / 4), mod(9 * HEIGHT / 16));
}

// adds the party shape
function partyDraw() {
	if (num % 2 == 1) {
	fill(random(0, 255), random(0, 255), random(0, 255));
	rect(random(0, 2 * WIDTH * size / 5), random(0, 2* HEIGHT * size / 5), 
		random(WIDTH * size / 4, 3 * WIDTH * size / 4),
		random(HEIGHT * size / 4, 3 * HEIGHT * size / 4), random(0, 40));
	}
	num++;
}

// adjusts variables when a
// key is pressed
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
			init();
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
