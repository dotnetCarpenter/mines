// @ts-check

// @ts-ignore
import GameModel from '../models/GameModel.js'
import GameView from '../views/GameController/GameView.js'
import BoardController from './BoardController.js'
import { flatten } from 'mines-utils'

export default class GameController {
  #view
  #model

  constructor () {
    this.#view = new GameView()
  }

  /**
   * Main function to execute when controller is requested.
   * @param {import("http2").ServerHttp2Stream} [stream]
   * @param {import("http2").IncomingHttpHeaders} [headers]
   * @param {import("../services/looseURL").URLPath} [url]
   * @returns {string} HTML
   */
  main (stream, headers, url) {
    console.log('GameController::main')

    const modelData = {
      title: 'Mines',
      mines: url.searchParams.get('mines'),
      width: url.searchParams.get('width'),
      height: url.searchParams.get('height')
    }

    this.#model = new GameModel(modelData)
    this.setupBoard()

    const html = this.#view.render(this.#model)
    const responseHeaders = {
      'set-cookie': object2cookie(modelData),
      'content-type': 'text/html',
      ':status': '200',
      'last-modified': new Date(Date.now()).toUTCString(),
      'content-length': Buffer.byteLength(html)
    }

    stream.respond(responseHeaders)
    return html
  }

  setupBoard () {
    const boardController = new BoardController(Object.assign({}, this.#model, { ViewUtil: this.#view.ViewUtil }))
    this.#model.board = boardController.model
  }

  /**
   * Fill the board with mines and render the view.
   */
  startGame (stream, headers, url) {
    return this.#model.board
      .fillBoard()
      .main(stream, headers, url)
  }
}

function object2cookie (obj) {
  return Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
}
