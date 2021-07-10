// Import scraper instance
const { scraper_instance, JWTGenerator_instance } = require('../../services');
// Import logger
const { nodelogger } = require('../../loaders/logger');

module.exports = {

    // Function that checks input data and sends jwt as res
    login: async (req, res, next) => {
        try {
            // Creates new page when user trys to login and gets its index
            let browserIndex = await scraper_instance.createBrowserAndPage();

            // Try to login user with sent data (was successful if returns 0)
            let loginSuccessful = await scraper_instance.login(scraper_instance.browsers[browserIndex].page, req.body.username, req.body.password);
            
            // Check if login was successful
            if (!loginSuccessful) {
                // Login was not successful
                // Invalid data
                await scraper_instance.closeBrowser(browserIndex);
                nodelogger.info("Invalid data!");
                res.status(403).json("Forbidden access! Invalid data!");
            }
            else {
                // Login was successful
                nodelogger.info(`Login successful for user (${browserIndex})`);
                let token = await JWTGenerator_instance.generateJWT(browserIndex);
                res.json({ token: token });
            }

        } catch (error) {
            nodelogger.error('Error in login!');
            next(error);
        }
    },

    // Logout function that logs out closes browser and page
    logout: async (req, res, next) => {
        try {
            // Logout function
            await scraper_instance.logout(scraper_instance.browsers[req.token.browserIndex]);

            // Console log info
            nodelogger.info(`Logout successful for user (${req.token.browserIndex})`);
            res.json("Logout successful");

        } catch (error) {
            nodelogger.error('Error in logging out!');
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

            // Console log info
            nodelogger.info(`Get events successful for user (${req.token.browserIndex})`);
            res.json(events);

        } catch (error) {
            nodelogger.error('Error in getting events!');
            next(error);
        }
    },

    // Function for changing month to next
    //! should change week to change what getEvents returns
    changeMonthNext: async (req, res, next) => {
        try {
            // Go to Schedule page to be sure (because we might not be)
            await scraper_instance.gotoSchedule(scraper_instance.browsers[req.token.browserIndex].page);

            // Change month to next function
            await scraper_instance.nextMonth(scraper_instance.browsers[req.token.browserIndex].page);

            //! should change week to change what change events returns
            // await scraper_instance.changeWeek(scraper_instance.browsers[req.token.browserIndex].page, 3);

            // Console log info
            nodelogger.info(`Changed to next month for user (${req.token.browserIndex})`)
            res.json("Succesfull");

        } catch (error) {
            nodelogger.error('Error in logging out!');
            next(error);
        }
    },

    // Function for changing month to previous
    //! should change week to change what getEvents returns
    changeMonthPrevious: async (req, res, next) => {
        try {
            // Go to Schedule page to be sure (because we might not be)
            await scraper_instance.gotoSchedule(scraper_instance.browsers[req.token.browserIndex].page);

            // Change month to previous function
            await scraper_instance.previousMonth(scraper_instance.browsers[req.token.browserIndex].page);

            // Console log info
            nodelogger.info(`Changed to previous month for user (${req.token.browserIndex})`)
            res.json("Succesfull");

        } catch (error) {
            nodelogger.error('Error in logging out!');
            next(error);
        }
    },

    // Function for changing week
    changeWeek: async (req, res, next) => {
        try {
            // Go to Schedule page to be sure (because we might not be)
            await scraper_instance.gotoSchedule(scraper_instance.browsers[req.token.browserIndex].page);

            // Chenge week by selected day
            await scraper_instance.changeWeek(scraper_instance.browsers[req.token.browserIndex].page, req.body.selectedDayOfMonth);

            // Console log info
            nodelogger.info(`Changed week for user (${req.token.browserIndex})`)
            res.json("Succesfull");

        } catch (error) {
            nodelogger.error('Error in logging out!');
            next(error);
        }
    },

    // Function that returns classes and attendance for each
    getAttendance: async (req, res, next) => {
        try {
            // Go to attendance page to be sure (because we might not be)
            await scraper_instance.gotoAttendance(scraper_instance.browsers[req.token.browserIndex].page);

            // Get events in current week
            let attendance = await scraper_instance.getAttendance(scraper_instance.browsers[req.token.browserIndex].page);

            // Console log info
            nodelogger.info(`Get attendance successful for user (${req.token.browserIndex})`);
            res.json(attendance);

        } catch (error) {
            nodelogger.error('Error in getting events!');
            next(error);
        }
    }
}