// @ts-check
'use strict'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import Handlebars from 'handlebars'

// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

Handlebars.registerHelper('emoji', emoji)

export default class PostBackView {
  constructor() {
    this.view = Handlebars.compile(
      fs.readFileSync(
        path.join(__dirname, './GameView.htm'),
        'utf8'))
  }

  render (data) {
    return this.view(data)
  }
}

function emoji () { return this }
