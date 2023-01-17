const fastify = require('fastify')({ logger: true })
const fastifyServerless = require('fastify-serverless')

fastify.get('/', async (req, reply) => {
  return {
    message: 'Hello World'
  }
})

exports.handler = fastifyServerless(fastify)
