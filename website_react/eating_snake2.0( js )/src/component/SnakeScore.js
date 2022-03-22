import React from 'react';

export default class SnakeScore extends React.Component {
	constructor(props) {
		super(props);
		this.snake = props.snake;
		this.state = {
			snakeScore: props.snake.intScore,
		};
	}

	componentDidMount() {
		let snakeThis = this;

		let updateSnakeScore = this.setState;

		this.snake.syncRenderScore = () => {
			updateSnakeScore.call(snakeThis, {
				snakeScore: this.snake.intScore,
			});
		};
	}

	render() {
		return (
			<>
				<h5>
					{this.snake.strName} Score: {this.state.snakeScore}
				</h5>
			</>
		);
	}
}
