import React from 'react';
import DivBlock from './Block';
import BlockManager from '../class/BlockManager';

export default class GameAllBlock extends React.Component {
	constructor(props) {
		super(props);

		this.row = props.row;
		this.mapSideLength = this.props.sideLength;

		this.countBlock = this.countBlock.bind(this);
		this.child = React.createRef();
	}

	initCountBLock = () => {
		let gameColumn = BlockManager.intGameColumn;

		let tempArray = [];
		for (let column = 0; column < gameColumn; column++) {
			let objBlock = BlockManager.objBlockManager[this.row][column];

			tempArray.push(<DivBlock key={column} objBlock={objBlock} ref={this.child}></DivBlock>);
		}
		return tempArray;
	};

	countBlock(data) {
		let blockSideLength = BlockManager.calBlockSideLength(data);

		let gameRow = BlockManager.intGameRow;
		let gameColumn = BlockManager.intGameColumn;

		for (let row = 0; row < gameRow; row++) {
			for (let col = 0; col < gameColumn; col++) {
				BlockManager.objBlockManager[row][col].intSideLength = blockSideLength;
			}
		}
		this.child.current.updateNewSideLength();
	}

	render() {
		return <div className="blockFrame">{this.initCountBLock()}</div>;
	}
}
