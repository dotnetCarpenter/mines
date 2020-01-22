// @ts-check
'use strict'

import { log } from 'mines-utils'
import logMode from '../models/logMode.js'
import GameController from '../controllers/GameController.js'
import PostBackView from '../views/PostBackView.js'
import PostBackModel from '../models/PostBackModel.js'

// TODO: make this universal js
globalThis.MODE = Number(process.env.MODE || 1)

/**
 * PostBackController
 * @property {import('../views/PostBackView')} view
 */
export default class PostBackController {

  constructor () {
    this.game = new GameController()
    // this.view = new PostBackView()
  }

  main (stream, headers) {
    log(logMode.debug, 'PostBackController::main')

    const view = new PostBackView()
    let board = this.game.createBoard().startGame()

    // stream is a Duplex
    stream.respond({
      'content-type': 'text/html',
      ':status': 200
    })

    stream.end(
      view.render(new PostBackModel(board.board.model))
    )

    stream.close()
  }
}
