import FightingEngine from './FightingEngine';
import Apple from './Apple';
import BlockManager from './BlockManager';
import Snake from './Snake';

export default class SnakeManager {
	static snakeArray = [];

	static eventListenerFunc = {};

	static changeSnakeColor() {
		let snakeTotalNumber = SnakeManager.snakeArray.length;
		for (let nodeSnake = 0; nodeSnake < snakeTotalNumber; nodeSnake++) {
			SnakeManager.snakeArray[nodeSnake].color = Snake.snakeColor[Math.floor(Math.random() * Snake.snakeColor.length)];
		}
		SnakeManager.syncAllSnakePosition();
	}

	static calcAllSnakeIntX() {
		let snakeTotalNumber = SnakeManager.snakeArray.length;
		let intDivideBlock = BlockManager.intGameColumn / (snakeTotalNumber + 1);

		SnakeManager.syncAllSnakePosition(BlockManager.blockColor);

		for (let nodeSnake = 0; nodeSnake < snakeTotalNumber; nodeSnake++) {
			for (let snakeBody = 0; snakeBody < SnakeManager.snakeArray[nodeSnake].intSize; snakeBody++) {
				SnakeManager.snakeArray[nodeSnake].mapPosition[snakeBody].intX = parseInt(intDivideBlock * (nodeSnake + 1));
			}
		}
		SnakeManager.syncAllSnakePosition();
	}

	static initialSnakeProperty() {
		let snakeTotalNumber = SnakeManager.snakeArray.length;
		for (let nodeSnake = 0; nodeSnake < snakeTotalNumber; nodeSnake++) {
			SnakeManager.cleanSnakeCorpse(SnakeManager.snakeArray[nodeSnake]);
			SnakeManager.snakeArray[nodeSnake].initial();
		}
		SnakeManager.syncAllSnakePosition();
	}

	static cleanSnakeCorpse(snake) {
		for (let snakeBody = 0; snakeBody < snake.intSize; snakeBody++) {
			BlockManager.syncBlockRenderColor(
				snake.mapPosition[snakeBody].intX,
				snake.mapPosition[snakeBody].intY,
				'rgb(138, 138, 138)'
			);
		}
	}

	static syncAllSnakePosition(originalColor) {
		let snakeTotalNumber = SnakeManager.snakeArray.length;
		for (let nodeSnake = 0; nodeSnake < snakeTotalNumber; nodeSnake++) {
			for (let snakeBody = 0; snakeBody < SnakeManager.snakeArray[nodeSnake].intSize; snakeBody++) {
				BlockManager.syncBlockRenderColor(
					SnakeManager.snakeArray[nodeSnake].mapPosition[snakeBody].intX,
					SnakeManager.snakeArray[nodeSnake].mapPosition[snakeBody].intY,
					originalColor
						? originalColor
						: !SnakeManager.snakeArray[nodeSnake].isDie
						? SnakeManager.snakeArray[nodeSnake].color
						: 'rgb(56, 56, 56)'
				);
			}
		}
	}

	static changeSnakeName(event, snake) {
		delete SnakeManager.eventListenerFunc[snake.strName];
		snake.strName = event.currentTarget.textContent;
		SnakeManager.eventListenerFunc[snake.strName] = snake.addIfToEventListener.bind(snake);
	}

	static EventListener(event, snakeName) {
		SnakeManager.eventListenerFunc[snakeName](event);

		setTimeout(1500 / FightingEngine.intGameSpeed);
	}
	static addSnakeEventListener(snake) {
		SnakeManager.eventListenerFunc[snake.strName] = snake.addIfToEventListener.bind(snake);
	}

	static moveAllSnake() {
		let snakeTotalNumber = SnakeManager.snakeArray.length;
		for (let nodeSnake = 0; nodeSnake < snakeTotalNumber; nodeSnake++) {
			SnakeManager.snakeArray[nodeSnake].move();
		}
	}

	static isSnakeEatApple() {
		let snakeTotalNumber = SnakeManager.snakeArray.length;
		for (let nodeSnake = 0; nodeSnake < snakeTotalNumber; nodeSnake++) {
			let snake = SnakeManager.snakeArray[nodeSnake];
			if (
				snake.mapPosition[0].intX === Apple.mapPosition.intX &&
				snake.mapPosition[0].intY === Apple.mapPosition.intY
			) {
				snake.eatApple();
				Apple.randomApplePosition();

				FightingEngine.findHighScore();
				return;
			}
		}
	}
	static isAllSnakeDie() {
		let isAllSnakeDie = true;
		let snakeTotalNumber = SnakeManager.snakeArray.length;
		for (let nodeSnake = 0; nodeSnake < snakeTotalNumber; nodeSnake++) {
			isAllSnakeDie = isAllSnakeDie && SnakeManager.snakeArray[nodeSnake].isDie;
		}
		return isAllSnakeDie;
	}

	static findHighScore(highScore) {
		let snakeTotalNumber = SnakeManager.snakeArray.length;
		for (let nodeSnake = 0; nodeSnake < snakeTotalNumber; nodeSnake++) {
			highScore =
				highScore > SnakeManager.snakeArray[nodeSnake].intScore
					? highScore
					: SnakeManager.snakeArray[nodeSnake].intScore;
		}
		return highScore;
	}
}
