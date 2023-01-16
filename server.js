






  
//Notis skickas
var express = require('express');
var request = require('request');
var app = express();
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
app.post("/", function (request, response) {
  console.log("Request received from IFTTT");
  console.log("Triggering multiple IFTTT services");
  // update the path to index.js to include the public directory
  require('./public/index.js');
  console.log("Done triggering.");
  response.end();  
});

// listen for requests :)
var listener = app.listen(8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
