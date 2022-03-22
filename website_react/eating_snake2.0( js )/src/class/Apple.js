import BlockManager from './BlockManager';
import SnakeManager from './SnakeManager';

export default class Apple {
	static mapPosition = {
		intX: parseInt(BlockManager.intGameColumn / 2),
		intY: parseInt(BlockManager.intGameRow / 2) - 3,
	};

	static initialApple() {
		Apple.cleanLastApple();

		this.mapPosition = {
			intX: parseInt(BlockManager.intGameColumn / 2),
			intY: parseInt(BlockManager.intGameRow / 2) - 3,
		};
		Apple.renderAppleToView();
	}

	static randomApplePosition() {
		Apple.mapPosition = {
			intX: Math.floor(Math.random() * BlockManager.intGameColumn),
			intY: Math.floor(Math.random() * BlockManager.intGameRow),
		};

		let snakeTotalNumber = SnakeManager.snakeArray.length;
		for (let nodeSnake = 0; nodeSnake < snakeTotalNumber; nodeSnake++) {
			let snake = SnakeManager.snakeArray[nodeSnake];
			for (let snakeBody = 0; snakeBody < snake.mapPosition.length; snakeBody++) {
				if (
					Apple.mapPosition.intX === snake.mapPosition[snakeBody].intX &&
					Apple.mapPosition.intY === snake.mapPosition[snakeBody].intY
				) {
					Apple.randomApplePosition();
					return;
				}
			}
		}

		Apple.renderAppleToView();
	}
	static renderAppleToView() {
		BlockManager.syncBlockRenderColor(Apple.mapPosition.intX, Apple.mapPosition.intY, 'red');
	}

	static cleanLastApple() {
		BlockManager.syncBlockRenderColor(Apple.mapPosition.intX, Apple.mapPosition.intY, 'rgb(138, 138, 138)');
	}
}
