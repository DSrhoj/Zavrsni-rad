// Importing myBrowser class
const myBrowser = require('./browser');

// Navigation extends from class myBrowser (so we can change pages from the browser)
module.exports = class Navigatiors extends myBrowser {

    // Function to navigate to login page
    async gotoLogin(page) {
        await page.goto('https://korisnik.fesb.unist.hr/prijava?returnUrl=https://raspored.fesb.unist.hr');
    }

    // Function to navigate to attendance page
    async gotoSchedule(page) {
        // Check if page is already on wanted url (schedule)
        if (await page.url() != 'https://raspored.fesb.unist.hr/raspored/osobni') {
            // If not go to schedule
            await page.goto('https://raspored.fesb.unist.hr/raspored/osobni');
            await page.waitForSelector('.events');
        }
    }

    // Function to navigate to attendance page
    async gotoAttendance(page) {
        // Check if page is already on wanted url (attendance)
        if (await page.url() != 'https://raspored.fesb.unist.hr/prisutnost/opcenito') {
            // If not go to attendance
            await page.goto('https://raspored.fesb.unist.hr/prisutnost/opcenito');
            await page.waitForSelector('.categoryAttendance');
        }
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
        if (await page.$('.field-validation-error') == null) {

            // Authorization failed
            return 1;
        }
        else {
            // Authoriation successfull
            return 0;
        }
    }

    // Funtion to logout
    async logout({ browser, page }) {
        await page.goto('https://korisnik.fesb.unist.hr/odjava?returnUrl=https://raspored.fesb.unist.hr');
        await page.close();
        await browser.close();
    }

    // Function to navigate one month forward
    async nextMonth(page) {
        await page.click('.ui-icon-circle-triangle-e');
    }

    // Function to navigate one month backward
    async previousMonth(page) {
        await page.click('.ui-icon-circle-triangle-w');
    }

    // Function to click on day of month that user selected
    async changeWeek(page, selectedDayOfMonth) {
        try {
            // Get element of day of month user selected
            let dayOfMonth = await page.evaluateHandle((selectedDayOfMonth) => {
                return (
                    // This way elements with only that class are selected (not if they have some other class too)
                    Array.from(document.querySelectorAll("[class='ui-state-default']")).find(dayOfMonth =>
                        dayOfMonth.innerText == selectedDayOfMonth)
                )
                // This way selectedDayOfMonth variable is sent to evaluateHandle function
            }, selectedDayOfMonth)

            // Click on the day of month
            await dayOfMonth.click();

            // Waits for schedule to reload
            await page.waitForSelector('.loading', { hidden: true }); //await page.waitForNavigation({ waitUntil: 'load' });

        } catch (error) {
            console.log(error);
        }
    }
}
