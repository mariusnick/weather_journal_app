// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
/* Dependencies Here we are configuring express to use body-parser as middle-ware.*/
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening () {
    console.log(`Server is running on ${port}`);
}

// get route
app.get('/all', function (req, res) {
    console.log("Send Data");
    res.send(projectData[projectData.length - 1]);
    
    console.log(projectData);
  });

  // post route

app.post('/weatherData', addWeather);

function addWeather (req,res){
    console.log('in post recive')
    let newdata = req.body;
    console.log(newdata)
    projectData.push(newdata);
    const newData1 = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
      };
      console.log("Recive Data")
      console.log(newData1.temperature)
      res.send(projectData);
   
};