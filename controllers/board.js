// @ts-check
'use strict'

export default class BoardController {
	/**
	 * 
	 * @param {BoardModel} board 
	 * @param {BoardView} renderer 
	 */
	constructor (board, renderer) {
		this.board = board
		this.renderer = renderer
	}

	render () {
		this.renderer.render(this.board)
	}
}
