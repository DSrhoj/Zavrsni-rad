// Import scraper instance
const { scraper_instance, JWTGenerator_instance } = require('../../services');
// Import logger
const { nodelogger } = require('../../loaders/logger');

module.exports = {

    // Function that checks input data and sends jwt as res
    login: async (req, res, next) => {
        try {
            // Creates new page when user trys to login
            await scraper_instance.createPage();

            // Gets page index of last created page
            let pageIndex = scraper_instance.pageList.length - 1;

            // Try to login user with sent data (was successful if returns 0)
            let loginFailed = await scraper_instance.login(scraper_instance.pageList[pageIndex], req.body.username, req.body.password);

            // Check if login was successful
            if (loginFailed) {
                // Login was not successful
                // Invalid data
                await scraper_instance.closePage(scraper_instance.pageList[pageIndex]);
                nodelogger.error("Invalid data!");
                res.status(403).json("Forbidden access! Invalid data!");
            }
            else {
                // Login was successful
                let token = await JWTGenerator_instance.generateJWT(pageIndex);
                res.json({ token: token });
            }

        } catch (error) {
            nodelogger.error('Error in login!');
            next(error);
        }
    },

    // Function that gets events for selected date
    getEvents: async (req, res, next) => {
        // req.body.dateTime that needs to be formatted

        try {
            // Go to raspored page to be sure (because we might not be)
            await scraper_instance.gotoRaspored(scraper_instance.pageList[req.token.pageIndex]);

            // Get events in current week
            let events = await scraper_instance.getEvents(scraper_instance.pageList[req.token.pageIndex]);

            // Console log events
            nodelogger.info(events);
            res.json(events);

        } catch (error) {
            nodelogger.error('Error in getting events!');
            next(error);
        }
    }
}