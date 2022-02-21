import Gamesnake from './GameSnake';
import GameApple from './GameApple';

export default class GameController {
	static MapBlockSize: number = 20;
	static MapBlockCount: number = 20;

	static gameSpeed: number = 10;

	static snakesArray: Array<Gamesnake> = [];
	static snakeCounts: number = 0;

	static gameApple: GameApple;

	constructor() {
		GameController.snakesArray.push(new Gamesnake(GameController.snakeCounts));

		GameController.gameApple = new GameApple();
	}

	static initial(): void {
		for (let i: number = 0; i < GameController.snakesArray.length; i++) {
			GameController.snakesArray[i].initial();
		}
		GameController.gameApple.initial();
	}

	static issnakeGoToLegalWay(snakeNumber: number, newDirectionX: number, newDirectionY: number): boolean {
		if (
			newDirectionX === GameController.snakesArray[snakeNumber].direction.x ||
			newDirectionY === GameController.snakesArray[snakeNumber].direction.y
		)
			return true;
		return false;
	}

	static moveSnake(snake: Gamesnake): void {
		let newBlock = {
			x: snake.body[0].x + snake.direction.x,
			y: snake.body[0].y + snake.direction.y,
		};

		snake.body.unshift(newBlock);

		while (snake.body.length > snake.size) {
			snake.body.pop();
		}
	}
}
