const awsServerlessFastify = require('aws-serverless-fastify');
const fastify = require('fastify')();
const express = require('express');


fastify.get('/', async (req, reply) => {
  return {
    message: 'Hello World'
  }
})

module.exports.handler = awsServerlessFastify(fastify);
