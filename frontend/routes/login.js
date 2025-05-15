'use strict'

export default async function (fastify, opts) {
  fastify.get('/login', async (request, reply) => {
    return { message: 'Welcome to the login page' }
  })
}