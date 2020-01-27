// @ts-check
'use strict'

import fs from 'fs'
import Handlebars from 'handlebars'

Handlebars.registerHelper('json', x => JSON.stringify(x, null, 4))

export default class BaseView {
  /**
   * @param {string} filePath
   * @returns {string}
   */
  readFile (filePath) {
    return fs.readFileSync(filePath, 'utf8')
  }

  /**
   * @param {string} template
   * @returns {HandlebarsTemplateDelegate}
   */
  compileTemplate (template) {
    return Handlebars.compile(template)
  }

  /**
   * Register a partial template to use with the current model.
   * @param {string} name The name of the partial
   * @param {string} template
   */
  registerPartial (name, template) {
    Handlebars.registerPartial(name, template)
  }
}
