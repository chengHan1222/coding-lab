import Snake from './Snake';
import SnakeManager from './SnakeManager';
import Apple from './Apple';

window.onload = () => {
	FightingEngine.createSnake();
	SnakeManager.syncAllSnakePosition();
	Apple.renderAppleToView();
};

export default class FightingEngine {
	intervalTimer;
	static intCountSnake = 0;
	static intHightScore = 0;
	static intGameSpeed = 5;

	static isSettingSnake = false;
	static isGameHasStart = false;

	static createSnake() {
		let snake = new Snake('Snake' + FightingEngine.intCountSnake);

		SnakeManager.addSnakeEventListener(snake);
		document.addEventListener('keydown', (event) => {
			if (FightingEngine.isSettingSnake) return;
			SnakeManager.EventListener(event, snake.strName);
		});

		FightingEngine.intCountSnake++;
	}

	static changeSnakeColor() {
		SnakeManager.changeSnakeColor();
	}

	static findHighScore() {
		FightingEngine.intHightScore = SnakeManager.findHighScore(FightingEngine.intHightScore);
	}

	static initialGame() {
		SnakeManager.initialSnakeProperty();
		SnakeManager.calcAllSnakeIntX();
		Apple.initialApple();
	}

	static startGame() {
		Apple.initialApple();

		FightingEngine.isGameHasStart = true;

		this.intervalTimer = setInterval(() => {
			SnakeManager.moveAllSnake();
			FightingEngine.checkGameEvent();
		}, 1500 / FightingEngine.intGameSpeed);
	}
	static checkGameEvent() {
		if (SnakeManager.isAllSnakeDie()) FightingEngine.endGame();
		SnakeManager.isSnakeEatApple();
		SnakeManager.syncAllSnakePosition();
	}

	static stopGame() {
		clearInterval(this.intervalTimer);
	}

	static endGame() {
		FightingEngine.isGameHasStart = false;

		clearInterval(this.intervalTimer);
		FightingEngine.syncEndGame();
	}
	static syncEndGame() {}
}
