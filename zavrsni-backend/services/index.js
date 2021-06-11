const Scraper = require('./scraper');

// Create an instance of Scraper class
const scraper_instance = new Scraper();

// Exportng instance of class (like global variable)
module.exports = {
    scraper_instance: scraper_instance
}
