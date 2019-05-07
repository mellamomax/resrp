// server.js

// init project
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const middleware = require('./middleware');
const helpers = require('./helpers');

const IFTTT_KEY = process.env.IFTTT_KEY;

const OPTION_FIELD_URLS = [
  '/actions/turn_on/fields/device/options',
];

app.use(bodyParser.json());

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

// Trigger endpoints
app.post('/ifttt/v1/triggers/new_thing_created', (req, res) => {
  
  const key = req.get("IFTTT-Service-Key");
  
  console.log("headers", JSON.stringify(req.headers));
  
  let data = [];
  let numOfItems = req.body.limit;
  
  if (typeof numOfItems === "undefined") { // Setting the default if limit doesn't exist.
    numOfItems = 3;
  }

  if (key !== IFTTT_KEY) {
    res.status(401).send({
      "errors": [{
        "message": "Channel/Service key is not correct"
      }]
    });
  }
  
  if (numOfItems >= 1) {
    for (let i = 0; i < numOfItems; i += 1) {
      data.push({
        "created_at": (new Date()).toISOString(), // Must be a valid ISOString
        "meta": {
          "id": helpers.generateUniqueId(),
          "timestamp": Math.floor(Date.now() / 1000) // This returns a unix timestamp in seconds.
        }
      });
    }
  }
  
  res.status(200).send({
    "data": data
  });

});

// Action endpoints
app.post('/ifttt/v1/actions/create_new_thing', (req, res) => {
  
  const key = req.get("IFTTT-Service-Key");
  
  if (key !== IFTTT_KEY) {
    res.status(401).send({
      "errors": [{
        "message": "Channel/Service key is not correct"
      }]
    });
  }
  
  res.status(200).send({
    "data": [{
      "id": helpers.generateUniqueId()
    }]
  });
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
