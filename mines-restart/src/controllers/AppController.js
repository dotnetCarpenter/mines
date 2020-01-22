// @ts-check
'use strict'

import { map } from 'mines-utils'
import AppModel from '../models/AppModel.js'
import AppView from '../views/AppController/AppView.js'

export default class AppController {
  constructor () {
    const title = 'Mines'
    // TODO: Can we put controllers in our model?
    const games = []

    this.view = new AppView()
    this.model = new AppModel({ title, games })
  }

  /**
   * Main function to execute when controller is requested.
   * @param {import("http2").ServerHttp2Stream} stream
   * @param {import("http2").IncomingHttpHeaders} headers
   */
  main (stream, headers) {
    console.log('AppController::main')

    // stream is a Duplex
    stream.respond({
      'content-type': 'text/html',
      ':status': "200"
    })

    stream.end(
      this.view.render(this.model)
    )
  }
}
