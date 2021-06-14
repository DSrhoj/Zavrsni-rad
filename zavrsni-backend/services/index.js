const JWTGenerator = require('./JWTGenerator');
const Scraper = require('./scraper');

// Create an instance of login class
const JWTGenerator_instance = new JWTGenerator();

// Create an instance of Scraper class
const scraper_instance = new Scraper();

// Exportng instance of class (like global variable)
module.exports = {
    JWTGenerator_instance: JWTGenerator_instance,
    scraper_instance: scraper_instance
}
