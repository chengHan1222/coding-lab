import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { Button, Card, Form, Row } from 'react-bootstrap';

const colors = [null, '#dc7675', '#ff9d59', '#f4da7b', '#14985f', '#3675e1', '#eecece'];

const style_card = {
	textAlign: 'center',
	width: '50px',
	height: '50px',
	float: 'left',
	border: '1px solid black',
	padding: '30px',
};

class CardText extends Component {
	constructor(props) {
		super(props);
		this.title = props.title;
		this.state = {
			sum: 0,
		};
		this.onAddChild = this.onAddChild.bind(this);
	}
	onAddChild() {
		let prevSum = this.state.sum + 1;
		this.setState({
			sum: prevSum,
		});
	}
	render() {
		return (
			<>
				{/* <Card.Title>{this.title}</Card.Title>
				<Card.Text>
					<Card.Img variant="top" src="./main.png" />
				</Card.Text>
				<textarea cols="30" placeholder="Please enter something..."></textarea>
				<Button variant="primary">Go somewhere</Button> */}
				<Card.Text>
					<Button variant="outline-secondary">Secondary</Button>
					<Form.Control type="text" className="textForm"></Form.Control>
				</Card.Text>
			</>
		);
	}
}

const styleCard = {
	width: '18rem',
	margin: '5px',
};
const SortableItem = SortableElement(({ value }) => (
	<Card className="w-100" style={styleCard}>
		<Card.Body>
			<CardText title={value}></CardText>
		</Card.Body>
	</Card>
));

const styleList = {
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'flex-start',
};
const SortableList = SortableContainer(({ items }) => {
	return (
		<div style={styleList}>
			{items.map((value, index) => (
				// <Row xs={1} md={1} lg={1}>
				<SortableItem key={`item-${value}`} index={index} value={value} />
				// </Row>
			))}
		</div>
	);
});

class SortableComponent extends Component {
	state = {
		items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'],
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState({
			items: arrayMoveImmutable(this.state.items, oldIndex, newIndex),
		});
	};

	render() {
		return (
			<>
				<SortableList items={this.state.items} onSortEnd={this.onSortEnd} axis="xy" />
			</>
		);
	}
}

const styles = {
	display: 'flex',
	fontFamily: 'sans-serif',
	textAlign: 'center',
};
function App() {
	return (
		<div className="App" style={styles}>
			<SortableComponent />
		</div>
	);
}

export default App;
