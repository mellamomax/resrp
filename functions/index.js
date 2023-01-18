const fastify = require('fastify');
const app = fastify();

app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

app.get('/about', (req, res) => {
    res.send({ message: 'About Page' });
});

exports.handler = (event, context, callback) => {
    app.listen(3000, () => { console.log('Server started on port 3000'); });
};
