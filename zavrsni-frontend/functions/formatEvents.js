import React from 'react';
import { format, getDay, startOfWeek } from 'date-fns'
import { addDays } from 'date-fns/esm';
import Event from '../components/Event';
import Day from '../components/Day';

module.exports = async function formatEvents(eventsData, dateTime) {
    try {
        // Check if events are recieved
        if (eventsData) {
            // Values recieved

            // Create events array
            let eventsArray = createEventsArray(eventsData, dateTime);

            // Create days array
            let daysArray = createDaysArray(eventsArray);

            return daysArray;
        }
        else {
            // Events not recieved
            console.log("Data does not exist!");

            return null;
        }

    } catch (error) {
        // Error geting events from server
        console.log("Error formatting events from server");
    }
}

const createEventsArray = (eventsData, dateTime) => {
    dateTime = startOfWeek(dateTime, { weekStartsOn: 1 });
    let arrayEvents = {};
    let j = 0;

    // Do for each day
    for (let i = 0; i < 6; i++) {
        arrayEvents[`${i + 1}`] = [];

        // While date of event == date if i (does not repeats the check for all dates)
        while (eventsData[j] != null && eventsData[j].startsDate == format(dateTime, "yyyy-MM-dd")) {

            arrayEvents[`${i + 1}`].push(<Event key={j} name={eventsData[j].shortName} time={getTime(eventsData[j])} hall={eventsData[j].hall} groupCategory={eventsData[j].groupCategory} />);

            // Increase to move in loop
            j++;
        }

        // Increase to change day for which we check the match
        dateTime = addDays(dateTime, 1);
    }

    return arrayEvents;
};

const createDaysArray = (eventsArray) => {
    let arrayDays = [];

    // For each array of events day is created, because one array represents events of that day
    Object.keys(eventsArray).forEach(
        day => {
            arrayDays.push(<Day key={day} /* Because this is index of day (name of array) */ dayName={getDayName(day)} /* Because this returns name of day */ events={eventsArray[day]} />);
        }
    );

    return arrayDays;
}

const getDayName = (dayIndex) => {
    let day;

    // Set day name
    switch (dayIndex) {
        case "1":
            day = "Mon";
            break;
        case "2":
            day = "Tue";
            break;
        case "3":
            day = "Wed";
            break;
        case "4":
            day = "Thu";
            break;
        case "5":
            day = "Fri";
            break;
        case "6":
            day = "Sat";
            break;
        case "7":
            day = "Sun";
            break;
        default:
            day = "Day";
            break;
    }

    // Return day name
    return day;
}

// Function for formatting time (if min has one zero)
const getTime = (event) => {
    let startsMin = event.startsMin;
    let endsMin = event.endsMin;

    if (event.startsMin == 0) {
        startsMin = "00";
    }
    if (event.endsMin == 0) {
        endsMin = "00";
    }

    return event.startsHour + ":" + startsMin + "-" + event.endsHour + ":" + endsMin;
}