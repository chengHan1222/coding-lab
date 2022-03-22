import Block from '../class/Block';

export default class BlockManager {
	static intGameRow = 16;
	static intGameColumn = 16;

	static blockColor = 'rgb(138, 138, 138)';

	static test = [];
	static objBlockManager = [[]];

	static createObjectBlock(mapSideLength) {
		for (let row = 0; row < BlockManager.intGameRow; row++) {
			for (let column = 0; column < BlockManager.intGameColumn; column++) {
				BlockManager.newObjBlock(row, column, mapSideLength);
			}
		}
	}

	static newObjBlock(intRow, intColumn, intSideLength) {
		let newBlock = new Block(intRow, intColumn, intSideLength, BlockManager.blockColor);

		BlockManager.pushBlockIntoManager(newBlock);
	}

	static pushBlockIntoManager(newBlock) {
		let managerLength = BlockManager.objBlockManager.length;

		if (BlockManager.objBlockManager[managerLength - 1].length === BlockManager.intGameColumn) {
			BlockManager.objBlockManager.push([]);

			managerLength += 1;
		}
		BlockManager.objBlockManager[managerLength - 1].push(newBlock);
	}

	static calBlockSideLength(windowWidth) {
		let width = Math.floor(windowWidth / BlockManager.intGameRow) - 4.5;
		let height = Math.floor(windowWidth / BlockManager.intGameColumn) - 4.5;

		return width < height ? height : width;
	}

	static syncBlockRenderColor(intColumn, intRow, strColor) {
		BlockManager.objBlockManager[intRow][intColumn].color = strColor;
		BlockManager.objBlockManager[intRow][intColumn].updateObjectToView();
	}

	static syncAllBlockToNewProperty() {
		for (let intRow = 0; intRow < BlockManager.intGameRow; intRow++) {
			for (let intColumn = 0; intColumn < BlockManager.intGameColumn; intColumn++) {
				BlockManager.objBlockManager[intRow][intColumn].updateObjectToView();
			}
		}
	}
}
