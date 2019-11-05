// @ts-check
'use strict'

import createArray from '../utils/createArray.js'
import map from '../utils/map.js'
import random from '../utils/random.js'
import compose from '../utils/compose.js'
import logMode from './logMode.js'
import Mine from './Mine.js'
import Space from './Space.js'

/**
 * A board
 */
export default class BoardModel {

	/**
	 * @param {number} width Width of board.
	 * @param {number} height Height of board.
	 * @param {number} mines Number of mines on the board
	 * @param {(arg0: number, arg1: string) => void} log
	 */
	constructor (width, height, mines, log) {
		this.mines = mines
		this.percentageMines = mines / (width * height) * 100
		this.log = log

		// const rows = createArray(width, _ => new Space(log), log)
		this.board = createArray(height, _ =>
			createArray(width, _ =>
				new Space(log), log), log)

		log(logMode.warning, `board created with width ${width} height ${height} mines ${mines}`)
	}

	fillBoard () {
		this.board = compose(setNumbers, fillBoard)([this.board, this.mines, this.log])
		return this
	}
}

const bool = () => random(10) > 8

const yesNo = cell => {
	if (cell instanceof Space) return [cell, bool()]
	return [cell, false]
}

const mineOrCell = ([cell, bool]) =>
	bool ? new Mine(cell.log) : cell

/**
 * @typedef boardArgument
 * @type {[any[], number, (arg0: number, arg1: string) => void]}
 * @param {boardArgument}	parameter
 * @returns {any[]}
 */
function fillBoard ([board, mines, log]) {
	log(logMode.warning, `fillBoard called with ${mines} mines`)

	if (mines === 0) return [board, mines, log]

	const minusMine = ([cell, bool]) => {
		if (bool && mines) --mines
		else bool = false
		return [cell, bool]
	}

	const placeMine = compose(mineOrCell, minusMine, yesNo)

	return fillBoard([
		map(row =>
			map(placeMine, row, log)
			, board, log)
		, mines, log])
}

/**
 *
 * @param {boardArgument} parameter
 */
function setNumbers ([board, , log]) {
	return map((row, y) =>
		map((cell, x) =>
			cell instanceof Space
				? cell.setNumber(board, x, y)
				: cell
				, row, log), board, log)
}
