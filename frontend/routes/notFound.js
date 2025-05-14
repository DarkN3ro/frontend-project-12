'use strict'

module.exports = async function (fastify, opts) {
  fastify.setNotFoundHandler(async (request, reply) => {
    reply.status(404).send({ error: 'Not Found' })
  })
}