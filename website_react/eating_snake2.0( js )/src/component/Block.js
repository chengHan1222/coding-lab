import React from 'react';
import ErrorMessage from './ErrorMessage';
import BlockManager from '../class/BlockManager';

export default class Block extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			objBlock: props.objBlock,
		};
		this.updateNewSideLength = this.updateNewSideLength.bind(this);
		this.child = React.createRef();
	}

	componentDidMount() {
		let blockThis = this;
		let objSetState = this.setState;

		let objBlock = this.state.objBlock;
		BlockManager.objBlockManager[objBlock.intRow][objBlock.intColumn].updateObjectToView = () => {
			objSetState.call(blockThis, {
				objBlock: BlockManager.objBlockManager[objBlock.intRow][objBlock.intColumn],
			});
		};
	}

	updateNewSideLength() {
		BlockManager.syncAllBlockToNewProperty();
	}

	render() {
		return (
			<>
				<ErrorMessage ref={this.child}></ErrorMessage>
				<div
					className="singleBlock"
					style={{ width: this.state.objBlock.intSideLength, height: this.state.objBlock.intSideLength }}
				>
					<div
						className="block"
						style={{ backgroundColor: this.state.objBlock.color }}
						onClick={() => {
							this.child.current.switchIsShow();
						}}
					></div>
				</div>
			</>
		);
	}
}
