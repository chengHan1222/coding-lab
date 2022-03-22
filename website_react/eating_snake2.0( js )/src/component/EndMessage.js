import React from 'react';

export default class EndMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isGameEnd: props.isGameEnd,
			reStartGame: props.reStartGame,
		};
	}

	componentDidUpdate() {
		this.isGameEnd;
	}

	render() {
		return (
			<div id="end" className="divMask" style={{ display: this.state.isGameEnd ? 'block' : 'none' }}>
				<input
					type="button"
					className="startEndButton"
					style={{ width: '16vw', height: '16vw', fontSize: '2vw', position: 'absolute', left: '40%', top: '40%' }}
					value="RESTART"
					onClick={this.state.reStartGame}
				/>
			</div>
		);
	}
}
