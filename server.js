// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// log all requests
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
}); 

// API timestamp endpoint 
app.get(["/api/timestamp/", "/api/timestamp/:timestamp/"], function (req, res) {

  console.log("GET Request received with inputTimestamp:", req.params.timestamp);

  const timestamp = isNaN(req.params.timestamp) ? req.params.timestamp : parseFloat(req.params.timestamp)

  let date = timestamp ? new Date(timestamp) : new Date();

  console.log({
    inputTimestamp: req.params.timestamp, 
    castedTimestamp: timestamp,
    typeofCastedTimestamp: typeof timestamp,
    parsedDate: date,
    typeOfDate: typeof date,
  });

  if(isNaN(date)) {
    console.log("Invalid timestamp/date received")
    res.json({
      error : "Invalid Date"
    });

  }
  else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }

});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
