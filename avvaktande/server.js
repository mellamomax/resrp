// server.js

// init project
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const middleware = require('./middleware');
const helpers = require('./helpers');

const IFTTT_SERVICE_KEY = process.env.IFTTT_SERVICE_KEY;

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// The status
app.get('/ifttt/v1/status', middleware.serviceKeyCheck, (req, res) => {
  res.status(200).send();
});

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
  
  if (key !== IFTTT_SERVICE_KEY) {
    res.status(401).send({
      "errors": [{
        "message": "Channel/Service key is not correct"
      }]
    });
  }
  
  let data = [],
      numOfItems = req.body.limit;
  
  if (typeof numOfItems === "undefined") { // Setting the default if limit doesn't exist.
    numOfItems = 3;
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

// Query endpoints

app.post('/ifttt/v1/queries/list_all_things', (req, res) => {

  const key = req.get("IFTTT-Service-Key");

  if (key !== IFTTT_SERVICE_KEY) {
    res.status(401).send({
      "errors": [{
        "message": "Channel/Service key is not correct"
      }]
    });
  }
  
  let data = [],
    numOfItems = req.body.limit;
  
  if (typeof numOfItems === "undefined") { // Setting the default if limit doesn't exist.
    numOfItems = 3;
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
  
  let cursor = null
  
  if (req.body.limit == 1) {
    cursor = helpers.generateUniqueId()
  }
  
  res.status(200).send({
    "data": data,
    "cursor": cursor
  });
});

// Action endpoints
app.post('/ifttt/v1/actions/create_new_thing', (req, res) => {
  
  const key = req.get("IFTTT-Service-Key");
  
  if (key !== IFTTT_SERVICE_KEY) {
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

app.get('/', (req, res) => {
  res.render('index.ejs');
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});



  
//Notis skickas
var request = require('request');
var iftttId;
var baseURL = "https://maker.ifttt.com/trigger/";
var withKey = "/with/key/";

// Get the Id from IFTTT Maker URL
if(!process.env.IFTTT_MAKER_URL)
  console.log("You need to set your IFTTT Maker URL - copy the URL from https://ifttt.com/services/maker/settings into the .env file against 'IFTTT_MAKER_URL'");
else
  iftttId = process.env.IFTTT_MAKER_URL.split('https://maker.ifttt.com/use/')[1];

// Show the homepage
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('views'));
  
// Handle requests from IFTTT
app.post("/build_hooks/63c5e64dfdf17930f15e1a90", function(req, res) {
  console.log("Request received from IFTTT");
  console.log("Triggering multiple IFTTT services");
  // update the path to index.js to include the public directory
  require('./public/index.js');
  console.log("Done triggering.");
  response.end();  
});
