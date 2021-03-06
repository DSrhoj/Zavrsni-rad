const express = require('express');
// Used to check JWT and authorize user
const authorization_controller = require('../controllers/authorization_controller');
const scraper = express.Router();
// Used to call functions from scraper controller
const scraper_controller = require('../controllers/scraper_controller');
// const shema = require('../schema/scraper');
// const shemaValidator = require('../schema/validator');
// shemaValidator.addSchemas(shema);

module.exports = function (main_route) {
    main_route.use('/', scraper);
    scraper.post('/login', scraper_controller.login);
    scraper.get('/logout', authorization_controller.authorize, scraper_controller.logout);
    scraper.get('/getEvents', authorization_controller.authorize, scraper_controller.getEvents);
    scraper.get('/getAttendance', authorization_controller.authorize, scraper_controller.getAttendance);
    scraper.get('/nextMonth', authorization_controller.authorize, scraper_controller.changeMonthNext);
    scraper.get('/previousMonth', authorization_controller.authorize, scraper_controller.changeMonthPrevious);
    scraper.post('/changeWeek', authorization_controller.authorize, scraper_controller.changeWeek);
}