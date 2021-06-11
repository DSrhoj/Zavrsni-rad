// Gets express file from current folder
const express = require('./express');
// Gets logger
const { nodelogger } = require('./logger');

module.exports = {
    load: async function (app) {
        try {
            try {
                // Check if express is loaded
                await express(app);
                nodelogger.info("Express loaded!");
            }
            catch (error) {
                nodelogger.error("Express is not loaded!");
                throw (new Error());
            }
        }
        catch (error) {
            nodelogger.error("Loaders not loaded correctly!");
            throw (new Error());
        }
    }
}
