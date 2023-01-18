const fastify = require('fastify');
const app = fastify();

app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

app.get('/about', (req, res) => {
    res.send({ message: 'About Page' });
});

exports.handler = (event, context, callback) => {
    app.ready(() => {
        const handler = app.server.createHandler();
        handler(event, context, callback);
    });
};
