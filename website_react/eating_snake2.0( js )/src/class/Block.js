export default class Block {
	intRow;
	intColumn;
	intSideLength;
	color;

	constructor(intRow, intColumn, intSideLength, color) {
		this.intRow = intRow;
		this.intColumn = intColumn;

		this.intSideLength = intSideLength;

		this.color = color;
	}

	updateObjectToView() {}
}
