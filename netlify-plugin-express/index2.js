const express = require('express')
const serverless = require('aws-serverless-fastify')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
  res.send('Test Route!')
})

const handler = serverless(app)

module.exports = {
  handler
}
