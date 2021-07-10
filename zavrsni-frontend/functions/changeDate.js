import changeWeek from '../fetch/changeWeek';
import nextMonth from '../fetch/nextMonth';
import previousMonth from '../fetch/previousMonth';
import { differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears, getDate } from 'date-fns';

module.exports = async function changeDate(currentDateTime, nextDateTime) {
    let day = getDate(nextDateTime);
    let monthDifference = differenceInCalendarMonths(nextDateTime, currentDateTime);
    let absMonthDifference = Math.abs(monthDifference);

    if (differenceInCalendarYears(nextDateTime, currentDateTime) != 0 || monthDifference != 0 || differenceInCalendarDays(nextDateTime, currentDateTime) != 0) {
        while (absMonthDifference != 0) {
            if (monthDifference > 0) {
                await nextMonth();
            }
            else if (monthDifference < 0) {
                await previousMonth();
            }
            absMonthDifference--;
        }

        await changeWeek(day);
    }

    return 0;
}