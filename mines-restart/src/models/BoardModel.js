// @ts-check
'use strict'

import { compose, createArray, map, random } from 'mines-utils'
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
	 */
	constructor (width, height, mines) {
		this.mines = mines
		this.percentageMines = mines / (width * height) * 100

		// const rows = createArray(width, () => new Space(log), log)
		this.board = createArray(height, () =>
			createArray(width, () =>
				new Space()))
	}

	fillBoard () {
		this.board = compose(setNumbers, fillBoard)([this.board, this.mines])
		return this
	}
}

const bool = () => random(10) > 8

const yesNo = cell => {
	if (cell instanceof Space) return [cell, bool()]
	return [cell, false]
}

const mineOrCell = ([cell, bool]) =>
	bool ? new Mine() : cell

/**
 * @typedef boardArgument
 * @type {[any[], number]}
 * @param {boardArgument}	parameter
 * @returns {any[]}
 */
function fillBoard ([board, mines]) {
	if (mines === 0) return [board, mines]

	const minusMine = ([cell, bool]) => {
		if (bool && mines) --mines
		else bool = false
		return [cell, bool]
	}

	const placeMine = compose(mineOrCell, minusMine, yesNo)

	return fillBoard([
		map(row =>
			map(placeMine, row)
			, board)
		, mines])
}

/**
 *
 * @param {boardArgument} parameter
 * @returns {(Space|Mine)[][]}
 */
function setNumbers ([board]) {
	return map((row, y) =>
		map((cell, x) =>
			cell instanceof Space
				? cell.setNumber(board, x, y)
				: cell
				, row), board)
}
