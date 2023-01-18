const fastify = require('fastify');
const app = fastify();
const serverless = require('netlify-lambda')

app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

app.get('/about', (req, res) => {
    res.send({ message: 'About Page' });
});

exports.handler = serverless(app)
