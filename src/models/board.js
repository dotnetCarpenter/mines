// @ts-check
'use strict'

import createArray from '../utils/createArray.js'
import map from '../utils/map.js'
import random from '../utils/random.js'
import compose from '../utils/compose.js'
import logMode from '../models/logMode.js'
import Cell from './Cell.js'
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

		const rows = createArray(width, _ => new Cell(new Space()), log)
		this.board = createArray(height, _ => rows, log)

		log(logMode.debug, `board created with width ${width} height ${height} mines ${mines}`)
	}

	fillBoard () {
		this.board = fillBoard(this.board, this.mines, this.log)
	}
}

const bool = () => random(10) > 8

const yesNo = cell => {
	if (cell.valueOf() instanceof Space) return [cell, bool()]
	return [cell, false]
}

const mineOrCell = ([cell, bool]) => bool ? new Cell(new Mine()) : cell

/**
 * @param {any[]} board
 * @param {number} mines
 * @param {(arg0: number, arg1: string) => void} log
 * @returns {any[]}
 */
function fillBoard (board, mines, log) {
	log(logMode.debug, `fillBoard called with ${mines} mines`)

	if (mines === 0) return board

	const minusMine = ([cell, bool]) => {
		if (bool && mines) --mines
		else bool = false
		return [cell, bool]
	}

	const placeMine = compose(mineOrCell, minusMine, yesNo)
	return fillBoard(
		map(row =>
			map(placeMine, row, log),
			board,
			log),
		mines,
		log)
}
