// @ts-check
'use strict'

import http2 from 'http2'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import logMode from '../models/logMode.js'
import { partial, log } from 'mines-utils'

import PostBackController from '../controllers/PostBackController.js'

const router = {
  '/': new PostBackController()
}

// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

const keysFolder = '../../../encryption/'
const keysPath = partial(path.join, __dirname, keysFolder)

const server = http2.createSecureServer({
  key: fs.readFileSync(keysPath('localhost-privkey.pem')),
  cert: fs.readFileSync(keysPath('localhost-cert.pem'))
})

server.on('error', (err) => log(logMode.error, err))

server.on('stream', (stream, headers) => {
  const controller = router[headers[":path"]]

  controller.response(stream, headers)

  if (!stream.closed) stream.end(controller.end())
})

server.listen(8443)
log(logMode.info, 'listening on https://localhost:8443')
