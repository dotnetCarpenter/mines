// @ts-check
'use strict'

import BoardModel from '../models/BoardModel.js'
import BoardView from '../views/BoardView/BoardView.js'

export default class BoardController {
	model

	/**
	 * Creates a board with mines
	 * @param {object} arg
	 * @param {number} arg.width
	 * @param {number} arg.height
	 * @param {number} arg.mines
	 * @param {import("../views/ViewUtil").default} arg.ViewUtil
	 */
	constructor ({width, height, mines, ViewUtil}) {
		this.model = new BoardModel(width, height, mines)
		/* this.#view =  */new BoardView(ViewUtil)
	}

	fillBoard () {
		this.model.fillBoard()
		return this
	}
}
