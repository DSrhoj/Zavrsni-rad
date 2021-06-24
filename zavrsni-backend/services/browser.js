const puppeteer = require('puppeteer');

module.exports = class myBrowser {
    constructor() {
        this.browsers = [];
    }

    // Function for creating browser that returns index of browser
    async createBrowserAndPage() {
        // Create new browser
        let newBrowser = await puppeteer.launch();

        // Create new page for new frowser
        let newBrowserPage = await newBrowser.newPage();

        // Serch for index of some browser in array that is closed
        let index = 0;

        // Go through browsers
        while (index < this.browsers.length && this.browsers[index].browser._process.killed == false) {
            index++;
        }

        // If there is no closed browser
        if (index == this.browsers.length) {
            // Push new browser in browsers list
            this.browsers.push({
                browser: newBrowser,
                page: newBrowserPage
            });
        }

        // If there is closed browser
        else {
            // Chenge existing browser
            this.browsers[index].browser = newBrowser;
            this.browsers[index].page = newBrowserPage;
        }

        // Return index of browser
        return index;
    }

    // Function for closing browser
    async closeBrowser(browserIndex) {
        // Close page
        await this.browsers[browserIndex].page.close();

        // Close browser
        await this.browsers[browserIndex].browser.close();
    }

    // Function that returns list of browsers
    async getListOfBrowsers() {
        return (
            this.browsers
        )
    }
}