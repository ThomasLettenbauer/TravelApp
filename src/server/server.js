// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator');

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Spin up the server
const port = 3000;
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

// Post Route - Travel data form / Validation
app.post('/travel', [
    check('destination').not().isEmpty(),
    check('datefrom').not().isEmpty()
], (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {

        req.body.status = "ERROR"
        req.body.error = ""

        console.log('___ERRORS___')

        errors.array().forEach(function (obj) {

            if (req.body.error != '') {
                req.body.error += ', '
            }

            switch (obj.param) {
                case 'destination':
                    req.body.error += 'Destination is empty';
                    break;
                case 'datefrom':
                    req.body.error += 'Departing date is empty';
                    break;
            }

        });

    } else {
        req.body.status = "SUCCESS"
        req.body.error = ""
    }

    processTravelData(req, res)

})

// Process travel data - Validate Input, call APIs, return weather data, image link, errors
function processTravelData(req, res) {

    // get location from Geonames API

    // get weather data from Dark Sky API

    // get image link from Pixabay API

    let travelData = {
        destination: req.body.destination,
        datefrom: req.body.datefrom,
        status: req.body.status,
        error: req.body.error
    }

    console.log('POST')
    console.log(travelData)

    return res.send(travelData);

};








