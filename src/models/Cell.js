export default class Cell {
	constructor(cellItem) {
		this.item = cellItem;
	}
	valueOf() {
		return this.item;
	}
}
