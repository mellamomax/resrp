const awsServerlessFastify = require('aws-serverless-fastify');
const fastify = require('fastify')();

fastify.get('/', async (req, reply) => {
  return {
    message: 'Hello World'
  }
})

module.exports.handler = awsServerlessFastify(fastify);
