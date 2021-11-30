import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import CalendarModal from '../components/CalendarModal';
import Header from '../components/Header';
import { usePage, usePageUpdate } from '../components/PageContext';
import { useTheme } from 'react-native-paper';
import formatEvents from '../functions/formatEvents';
import changeDate from '../functions/changeDate';
import { getEvents } from '../fetch';
// import DodajSat from '../DodajSatModal/DodajSat';
// import fetchTermini from '../../functions/fetchTermini'
// import ChangeWeekModal from '../ChangeWeekModal';
// import { format, add, parseISO } from 'date-fns';


const Schedule = (props) => {

    const [calendarModalVisible, setCalendarModalVisible] = useState(false);
    const [events, setEvents] = useState([]);
    const [dateTime, setDateTime] = useState(new Date(Date.now()));
    const [nextDateTime, setNextDateTime] = useState(new Date(Date.now()));

    // Use page context
    const page = usePage();
    const updatePage = usePageUpdate();

    // Variables from theme context
    const { colors } = useTheme();

    const refreshEvents = async () => {

        // Update date on the server and client side
        await updateDate();

        // Get events from server
        let events = await getEvents();

        // Format events data to presentation format
        let formatedEvents = await formatEvents(events, nextDateTime);

        // Set use state to new events
        setEvents(formatedEvents);
    }

    const updateDate = async () => {
        // Check if Page was changed on server side
        if (page == 1) {

            // If it was changed starting date needs to be reseted
            await changeDate(new Date(Date.now()), nextDateTime);

            // Chane page back to 0
            updatePage(0);
        }
        else {

            // If it was not changed do as usual
            await changeDate(dateTime, nextDateTime);
        }
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