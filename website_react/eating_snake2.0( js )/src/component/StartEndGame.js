import React from 'react';
import HighScore from './HighScore';
import GameTitle from './GameTitle';
import FightingEngine from '../class/FightingEngine';

export default class StartGame extends React.Component {
	constructor(props) {
		super(props);

		this.switchSettingSnake = props.switchSettingSnake;

		this.state = {
			isGameStart: false,
			isGameEnd: false,
		};
		this.reStartGame = this.reStartGame.bind(this);
	}

	componentDidMount() {
		let endThis = this;

		let setEndState = this.setState;

		FightingEngine.syncEndGame = () => {
			setEndState.call(endThis, {
				isGameEnd: true,
			});
		};
	}

	reStartGame() {
		FightingEngine.initialGame();
		this.setState({ isGameStart: false, isGameEnd: false });
	}

	render() {
		return (
			<>
				<HighScore></HighScore>
				<div id="start" className="gameTitle">
					<GameTitle isGameStart={this.state.isGameStart}></GameTitle>

					<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
						<input
							type="button"
							className="startEndButton blueHover"
							style={{ display: !this.state.isGameStart ? 'inline-block' : 'none' }}
							value="create"
							onClick={() => {
								this.switchSettingSnake(true);
							}}
						/>
						<input
							type="button"
							className="startEndButton"
							value={!this.state.isGameStart ? 'start' : 'stop'}
							onClick={() => {
								!this.state.isGameStart ? FightingEngine.startGame() : FightingEngine.stopGame();
								this.setState({ isGameStart: !this.state.isGameStart });
							}}
						/>
						<input
							type="button"
							className="startEndButton greenHover"
							value="color"
							onClick={() => FightingEngine.changeSnakeColor()}
						/>
					</div>
				</div>

				<div id="end" className="divMask" style={{ display: this.state.isGameEnd ? 'block' : 'none' }}>
					<input
						type="button"
						className="startEndButton"
						style={{ width: '16vw', height: '16vw', fontSize: '2vw', position: 'absolute', left: '40%', top: '40%' }}
						value="RESTART"
						onClick={this.reStartGame}
					/>
				</div>
			</>
		);
	}
}
