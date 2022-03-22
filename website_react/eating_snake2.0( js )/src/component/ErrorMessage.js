import React from 'react';
import FightingEngine from '../class/FightingEngine';

export default class ErrorMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
		};
		this.switchIsShow = this.switchIsShow.bind(this);
	}

	switchIsShow() {
		if (this.state.isShow && FightingEngine.isGameHasStart) FightingEngine.startGame();
		else FightingEngine.stopGame();

		this.setState({ isShow: !this.state.isShow });
	}

	render() {
		return this.state.isShow ? (
			<div className="divMask">
				<div className="divMessage" onClick={this.switchIsShow}>
					<h1>不要摸我...</h1>
				</div>
			</div>
		) : (
			<></>
		);
	}
}
