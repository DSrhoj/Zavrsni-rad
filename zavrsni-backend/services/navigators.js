// Importing myBrowser class
const myBrowser = require('./browser');

// Navigation extends from class myBrowser (so we can change pages from the browser)
module.exports = class Navigatiors extends myBrowser {

    // Function to navigate to login page
    async gotoLogin(page) {
        await page.goto('https://korisnik.fesb.unist.hr/prijava?returnUrl=https://raspored.fesb.unist.hr');
    }

    // Function to navigate to attendance page
    async gotoRaspored(page) {
        await page.goto('https://raspored.fesb.unist.hr/raspored/osobni');
        await page.waitForSelector('.events');
    }

    // Function to navigate to attendance page
    async gotoPrisutnost(page) {
        await page.goto('https://raspored.fesb.unist.hr/prisutnost/opcenito');
    }

    // Input login data and submit form
    async login(page, username, password) {
        // Go to login page
        await this.gotoLogin(page);

        // Input data in the form
        await page.type('#Username', username);
        await page.type('#Password', password);

        // Click submit
        await page.click('.submit');

        // Waiting to load new page that we were redirectad at
        await page.waitForNavigation();

        // Check if authorization failed
        if (page.$('.field-validation-error') == null) {

            // Authorization failed
            return 1;
        }
        else {
            // Authoriation successfull
            return 0;
        }
    }

    // Function to navigate one month backward
    async previousMonth(page) {
        await page.click('.ui-icon-circle-triangle-w');
    }

    // Function to navigate one month forward
    async nextMonth(page) {
        await page.click('.ui-icon-circle-triangle-e');
    }

    // Function to click on day of month that user selected
    async changeWeek(page, selectedDayOfMonth) {
        try {
            // Get element of day of month user selected
            let dayOfMonth = await page.evaluateHandle((selectedDayOfMonth) => {
                return (
                    // This way elements with only that class are selected (not if they have some other class too)
                    Array.from(document.querySelectorAll("[class='ui-state-default']")).find(dayOfMonth => {
                        if (dayOfMonth.textContent == selectedDayOfMonth) {
                            return (dayOfMonth)
                        }
                    })
                )
                // This way selectedDayOfMonth variable is sent to evaluateHandle function
            }, selectedDayOfMonth)

            // Get dayOfMonth as element so its clickable
            let dayOfMonthAsElem = await dayOfMonth.asElement();

            // Clicks the day of month, which user selected
            await dayOfMonthAsElem.click();
            // Waits for svhedule to reload
            await page.waitForSelector('.loading', { hidden: true }); //await page.waitForNavigation({ waitUntil: 'load' });

        } catch (error) {
            console.log(error);
        }
    }
}
