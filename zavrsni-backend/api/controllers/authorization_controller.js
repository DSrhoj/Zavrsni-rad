// Import logger
const { nodelogger } = require('../../loaders/logger');
// Get jwt package
const jwt = require("jsonwebtoken");
// Gets data from config/env file
const config = require('../../config');

module.exports = {

    // Function that if its not passed forbidds access to server
    authorize: async (req, res, next) => {

        // Get header value
        const bearerHeader = req.headers['authorization'];

        // Check if bearer is empty, is there authorization heder
        if (typeof bearerHeader != 'undefined') {

            // Bearer was not empty, authorization heder exists
            // Split at the space
            const bearer = bearerHeader.split(' ');

            // Get token from array
            const bearerToken = bearer[1];

            // Verifying token and proceeding to next if verifyed
            try {
                const decoded = jwt.verify(bearerToken, config.jwt.secret);

                // Forward token to next executed function
                req.token = decoded;
                // Proceed to next function
                next();

            } catch (error) {
                nodelogger.error("Token verification failed: " + error);
                res.status(403).json("Forbidden access!");
            }
        }
        else {
            // Bearer was empty, authorization heder does not exists
            nodelogger.error("Authorization header was not passed!");
            res.status(403).json("Forbidden access!");
        }
    }
}