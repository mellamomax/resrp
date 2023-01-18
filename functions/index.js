const express = require('express');
const app = express();
const awsServerlessFastify = require('aws-serverless-fastify');



app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

app.get('/about', (req, res) => {
    res.send({ message: 'About Page' });
});


module.exports.handler = (event, context, callback) => {
    app.listen(3000, () => { console.log('Server started on port 3000'); });
    server(event, context, callback);
};
