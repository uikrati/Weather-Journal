"use strict";
// Empty array to store project data
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser')

// Middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Cross origin allowance
const cors = require('cors');
app.use(cors());

//  Initializing the main project folder
app.use(express.static('docs'));

// sets the port. In this case 3000
const port = 3000;

// spin up server
const server = app.listen(port, listening);
function listening() {
    console.log(server);
    console.log(`running on localhost: ${port}`);
}

// Get route
app.get('/add', getData);

function getData (request, response) {
    response.send(projectData);
}

// POST route
app.post('/add', postData)

function postData(request, response)  {
    projectData = request.body;
    response.send({ message: "Post recieved"})
    console.log(request);
}
