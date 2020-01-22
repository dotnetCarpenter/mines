// @ts-check
'use strict'

import http2 from 'http2'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { partial } from 'mines-utils'

import AppController from '../controllers/AppController.js'
// import PostBackController from 'mines-base/src/controllers/PostBackController'


// @ts-ignore
const router = new Map([
  ['404', {
    /**
     * @param {http2.ServerHttp2Stream} stream
     * @param {http2.IncomingHttpHeaders} headers
     */
    main (stream, headers) {
      stream.respond({
        'content-type': 'text/html',
        ':status': 404
      })
      stream.end('<h1>404 Not found</h1>')
      stream.close()
    }
  }],
  // ['/game', new PostBackController()],
  ['/', new AppController()]
])

// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

const keysFolder = '../../../encryption/'
const keysPath = partial(path.join, __dirname, keysFolder)

const server = http2.createSecureServer({
  key: fs.readFileSync(keysPath('localhost-privkey.pem')),
  cert: fs.readFileSync(keysPath('localhost-cert.pem'))
})

server.on('error', (err) => console.error(err))

server.on('stream', (stream, headers) => {
  const path = headers[":path"]
  const controller = router.has(path) ? router.get(path) : router.get('404')

  controller.main(stream, headers)
})

server.listen(8443)
console.log('listening on https://localhost:8443')
