// server.js

// init project
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const middleware = require('./middleware');
const helpers = require('./helpers');

const actionFieldsCheck = require('./middleware/action-field-check.js');

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
  
  let body = {
    "data": {
      "samples": {
        "actions": {
          "turn_on": {
            "device": {
              "model": "HS107",
              "hardwareVersion":"1.0",
              "deviceId": "80066186C2737010B10F22E0E70538B819D60B2700",
              "deviceType": "IOT.SMARTPLUGSWITCH",
              "parentDeviceContext": {
                "model": "HS107",
                "hardwareVersion": "1.0",
                "appServerUrl": "https://use1-wap.tplinkcloud.com",
                "deviceId": "80066186C2737010B10F22E0E70538B819D60B27",
                "deviceType": "IOT.SMARTPLUGSWITCH"
              }
            }
          }
        }
      }
    }
  };
  
  res.status(200).send(body);
  
});

// The option fields to get list of emotions for triggers and actions.
app.post('/ifttt/v1/actions/turn_on/fields/device/options', (req, res) => {
  
  const IFTTT_KEY = "9Ze4_S9mN0cPbn2sGrk-BgDB4vf7HXfGsaAIaRxPFcn6xHgbB-rXVG0b68caF6Mo";
  const key = req.get("IFTTT-Service-Key");

  if (key !== IFTTT_KEY) {
    res.status(401).send({
      "errors": [{
        "message": "Invalid Service Key"
      }]
    });
  }
  
  res.status(200).send({
    "data": [{
      "label": "Lights & Bulbs",
      "values": [
        {
          "label": "Ifttt 200 [LB200]",
          "value": { "model": "HS107",
              "hardwareVersion":"1.0",
              "deviceId": "80066186C2737010B10F22E0E70538B819D60B2700",
              "deviceType": "IOT.SMARTPLUGSWITCH",
              "parentDeviceContext": {
                "model": "HS107",
                "hardwareVersion": "1.0",
                "appServerUrl": "https://use1-wap.tplinkcloud.com",
                "deviceId": "80066186C2737010B10F22E0E70538B819D60B27",
                "deviceType": "IOT.SMARTPLUGSWITCH"
              }
                   }
        },
        {
          "label": "Patio [LB230]",
          "value": { "model": "HS107",
              "hardwareVersion":"1.0",
              "deviceId": "80066186C2737010B10F22E0E70538B819D60B2700",
              "deviceType": "IOT.SMARTPLUGSWITCH",
              "parentDeviceContext": {
                "model": "HS107",
                "hardwareVersion": "1.0",
                "appServerUrl": "https://use1-wap.tplinkcloud.com",
                "deviceId": "80066186C2737010B10F22E0E70538B819D60B27",
                "deviceType": "IOT.SMARTPLUGSWITCH"
              }
        }
        }
      ]
    }]
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

app.post('/ifttt/v1/actions/turn_on', actionFieldsCheck, (req, res) => {
  
  const IFTTT_KEY = "UrP0cndNKbsXZgQ_yrMf8FeDhdVPEckurljQS8bIrsKWhLvlfwzRB9TZMFFW_Dr4";
  const key = req.get("IFTTT-Service-Key");

  if (key !== IFTTT_KEY) {
    res.status(401).send({
      "errors": [{
        "message": "Invalid Service Key"
      }]
    });
  }
  
  res.status(200).send({
      "data": [{
        "id": "a4i3i3nnkznkwknkdnafkn23jnjn434"
      }]
    });
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
