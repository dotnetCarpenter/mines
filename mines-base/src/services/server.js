// @ts-check
'use strict'

import http2 from 'http2'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { partial } from 'mines-utils'
// @ts-ignore
import pkg from '../../../package.json'

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
  // stream is a Duplex
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  })
  stream.end(`<h1>Welcome to ${pkg.name}</h1>`)
})

server.listen(8443)
console.log('listening on https://localhost:8443')
