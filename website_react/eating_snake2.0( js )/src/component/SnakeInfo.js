import React from 'react';
import SnakeManager from '../class/SnakeManager';

export default class SnakeInfo extends React.Component {
	constructor(props) {
		super(props);
		this.nodeSnake = props.nodeSnake;
		this.state = {
			strUpKey: SnakeManager.snakeArray[this.nodeSnake].strUpKey,
			strDownKey: SnakeManager.snakeArray[this.nodeSnake].strDownKey,
			strLeftKey: SnakeManager.snakeArray[this.nodeSnake].strLeftKey,
			strRightKey: SnakeManager.snakeArray[this.nodeSnake].strRightKey,
		};
	}

	changeStrKey(event, changeWay) {
		let eventKey = event.key;

		if (changeWay === 'up') {
			SnakeManager.snakeArray[this.nodeSnake].strUpKey = eventKey;
			this.setState({ strUpKey: eventKey });
		} else if (changeWay === 'down') {
			SnakeManager.snakeArray[this.nodeSnake].strDownKey = eventKey;
			this.setState({ strDownKey: eventKey });
		} else if (changeWay === 'left') {
			SnakeManager.snakeArray[this.nodeSnake].strLeftKey = eventKey;
			this.setState({ strLeftKey: eventKey });
		} else if (changeWay === 'right') {
			SnakeManager.snakeArray[this.nodeSnake].strRightKey = eventKey;
			this.setState({ strRightKey: eventKey });
		}
	}

	render() {
		return (
			<>
				<h3 style={{ display: 'inline' }}>
					<span
						contentEditable="true"
						suppressContentEditableWarning={true}
						onBlur={(event) => SnakeManager.changeSnakeName(event, SnakeManager.snakeArray[this.nodeSnake])}
					>
						{SnakeManager.snakeArray[this.nodeSnake].strName}
					</span>{' '}
					:{' '}
				</h3>
				<div type="text" className="keyInput" tabIndex={0} onKeyDown={(event) => this.changeStrKey(event, 'up')}>
					{this.state.strUpKey}
				</div>
				<div type="text" className="keyInput" tabIndex={1} onKeyDown={(event) => this.changeStrKey(event, 'down')}>
					{this.state.strDownKey}
				</div>
				<div type="text" className="keyInput" tabIndex={2} onKeyDown={(event) => this.changeStrKey(event, 'left')}>
					{this.state.strLeftKey}
				</div>
				<div type="text" className="keyInput" tabIndex={3} onKeyDown={(event) => this.changeStrKey(event, 'right')}>
					{this.state.strRightKey}
				</div>
				<br />
			</>
		);
	}
}
