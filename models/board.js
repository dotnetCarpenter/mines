// @ts-check
'use strict'

import createArray from '../utils/createArray.js'
import map from '../utils/map.js'
import partial from '../utils/partial.js'
import random from '../utils/random.js'
import compose from '../utils/compose.js'

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
		// TODO: use fillBoard inside createArray
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
