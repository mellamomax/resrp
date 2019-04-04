// server.js
// where your node app starts

// init project
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const middleware = require('./middleware');
const helpers = require('./helpers');

app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// The status
app.get('/ifttt/v1/status', middleware.serviceKeyCheck, (req, res) => {
  res.status(200).send();
});

// The test/setup endpoint
app.post('/ifttt/v1/test/setup', middleware.serviceKeyCheck, (req, res) => {
  
  res.status(200).send({
    "data": {
      samples: {
        actionRecordSkipping: {
          create_new_thing: { invalid: "true" }
        }
      }
    }
  });
    
});

app.post('/ifttt/v1/triggers/new_thing_created', middleware.serviceKeyCheck, (req, res) => {
  
  let data = [];
  
  for (let i = 0; i < 3; i += 1) {
    data.push({
      "created_at": (new Date()).toString(),
      "meta": {
        "id": helpers.generateUniqueId(),
        "timestamp": Math.floor(Date.now() / 1000)
      }
    });
  }
  
  
  res.status(200).send({
    "data": {
      "hello": "world"
    }
  });

});

app.post('/ifttt/v1/actions/create_new_thing', middleware.serviceKeyCheck, (res, req) => {
  
  res.status(200).send({
   "data": {
     "hello": "world"
   }
  });

});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
