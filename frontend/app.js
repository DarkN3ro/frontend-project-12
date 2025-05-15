'use strict'

import path from 'node:path';
import AutoLoad from '@fastify/autoload';
import { fileURLToPath } from 'url';

const options = {};

export default async function (fastify, opts) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  });

  fastify.setNotFoundHandler(async (request, reply) => {
    reply.status(404).send({ error: 'Not Found' });
  });
}

export { options };
