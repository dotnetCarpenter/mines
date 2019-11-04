// @ts-check
'use strict'

import logger from '../utils/logger.js'
import logMode from '../models/logMode.js'
import BoardModel from '../models/BoardModel.js'

export default class BoardController {
	/**
	 * Creates a board with mines
	 * @param game {import("./GameController")}
	 * @param view {import("../views/BoardViewCli")}
	 */
	constructor (game, view) {
		const log = logger(game.mode)
		log(logMode.debug, `Log mode is set to ${getKey(logMode, game.mode)}`)

    const board = new BoardModel(8, 8, 10, log)
    // const board = new BoardModel(16, 16, 40, log)
    // const board = new BoardModel(30, 16, 99, log)

		this._board = board
		this.view = view
	}

	render () {
		this.view.render(this._board)
		return this
	}

	fillBoard () {
		this._board.fillBoard()
		return this
	}
}

function getKey (obj, value) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] === value) {
			return key
		}
	}
}
