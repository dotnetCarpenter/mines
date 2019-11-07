// @ts-check
'use strict'

import BoardModel from '../models/BoardModel.js'

export default class BoardController {
	/**
	 * Creates a board with mines
	 * @param {import("../views/BoardViewCli")} view
	 * @param {number} width
	 * @param {number} height
	 * @param {number} mines
	 */
	constructor (view, width, height, mines) {
    this.model = new BoardModel(width, height, mines)
		this.view = view
	}

	render () {
		this.view.render(this.model)
		return this
	}

	fillBoard () {
		this.model.fillBoard()
		return this
	}
}
