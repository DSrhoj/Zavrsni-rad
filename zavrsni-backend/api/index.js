// Gets package
const express = require('express');

// Creates mainRoute from express package
const main_route = express.Router();

// Import routs from routes folder
const scraper = require('./routes/scraper');

// Call of functions from routes with main_route as parameter
scraper(main_route);

// Exports route
module.exports = {
    main_route: main_route
}