import React from 'react';
import FightingEngine from '../class/FightingEngine';
import SnakeManager from '../class/SnakeManager';

export default class HighScore extends React.Component {
	state = {
		intHightScore: FightingEngine.intHightScore,
	};

	componentDidMount() {
		let highScoreThis = this;
		let setHighScore = this.setState;

		// let lastFunc = FightingEngine.findHighScore;
		FightingEngine.findHighScore = () => {
			FightingEngine.intHightScore = SnakeManager.findHighScore(FightingEngine.intHightScore);
			setHighScore.call(highScoreThis, {
				intHightScore: FightingEngine.intHightScore,
			});
		};
	}

	render() {
		return (
			<>
				<div className="highScore gameTitle">
					<p>High Score {this.state.intHightScore}</p>
				</div>
			</>
		);
	}
}
