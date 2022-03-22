import React from 'react';
import SnakeInfo from './SnakeInfo';
import SnakeManager from '../class/SnakeManager';
import FightingEngine from '../class/FightingEngine';

export default class SettingSnake extends React.Component {
	constructor(props) {
		super(props);
		this.switchSettingSnake = props.switchSettingSnake;
		this.state = {
			arraySnake: [],
		};
	}
	componentDidMount() {
		this.readSnakeArray();
	}
	readSnakeArray() {
		let tempSnakeArray = [];

		let snakeTotalNumber = SnakeManager.snakeArray.length;
		for (let nodeSnake = 0; nodeSnake < snakeTotalNumber; nodeSnake++) {
			tempSnakeArray.push(<SnakeInfo key={nodeSnake} nodeSnake={nodeSnake}></SnakeInfo>);
		}
		this.setState({ arraySnake: tempSnakeArray });
	}

	render() {
		return (
			<div id="start" className="gameTitle">
				{this.state.arraySnake}

				<div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-evenly' }}>
					<input
						type="button"
						className="startEndButton blueHover"
						value="back"
						onClick={() => {
							this.switchSettingSnake(false);
						}}
					/>
					<input
						type="button"
						className="startEndButton"
						value="create"
						onClick={() => {
							FightingEngine.createSnake();
							SnakeManager.calcAllSnakeIntX();
							this.readSnakeArray();
						}}
					/>
				</div>
			</div>
		);
	}
}
