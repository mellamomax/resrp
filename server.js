// server.js
// where your node app starts

// init project
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const helpers = require('./helpers');

app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// The status
app.get('/ifttt/v1/status', helpers.serviceKeyCheck, (req, res) => {
  res.status(200).send();
});

// The test/setup endpoint
app.post('/ifttt/v1/test/setup', helpers.serviceKeyCheck, (req, res) => {
  
//   let body = {
//     "data": {
//       "samples": {
//         "triggers": {
//           "new_entry_with_specific_emotion": {
//             "emotion_id": 2 // Some function to get a random emotion id.,
//           },
//           "tracked_an_emotion_n_days_in_a_row": {
//             "emotion_id": 2, // Some function to get a random emotion id.,
//             "days": 2 // Some function to generate a random number between 2 and 5.
//           }
//         },
//         "actions": {
//           "new_entry": {
//             "emotion_id": 2,
//             "note": "Hello World",
//             "location": "Tokyo, Japan"

//           },
//           "actionRecordSkipping": {
//             "new_entry": {
//               "emotion_id": "",
//               "note": "Hello World Again",
//               "location": "Seoul, South Korea"
//             }
//           }
//         }
//       }
//     }
//   };

});

post "/ifttt/v1/test/setup", to: "ifttt#setup"

    post "/ifttt/v1/triggers/new_thing_created", to: "ifttt#new_thing_created"
    post "/ifttt/v1/actions/create_new_thing", to: "ifttt#create_new_thing"

app.post('/ifttt/v1/triggers/new_thing_created', helpers.serviceKeyCheck, function (req, res) => {
        
});

app.post('/ifttt/v1/triggers/);

// Triggers
// Ingredients are `created_at`, `emotion`, `note`, and `location`.
router.post('/triggers/any_new_entry', accessTokenCheck, userCheck, (req, res) => {

  const entries = Entries.getEntries(req.user.id, {
    "limit": req.body.limit
  });

  let data = [];

  for (let i = 0; i < entries.length; i+= 1) {
    let entry = entries[i];

    data.push({
      "meta": {
        "id": entry.id,
        "timestamp": helpers.currentUnixTimeStampInSeconds()
      },
      "created_at": entry.time,
      "emotion_id": entry.emotion_id,
      "note": entry.note,
      "location": "Latitude: " + entry.latitude + " Longitude: " + entry.longitude
    });

  }

  // console.log("data", data);

  res.status(200).send({
    "data": data
  });

});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
