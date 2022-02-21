import React from 'react';
import GameController from './GameController';

export default class Gamesnake extends React.Component {
	node: number = 0;

	body: Array<{ [key: string]: number }> = [
		{ x: GameController.MapBlockCount / 2, y: GameController.MapBlockCount / 2 },
		{ x: GameController.MapBlockCount / 2, y: GameController.MapBlockCount / 2 - 1},
		{ x: GameController.MapBlockCount / 2, y: GameController.MapBlockCount / 2 - 2},
	];

	size: number = 3;

	direction: { [key: string]: number } = { x: 0, y: -1 };

	score: number = 0;

	initial(): void {
		this.body.length = 0;
		this.body.push({ x: GameController.MapBlockCount / 2, y: GameController.MapBlockCount / 2 });
		this.size = 3;
		this.direction.x = 0;
		this.direction.y = -1;
		this.score = 0;
	}

	setSnakeController(): void {
		document.addEventListener('keydown', (event) => {
			let newDirectionX: number = this.direction.x;
			let newDirectionY: number = this.direction.y;
			if (event.key === 'ArrowLeft') {
				newDirectionX = -1;
				newDirectionY = 0;
			} else if (event.key === 'ArrowRight') {
				newDirectionX = 1;
				newDirectionY = 0;
			} else if (event.key === 'ArrowUp') {
				newDirectionX = 0;
				newDirectionY = -1;
			} else if (event.key === 'ArrowDown') {
				newDirectionX = 0;
				newDirectionY = 1;
			}
			if (GameController.issnakeGoToLegalWay(this.node, newDirectionX, newDirectionY)) return;

			this.direction.x = newDirectionX;
			this.direction.y = newDirectionY;
		});
	}

	isSnakeEatApple(): boolean {
		if (
			this.body[0].x === GameController.gameApple.position.x &&
			this.body[0].y === GameController.gameApple.position.y
		)
			return true;
		return false;
	}

	eatApple(): void {
		this.size += 1;
		this.score += 1;

		GameController.gameApple.putApple();
	}

	isSnakeDie(): boolean {
		if (
			this.body[0].x < 0 ||
			this.body[0].x > GameController.MapBlockCount ||
			this.body[0].y < 0 ||
			this.body[0].y > GameController.MapBlockCount
		)
			return true;

		for (let i: number = 1; i < this.body.length; i++) {
			if (this.body[0].x === this.body[i].x && this.body[0].y === this.body[i].y) return true;
		}

		return false;
	}
}
