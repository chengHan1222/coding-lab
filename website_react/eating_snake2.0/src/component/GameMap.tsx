import React from 'react';
import GameAllBlock from './GameAllBlock';

class GameMap extends React.Component {
	constructor(props: any) {
		super(props);
		this.state = {
			mapSideLength: window.screen.width,
		};
	}

	render() {
		return (
			<div
				id="gameMap"
				className="gameMap"
				style={{ width: this.state.mapSideLength, height: '100vw', maxWidth: '800px' }}
			>
				<GameAllBlock></GameAllBlock>
			</div>
		);
	}
}
