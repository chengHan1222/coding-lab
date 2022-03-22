import React from 'react';
import RowBlock from './RowBlock';
import ClassMap from '../class/Map';
import BlockManager from '../class/BlockManager';

export default class GameMap extends React.Component {
	constructor(props) {
		super(props);

		this.isTimeResizeDelay = false;

		this.state = {
			mapSideLength: ClassMap.mapSideLength,
		};

		this.handleResize = this.handleResize.bind(this);
		this.child = React.createRef();
	}

	initialRowBLock = () => {
		let tempArray = [];
		for (let row = 0; row < BlockManager.intGameRow; row++) {
			tempArray.push(<RowBlock key={row} ref={this.child} row={row} sideLength={this.state.mapSideLength}></RowBlock>);
		}
		return tempArray;
	};

	componentDidMount() {
		window.addEventListener('resize', (e) => {
			setTimeout(() => {
				this.handleResize();
			}, 250);
		});
	}

	handleResize() {
		ClassMap.updateMapSideLength();
		this.setState({ mapSideLength: ClassMap.mapSideLength });
		this.child.current.countBlock(ClassMap.mapSideLength);
	}

	componentWillUnmount() {
		window.removeEventListener('resize');
	}

	render() {
		return (
			<div
				id="gameMap"
				className="gameMap"
				style={{
					width: this.state.mapSideLength,
					height: this.state.mapSideLength,
				}}
			>
				{this.initialRowBLock()}
			</div>
		);
	}
}
