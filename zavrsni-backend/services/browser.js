const puppeteer = require('puppeteer');

module.exports = class myBrowser {
    constructor() {
        this.browser = null;
        this.pageList = []
    }

    // Function for creating browser
    async createBrowser() {
        this.browser = await puppeteer.launch();
    }

    // Function for closing browser
    async closeBrowser() {
        this.browser.close();
    }

    // Function for creating new page
    async createPage() {
        this.pageList.push(await this.browser.newPage());
    }

    // Function for closing page sent via props
    async closePage(page) {
        page.close();
    }

    // Function that returns list of pages
    async getListOfPages() {
        return (
            this.pageList
        )
    }
}