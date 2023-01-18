const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

app.get('/about', (req, res) => {
    res.send({ message: 'About Page' });
});


module.exports.handler = (event, context, callback) => {
    const server = awsServerlessFastify(app);
    server(event, context, callback);
};
