'use strict'

export default async function (fastify, opts) {
  fastify.get('/', async (request, reply) => {
    reply.redirect('/login')
  })
}
