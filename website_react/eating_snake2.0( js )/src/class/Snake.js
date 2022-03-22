import BlockManager from './BlockManager';
import FightingEngine from './FightingEngine';
import SnakeManager from './SnakeManager';

export default class Snake {
	static snakeColor = [
		'orange',
		'yellow',
		'green',
		'greenyellow',
		'blue',
		'purple',
		'brown',
		'aliceblue',
		'cadetblue',
		'bisque',
		'darkgreen',
		'gold',
		'chocolate',
		'pink',
		'Thistle',
	];

	strName = 'Snake';
	color = Snake.snakeColor[Math.floor(Math.random() * Snake.snakeColor.length)];
	intScore = 0;
	mapPosition = [
		{ intX: parseInt(BlockManager.intGameColumn / 2), intY: parseInt(BlockManager.intGameRow / 2) },
		{ intX: parseInt(BlockManager.intGameColumn / 2), intY: parseInt(BlockManager.intGameRow / 2) + 1 },
		{ intX: parseInt(BlockManager.intGameColumn / 2), intY: parseInt(BlockManager.intGameRow / 2) + 2 },
	];
	intSize = 3;

	strUpKey = 'ArrowUp';
	strDownKey = 'ArrowDown';
	strLeftKey = 'ArrowLeft';
	strRightKey = 'ArrowRight';

	goAheadDirection = { goAhead: 'UP', intX: 0, intY: -1 };

	isDie = false;

	constructor(strName) {
		this.strName = strName;
		SnakeManager.snakeArray.push(this);
	}

	initial() {
		this.mapPosition = [
			{ intX: parseInt(BlockManager.intGameColumn / 2), intY: parseInt(BlockManager.intGameRow / 2) },
			{ intX: parseInt(BlockManager.intGameColumn / 2), intY: parseInt(BlockManager.intGameRow / 2) + 1 },
			{ intX: parseInt(BlockManager.intGameColumn / 2), intY: parseInt(BlockManager.intGameRow / 2) + 2 },
		];
		this.intSize = 3;
		this.goAheadDirection = { goAhead: 'UP', intX: 0, intY: -1 };
		this.intScore = 0;
		this.isDie = false;
	}

	addIfToEventListener(event) {
		if (event.key === this.strUpKey) {
			if (this.goAheadDirection.goAhead === 'DOWN') return;
			this.goAheadDirection = { goAhead: 'UP', intX: 0, intY: -1 };
			this.move();
		}
		if (event.key === this.strDownKey) {
			if (this.goAheadDirection.goAhead === 'UP') return;
			this.goAheadDirection = { goAhead: 'DOWN', intX: 0, intY: 1 };
			this.move();
		}
		if (event.key === this.strLeftKey) {
			if (this.goAheadDirection.goAhead === 'RIGHT') return;
			this.goAheadDirection = { goAhead: 'LEFT', intX: -1, intY: 0 };
			this.move();
		}
		if (event.key === this.strRightKey) {
			if (this.goAheadDirection.goAhead === 'LEFT') return;
			this.goAheadDirection = { goAhead: 'RIGHT', intX: 1, intY: 0 };
			this.move();
		}

		FightingEngine.checkGameEvent();
	}

	move() {
		if (this.isDie) return;
		this.mapPosition.unshift({
			intX: this.mapPosition[0].intX + this.goAheadDirection.intX,
			intY: this.mapPosition[0].intY + this.goAheadDirection.intY,
		});

		if (this.isHitBorderOrItself()) return;
		this.isHitOtherBody();

		while (this.mapPosition.length > this.intSize) {
			let removePosition = this.mapPosition.pop();
			Snake.syncRenderRemoveBlock(removePosition);
		}
	}
	isHitBorderOrItself() {
		if (
			this.mapPosition[0].intX < 0 ||
			this.mapPosition[0].intX >= BlockManager.intGameColumn ||
			this.mapPosition[0].intY < 0 ||
			this.mapPosition[0].intY >= BlockManager.intGameRow
		) {
			Snake.snakeDie(this);
			return true;
		}
		for (let snakeBody = 1; snakeBody < this.intSize; snakeBody++) {
			if (
				this.mapPosition[0].intX === this.mapPosition[snakeBody].intX &&
				this.mapPosition[0].intY === this.mapPosition[snakeBody].intY
			) {
				Snake.snakeDie(this);
				return true;
			}
		}
		return false;
	}
	isHitOtherBody() {
		let nodeSnakeLength = SnakeManager.snakeArray.length;
		for (let nodeSnake = 0; nodeSnake < nodeSnakeLength; nodeSnake++) {
			if (this.strName === SnakeManager.snakeArray[nodeSnake].strName || SnakeManager.snakeArray[nodeSnake].isDie)
				return;
			if (
				this.mapPosition[0].intX === SnakeManager.snakeArray[nodeSnake].mapPosition[0].intX &&
				this.mapPosition[0].intY === SnakeManager.snakeArray[nodeSnake].mapPosition[0].intY
			) {
				Snake.snakeDie(this);
				return;
			}
			let snakeBody = SnakeManager.snakeArray[nodeSnake].mapPosition.length;
			for (let body = 1; body < snakeBody; body++) {
				if (
					this.mapPosition[0].intX === SnakeManager.snakeArray[nodeSnake].mapPosition[body].intX &&
					this.mapPosition[0].intY === SnakeManager.snakeArray[nodeSnake].mapPosition[body].intY
				) {
					Snake.beEatenBody(SnakeManager.snakeArray[nodeSnake], body);
					return;
				}
			}
		}
	}
	static beEatenBody(snake, bodyPosition) {
		let preBodyLength = snake.mapPosition.length;
		let newBodyLength = bodyPosition + 1;
		snake.intSize = newBodyLength;
		let newScore = snake.intScore - preBodyLength + newBodyLength;
		snake.intScore = newScore < 0 ? 0 : newScore;
	}

	eatApple() {
		this.intSize++;
		this.intScore++;
		this.syncRenderScore();
		this.mapPosition.push(this.mapPosition[this.mapPosition.length - 1]);
	}

	static snakeDie(snake) {
		snake.mapPosition.shift();
		snake.isDie = true;
	}

	static syncRenderRemoveBlock(removePosition) {
		BlockManager.syncBlockRenderColor(removePosition.intX, removePosition.intY, 'rgb(138, 138, 138)');
	}

	syncRenderScore() {}
}
