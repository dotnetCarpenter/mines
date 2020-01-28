// @ts-check
'use strict'

import BoardModel from '../models/BoardModel.js'

export default class BoardController {
	#view
	#model

	/**
	 * Creates a board with mines
	 * @param {object} arg
	 * @param {number} arg.width
	 * @param {number} arg.height
	 * @param {number} arg.mines
	 */
	constructor ({width, height, mines}) {
    this.#model = new BoardModel(width, height, mines)
	}

	main (stream) {
		this.view.render(this.model)
		return this
	}

	fillBoard () {
		this.model.fillBoard()
		return this
	}
}
