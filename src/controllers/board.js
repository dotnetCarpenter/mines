import logger from '../utils/logger.js'
import logMode from '../models/logMode.js'
import BoardModel from '../models/board.js'

export default class BoardController {
	/**
	 * Creates a board with mines
	 * @param {BoardView} renderer
	 */
	constructor (game, renderer) {
		const log = logger(game.mode)
		log(logMode.info, `Log mode is set to ${getKey(logMode, game.mode)}`)

    const board = new BoardModel(8, 8, 10, log)
    // const board = new BoardModel(16, 16, 40, log)
    // const board = new BoardModel(30, 16, 99)

		this.board = board
		this.renderer = renderer
	}

	render () {
		this.renderer.render(this.board)
	}
}

function getKey (obj, value) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] === value) {
			return key
		}
	}
}
