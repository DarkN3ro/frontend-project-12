'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')


const options = {}

module.exports = async function (fastify, opts) {

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
  
  fastify.setNotFoundHandler(async (request, reply) => {
    reply.status(404).send({ error: 'Not Found' })
  })
}

module.exports.options = options
