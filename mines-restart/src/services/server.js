// @ts-check
'use strict'

import http2 from 'http2'
import fs from 'fs'
import path from 'path'
import { dirname } from 'path'
import { partial, nodejs, each } from 'mines-utils'
import userRoutes from './router.js'
import parse from './looseURL.js'


// @ts-ignore
const __dirname = dirname(nodejs.filename(import.meta.url))
const keysFolder = '../../../encryption/'
const keysPath = partial(path.join, __dirname, keysFolder)

const server = http2.createSecureServer({
  key: fs.readFileSync(keysPath('localhost-privkey.pem')),
  cert: fs.readFileSync(keysPath('localhost-cert.pem'))
})

const router = createRouter(userRoutes)

server.on('error', (err) => console.error(err))

server.on('stream', (stream, headers) => {
  const url = parse(headers[":path"])
  const controller = router.has(url.pathname) ? router.get(url.pathname) : router.get('404')
  const html = controller.main(stream, headers, url)

  console.log('path', url)

  if (!stream.headersSent) {
    const header = {
      'content-type': 'text/html',
      // assume ok if controller.main() did not throw
      ':status': '200',
      'last-modified': new Date(Date.now()).toUTCString(),
    }

    if (html) header['content-length'] = Buffer.byteLength(html)

    // stream is a Duplex
    stream.respond(header)
  }

  if (html && !stream.writableEnded) {
    stream.end(html)
  }

  if(!stream.writableEnded) stream.end()
})

server.listen(8443)
console.log('listening on https://localhost:8443')

function createRouter (userRoutes) {
  /**
   * @type {Map<string, {
   *     main(
   *       stream?: http2.ServerHttp2Stream,
   *       headers?: http2.IncomingHttpHeaders,
   *       url?: import("./looseURL").URLPath
   *     ): (string | void)
   *   }>
   * }
   */
  const router = new Map([
    ['404', {
      main (stream) {
        const html = '<h1>404 Not found</h1>'
        stream.respond({
          'content-type': 'text/html',
          ':status': 404,
          'content-length': Buffer.byteLength(html),
        })
        stream.end(html)
      }
    }],
    ['/style.css', {
      main (stream) {
        const fd = fs.openSync(path.join(__dirname, '../layout/style.css'), 'r')
        const stat = fs.fstatSync(fd)
        const headers = {
          'content-length': stat.size,
          'last-modified': stat.mtime.toUTCString(),
          'content-type': 'text/css'
        }
        stream.respondWithFD(fd, headers)
        stream.on('close', () => fs.closeSync(fd))
      }
    }]
  ])

  if (userRoutes instanceof Map) {
    userRoutes.forEach((value, key) => router.set(key, value))
  } else if (Array.isArray(userRoutes)) {
    //TODO: ts bug - "Expected 2 arguments, but got 0 or more.ts(2556)" lib.es2015.collection.d.ts(27, 9): An argument for 'key' was not provided
    each(/** @param {Array.<[string, function]>} pair */
      pair => router.set(...pair), userRoutes)
  }

  return router
}
