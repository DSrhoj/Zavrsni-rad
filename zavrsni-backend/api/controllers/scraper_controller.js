// Import scraper instance
const { scraper_instance, JWTGenerator_instance } = require('../../services');
// Import logger
const { nodelogger } = require('../../loaders/logger');

module.exports = {

    // Function that checks input data and sends jwt as res
    login: async (req, res, next) => {
        try {
            // Creates new page when user trys to login
            await scraper_instance.createBrowserAndPage();

            // Gets page index of last created page
            let browserIndex = scraper_instance.browsers.length - 1;

            // Try to login user with sent data (was successful if returns 0)
            let loginFailed = await scraper_instance.login(scraper_instance.browsers[browserIndex].page, req.body.username, req.body.password);

            // Check if login was successful
            if (loginFailed) {
                // Login was not successful
                // Invalid data
                await scraper_instance.closeBrowser(scraper_instance.browsers[browserIndex].browser);
                nodelogger.error("Invalid data!");
                res.status(403).json("Forbidden access! Invalid data!");
            }
            else {
                // Login was successful
                nodelogger.info("Login successful");
                let token = await JWTGenerator_instance.generateJWT(browserIndex);
                res.json({ token: token });
            }

        } catch (error) {
            nodelogger.error('Error in login!');
            next(error);
        }
    },

    // Function that gets events for selected date
    getEvents: async (req, res, next) => {

        try {

            // Go to Schedule page to be sure (because we might not be)
            await scraper_instance.gotoSchedule(scraper_instance.browsers[req.token.browserIndex].page);

            // Get events in current week
            let events = await scraper_instance.getEvents(scraper_instance.browsers[req.token.browserIndex].page);

            // Console log events
            // nodelogger.info(events);
            res.json(events);

        } catch (error) {
            nodelogger.error('Error in getting events!');
            next(error);
        }
    },

    //! Function for changing month

    //! function for changing week

    // Function that returns classes and attendance for each
    getAttendance: async (req, res, next) => {

        try {
            // Go to attendance page to be sure (because we might not be)
            await scraper_instance.gotoAttendance(scraper_instance.browsers[req.token.browserIndex].page);

            // Get events in current week
            let attendance = await scraper_instance.getAttendance(scraper_instance.browsers[req.token.browserIndex].page);

            // Console log events
            // nodelogger.info(attendance);
            res.json(attendance);

        } catch (error) {
            nodelogger.error('Error in getting events!');
            next(error);
        }
    }
}