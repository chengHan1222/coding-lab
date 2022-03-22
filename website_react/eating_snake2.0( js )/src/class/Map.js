export default class Map {
	static intMapMaxWdith = 700;
	static intWinDeviation = 260;
	static mapSideLength = Map.updateMapSideLength();

	static updateMapSideLength() {
		this.mapSideLength =
			window.innerWidth - this.intWinDeviation > this.intMapMaxWdith
				? this.intMapMaxWdith
				: window.innerWidth - this.intWinDeviation;
		return this.mapSideLength;
	}
}
