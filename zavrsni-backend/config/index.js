// Gets packages
// Package for using env file
const dotenv = require('dotenv');

// Gets config file
const envFound = dotenv.config();

// Throw error if env file was not found
if (envFound.error) {
    throw new Error("Could not find env file!");
}

// Exports data from env file
module.exports = {   
    port: process.env.PORT,
    api: process.env.ROOT,
}