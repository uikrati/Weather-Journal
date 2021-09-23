// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* Middleware*/

// Cors for cross origin allowance
const cors = require('cors');
const { RSA_NO_PADDING } = require('constants');
app.use(cors());

// Initialize the main project folder
app.use(express.static('docs'));

// Spin up the server
const port= 3000;
const server = app.listen(port, listening);

// Callback to debug
function listening(){
    console.log(`Server running`)
    console.log(`running on localhost: ${port}`);
};

//GET route

app.get('/all', function (req, res){
    res.send(projectData);
  });

//Post route

let data = [];

app.post('/create', function(req, res){
    data.push(req.body);
    projectData["newEntry"] = data;
});