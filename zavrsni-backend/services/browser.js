const puppeteer = require('puppeteer');

module.exports = class myBrowser {
    constructor() {
        this.browsers = [];
    }

    // Function for creating browser
    async createBrowserAndPage() {
        // Create new browser
        let newBrowser = await puppeteer.launch();

        // Create new page for new frowser
        let newBrowserPage = await newBrowser.newPage();

        // Push new browser in browsers list
        this.browsers.push({
            browser: newBrowser,
            page: newBrowserPage
        });
    }

    // Function for closing browser
    async closeBrowser(browserIndex) {
        this.browsers[browserIndex].browser.close();
    }

    // Function that returns list of browsers
    async getListOfBrowsers() {
        return (
            this.browsers
        )
    }
}