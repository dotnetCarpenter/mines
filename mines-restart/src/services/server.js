// @ts-check
'use strict'

import http2 from 'http2'
import fs from 'fs'
import path from 'path'
import { dirname } from 'path'
import { partial, nodejs, each } from 'mines-utils'
import userRoutes from './router.js'
import parser from './parser.js'


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
  const url = parser(headers[":path"])
  // console.log('path', url)

  const controller = router.has(url.pathname) ? router.get(url.pathname) : router.get('404')

  controller.main(stream, headers, url)

  if(!stream.writableEnded) stream.end()
})

server.listen(8443)
console.log('listening on https://localhost:8443')

function createRouter (userRoutes) {
  const router = new Map([
    ['404', {
      main (stream) {
        stream.respond({
          'content-type': 'text/html',
          ':status': 404
        })
        stream.end('<h1>404 Not found</h1>')
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
    // TODO: ts-bug
    userRoutes.forEach((value, key) => router.set(key, value))
  } else if (Array.isArray(userRoutes)) {
    // TODO: ts-bug
    each(pair => router.set(...pair), userRoutes)
  }

  return router
}