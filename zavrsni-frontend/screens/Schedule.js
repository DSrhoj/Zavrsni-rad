import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import CalendarModal from '../components/CalendarModal';
import Header from '../components/Header';
import { useTheme } from 'react-native-paper';
import formatEvents from '../functions/formatEvents';
import changeDate from '../functions/changeDate';
import { getEvents } from '../fetch';
// import DodajSat from '../DodajSatModal/DodajSat';
// import fetchTermini from '../../functions/fetchTermini'
// import ChangeWeekModal from '../ChangeWeekModal';
// import { format, add, parseISO } from 'date-fns';


const Schedule = (props) => {

    const [calendarModalVisible, setCalendarModalVisible] = useState(true);
    const [events, setEvents] = useState([]);
    const [dateTime, setDateTime] = useState(new Date(Date.now()));
    const [nextDateTime, setNextDateTime] = useState(new Date(Date.now()));

    // Variables from theme context
    const { colors } = useTheme();

    const refreshEvents = async () => {

        // Go to month and click the date
        await updateDate();

        // Get events from server
        let events = await getEvents();

        // Format events data to presentation format
        let formatedEvents = await formatEvents(events, nextDateTime);

        // Set use state to new events
        setEvents(formatedEvents);
    }

    const updateDate = async () => {
        await changeDate(dateTime, nextDateTime);
        setDateTime(nextDateTime);
    }

    // Happens on render and every re-render when at least one array argument changes value
    useEffect(() => {

        // Get events from server and refresh screen
        refreshEvents();
    },
        // Happens when dateTime changes its value
        [nextDateTime]
    );

    const showModal = () => {
        setCalendarModalVisible(true);
    }

    return (
        <View style={styles.container}>
            <Header title={'Schedule'} />
            <View style={styles.schedule}>
                {events.map(element => element)}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableHighlight style={styles.button} onPress={showModal}>
                    <View style={{ ...styles.buttonView, backgroundColor: colors.accent }}>
                        <Text style={styles.buttonText}>Select date</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <CalendarModal visible={calendarModalVisible} setVisible={setCalendarModalVisible} setDateTime={setNextDateTime} dateTime={dateTime} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
    },
    schedule: {
        flex: 10,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        height: 50,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        height: "100%",
        width: "50%",
        borderRadius: 40,
        //marginTop: Dimensions.get('window').height - 110,
        //zIndex: 0,
        //position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonView: {
        flex: 1,
        width: "100%",
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
    }


});

export default Schedule;