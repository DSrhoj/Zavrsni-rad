// Importing Navigators class
const Navigators = require('./navigators');

// Scraper extends from class Navigators (so we can scrape pages from the browser)
module.exports = class Scraper extends Navigators {

    // Function that returns list of events
    async getEvents(page) {
        const events = await page.evaluate(() =>
            // Selects all events that are displayed
            Array.from(document.querySelectorAll('.event')).map(event => {

                // Extracting all data from events
                const name = event.querySelector('.name.normal').innerText.trim();
                const shortName = event.querySelector('.name.short').innerText.trim();
                const groupCategory = event.querySelector('.groupCategory').innerText.trim();
                const groupNormal = () => {
                    // If element exists return its innerText else return null
                    if (event.querySelector('.group.normal')) {
                        return event.querySelector('.group.normal').innerText.trim();
                    } else {
                        return null;
                    }
                }
                const groupShort = () => {
                    // If element exists return its innerText else return null
                    if (event.querySelector('.group.short')) {
                        return event.querySelector('.group.short').innerText.trim();
                    } else {
                        return null;
                    }
                }
                const hall = event.querySelector('.resource').innerText.trim();
                const attributes = event.attributes;

                // Returning object with event data
                return ({
                    name: name,
                    shortName: shortName,
                    groupCategory: groupCategory,
                    groupNormal: groupNormal(),
                    groupShort: groupShort(),
                    hall: hall,
                    startsDate: attributes["data-startsdate"].value,
                    startsHour: attributes["data-startshour"].value,
                    startsMin: attributes["data-startsmin"].value,
                    endsDate: attributes["data-endsdate"].value,
                    endsHour: attributes["data-endshour"].value,
                    endsMin: attributes["data-endsmin"].value,
                })
            })
        );

        // Returning list of objets with event data
        return events;
    }

    async getAttendance(page) {

        // Function that returns list of classes
        const attendance = await page.evaluate(() =>

            // Selects all semesters
            Array.from(document.querySelectorAll('.semster')).map(semester => {

                // Returns object with name of semester and array of classes in that semester
                return ({
                    semester: semester.querySelector('.semsterHeader').innerText,

                    // Selects all classes in semester
                    classes: Array.from(semester.querySelectorAll('.row')).map(row => {

                        // Returns object with name of class and attendance for that class
                        return ({
                            name: row.querySelector('.fullName.firstColumn > .cellContent').innerText,

                            // Selects all attendances for class
                            attendance: Array.from(row.querySelectorAll('.cell.category')).map(attendance => {

                                // Gets attendance
                                let tempAttendance = attendance.querySelector('.categoryAttendance');
                                let tempAttendancePercentage = attendance.querySelector('.categoryAttendancePercent');

                                // Checks if attendance exists (means that segment of class exists)
                                if (tempAttendance != null) {

                                    // If exists return data
                                    return {
                                        attendance: tempAttendance.innerText,
                                        attendancePercentage: tempAttendancePercentage.innerText
                                    };
                                }
                            })
                        })
                    })
                })
            })
        )

        // Returning list of objets with attendance data
        return attendance;
    }

    async getRole(page) {

        this.gotoSchedule(page);

        // Function that returns tab element of student
        const studentTab = await page.evaluate(() =>
            document.querySelector('#mm-StudentDashboard')
        );

        // Set role
        let role = studentTab == null ? 0 : 1;

        // Return role (profesor - 0, student - 1)
        return role;
    }
}
