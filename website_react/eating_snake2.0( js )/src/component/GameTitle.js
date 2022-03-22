import React from 'react';
import FightingEngine from '../class/FightingEngine';
import SnakeScore from './SnakeScore';
import SnakeManager from '../class/SnakeManager';

export default class GameTitle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isGameStart: props.isGameStart,
		};
		this.createSnakeArray();
	}

	createSnakeArray() {
		let snakeArray = [];
		let snakeTotalNumber = SnakeManager.snakeArray.length;

		for (let nodeSnake = 0; nodeSnake < snakeTotalNumber; nodeSnake++) {
			snakeArray.push(<SnakeScore key={nodeSnake} snake={SnakeManager.snakeArray[nodeSnake]}></SnakeScore>);
		}
		return snakeArray;
	}

	static getDerivedStateFromProps(props, state) {
		return { ...state, isGameStart: props.isGameStart };
	}

	render() {
		return !this.state.isGameStart ? (
			<>
				<h1>ESG</h1>
				<h2>Eating Snake Game</h2>
			</>
		) : (
			<>{this.createSnakeArray()}</>
		);
	}
}
