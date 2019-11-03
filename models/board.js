// @ts-check
'use strict'

class Mine {}
class Space {}

/**
 * A board
 */
export default class BoardModel {

	/**
	 * @param {number} width Width of board.
	 * @param {number} height Height of board.
	 * @param {number} mines Number of mines on the board
	 */
	constructor (width, height, mines) {
		const b = createArray(height, createArray(width, new Space()))
		console.log(`array created with width ${width} height ${height} mines ${mines}`)
		this.board = fillBoard(b, mines)
		this.mines = mines
		this.percentageMines = mines / (width * height) * 100
	}
}

const bool = partial(random, 1)
const yesNo = cell => {
	if (cell instanceof Space) return [cell, bool()]
	return [cell, false]
}
const mineOrCell = ([cell, bool]) => bool ? new Mine() : cell
/**
 * 
 * @param {any[]} board 
 * @param {number} mines
 * @returns {any[]} 
 */
function fillBoard (board, mines) {
	console.log(`fillBoard called with ${mines} mines`)

	if (mines === 0) return board
	
	const minusMine = ([cell, bool]) => {
		if (bool && mines) --mines
		else bool = false 
		return [cell, bool]
	}

	const placeMine = compose(mineOrCell, minusMine, yesNo)
	return fillBoard(map(row => map(placeMine, row), board), mines)
}

/**
 * @param {number} size
 * @param {any} [initialValue]
 * @returns {any[]}
 */
function createArray (size, initialValue) {
	return map(_ => initialValue, new Array(size))
}

/**
 * @param {function} f
 * @param {any[]} list
 */
function map (f, list) {
	const max = list.length
	const a = new Array(max)

	console.log(`map called looping ${max} times`)
	for (let i = 0; i < max; ++i) {
		a[i]= f(list[i])
	}

	return a
}


function partial (f, ...args) {
	return f.bind(null, ...args)
}

/**
 * @param {number} max
 */
function random (max) {
	return Math.round(Math.random() * max)
}

function compose (...fs) {
	return initialValue => fs.reduceRight((value, f) => f(value), initialValue)
}

// 30
// 16
// 17