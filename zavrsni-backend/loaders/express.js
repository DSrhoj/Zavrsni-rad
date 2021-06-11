// Gets route from controllers
const { main_route } = require('../api');
// Gets data from config/env file
const config = require('../config');
// Gets logger
const { httploger } = require('./logger');
// Gets express package
const express = require('express');
// Gets cors package for cross origin resource shareing
const cors = require('cors');
// Allows origin to be every possible
const corsOptions = { origin: '*' };

module.exports = (app) => {

    app.use(httploger);

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors(corsOptions));
    app.options("/", function (req, res, next) {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.send(200);
    });

    // So we can use different routes
    app.use(`${config.api}`, main_route);

    // Throw error if resource was not found
    app.use((req, res, next) => {
        const error = new Error("Not found");
        error.status = 404;
        next(error);
    });

    // Return error message and status 500 in case of server error
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            error: {
                message: err.message,
            },
        });
    });
}