import React from 'react';
import BlockManager from '../class/BlockManager';
import Calculate from '../class/Calculate';

export default class GameAllBlock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			blockArray: [],
			mapSideLength: this.props.sideLength,
		};
	}

	countBlock() {
		let gameRow: number = BlockManager.getGameRow();
		let gameColunm: number = BlockManager.getGameColunm();
	}

	render() {
		return <div className="blockFrame">{blockArray}</div>;
	}
}

let blockSideLength = BlockManager.divSideLength / Calculate.LCM(gameRow, gameColunm);

for (let i: number = 0; i < gameRow; i++) {
	let tempArray = [];
	for (let j: number = 0; j < gameColunm; j++) {
		tempArray.push(
			<div key={j} className="singleBlock" style={{ width: blockSideLength, height: blockSideLength }}>
				<div className="block"></div>
			</div>
		);
	}
	blockArray.push(tempArray);
}
