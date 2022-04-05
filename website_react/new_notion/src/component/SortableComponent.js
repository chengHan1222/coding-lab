import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';

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
				<Button variant="outline-primary">Go somewhere</Button> */}
				{/* <Card.Text>
					<Form>
						<Row>
							<Col>
								<Button variant="outline-secondary">Secondary</Button>
							</Col>
							<Col sm={'10'}>
								<Form.Control type="text" className="textForm"></Form.Control>
							</Col>
						</Row>
					</Form>
				</Card.Text> */}
				<InputGroup>
					<Button className="iconButton" variant="outline-secondary">
						≡
					</Button>
					<Form.Control type="text" className="textForm" placeholder="please enter something..."></Form.Control>
				</InputGroup>
			</>
		);
	}
}

const styleCard = {
	width: '20rem',
	margin: '5px',
};
const SortableItem = SortableElement(({ value }) => (
	// className="w-100"
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
				<SortableItem key={`item-${value}`} index={index} value={value} />
			))}
		</div>
	);
});

export default class SortableComponent extends Component {
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
