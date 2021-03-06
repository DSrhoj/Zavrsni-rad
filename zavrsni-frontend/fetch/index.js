import login from './login';
import logout from './logout';
import getEvents from './getEvents';
import changeWeek from './changeWeek';
import nextMonth from './nextMonth';
import previousMonth from './previousMonth';
import getAttendanceStudent from './getAttendanceStudent';
import getAttendanceProfesor from './getAttendanceProfesor';

module.exports = {
    login: login,
    logout: logout,
    getEvents: getEvents,
    changeWeek: changeWeek,
    nextMonth: nextMonth,
    previousMonth: previousMonth,
    getAttendanceStudent: getAttendanceStudent,
    getAttendanceProfesor: getAttendanceProfesor,
}