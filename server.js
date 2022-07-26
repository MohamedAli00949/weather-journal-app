// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");


// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = "5050";
const server = app.listen(port, () => {
    console.log("server runing");
    console.log(`Server running at http://localhost:${port}/`);
});

/**
 * Get All The Data 
 */
app.get('/allData', (req, res)=>{
    res.send(projectData);
});

// Post Route
app.post('/addData', (req, res)=>{
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    };    
    res.send(projectData);
});
