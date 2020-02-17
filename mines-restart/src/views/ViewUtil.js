// @ts-check
'use strict'

import fs from 'fs'
import Handlebars from 'handlebars'

Handlebars.registerHelper('json', x => JSON.stringify(x, null, 4))

export default class ViewUtil {
  /**
   * @param {string} filePath
   * @returns {string}
   */
  static readFile (filePath) {
    return fs.readFileSync(filePath, 'utf8')
  }

  /**
   * @param {string} template
   * @returns {HandlebarsTemplateDelegate}
   */
  static compileTemplate (template) {
    return Handlebars.compile(template)
  }

  /**
   * Register a partial template to use with the current model.
   * @param {string} name The name of the partial
   * @param {string} template
   */
  static registerPartial (name, template) {
    Handlebars.registerPartial(name, template)
  }

  /**
   * Register a helper to use with the current view
   * @param {string} name
   * @param {import('handlebars').HelperDelegate} f
   */
  static registerHelper (name, f) {
    Handlebars.registerHelper(name, f)
  }
}
