export default class BlockManager {
	static divSideLength: number = 1200;

	private static gameRow: number = 7;
	private static gameColunm: number = 7;

	static getGameRow(): number {
		return this.gameRow;
	}

	static getGameColunm(): number {
		return this.gameColunm;
	}
}
