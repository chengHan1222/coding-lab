import React, { useState } from 'react';
import GameController from './object/GameController';

let gameInterval: NodeJS.Timer;

new GameController();
for (let snakeNumber: number = 0; snakeNumber < GameController.snakesArray.length; snakeNumber++) {
	GameController.snakesArray[snakeNumber].setSnakeController();
}
window.onload = () => updateCanvas();

export default function PlayEngine() {
	let [snakeScore, setSnakeScore] = useState(GameController.snakesArray[0].score);

	function gameStart(): void {
		GameController.initial();

		setSnakeScore(GameController.snakesArray[0].score);

		gameInterval = setInterval(gameRoutine, 1000 / GameController.gameSpeed);
	}

	function gameRoutine(): void {
		let snake = GameController.snakesArray[0]; // 多條蛇要更改

		GameController.moveSnake(snake);

		if (snake.isSnakeDie()) {
			clearInterval(gameInterval);
			return;
		}

		if (snake.isSnakeEatApple()) {
			snake.eatApple();

			setSnakeScore((s) => s + 1);
		}

		updateCanvas();
	}

	return (
		<div>
			<div className="titleBlock">
				<button id="startButton" onClick={gameStart}>
					Start
				</button>
				<h1>{snakeScore}</h1>
			</div>
			<canvas id="canvasId" width="400" height="400"></canvas>
		</div>
	);
}

function updateCanvas(): void {
	let canvas: any = document.getElementById('canvasId');
	let content = canvas.getContext('2d');

	content.fillStyle = 'black';
	content.fillRect(0, 0, canvas.width, canvas.height);

	// draw snake
	content.fillStyle = 'lime';
	for (let snakeNumber: number = 0; snakeNumber < GameController.snakesArray.length; snakeNumber++) {
		let snake = GameController.snakesArray[snakeNumber];

		for (let i: number = 0; i < snake.body.length; i++) {
			content.fillRect(
				snake.body[i].x * GameController.MapBlockSize + 1,
				snake.body[i].y * GameController.MapBlockSize + 1,
				GameController.MapBlockSize - 1,
				GameController.MapBlockSize - 1
			);
		}
	}

	//draw apple
	content.fillStyle = 'red';
	content.fillRect(
		GameController.gameApple.position.x * GameController.MapBlockSize + 1,
		GameController.gameApple.position.y * GameController.MapBlockSize + 1,
		GameController.MapBlockSize - 1,
		GameController.MapBlockSize - 1
	);
}
