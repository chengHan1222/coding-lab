import GameController from './GameController';

export default class GameApple {
	position: { [key: string]: number } = {
		x: GameController.MapBlockCount / 2,
		y: GameController.MapBlockCount / 2 - 7,
	};

	initial(): void {
		this.position.x = GameController.MapBlockCount / 2;
		this.position.y = GameController.MapBlockCount / 2 - 7;
	}

	private randomApplePosition(): void {
		this.position.x = Math.floor(Math.random() * GameController.MapBlockCount);
		this.position.y = Math.floor(Math.random() * GameController.MapBlockCount);
	}

	putApple(): void {
		this.randomApplePosition();

		for (let snakenumber: number = 0; snakenumber < GameController.snakesArray.length; snakenumber++) {
			let snake = GameController.snakesArray[snakenumber];

			for (let i: number = 0; i < snake.body.length; i++) {
				if (snake.body[i].x === this.position.x && snake.body[i].y === this.position.y) {
					this.putApple();
					break;
				}
			}
		}
	}
}
