// Gets express package
const express = require('express');
// Gets logger
const { nodelogger } = require('./loaders/logger');
// Gets loaders/index
const loaders = require('./loaders');
// Gets config/index
const config = require('./config');

// Express instance
const app = express();

async function start() {
    try {
        // Loads everything to check if it is working properly
        await loaders.load(app);
        // Listen on port from env file
        app.listen(config.port, () => {
            // Log info
            nodelogger.info(`App is listening on port ${config.port}`)
        })
    }
    catch (error) {
        // Log error if catched
        nodelogger.error(error);
    }
}

// Calls function to start listening
start();
