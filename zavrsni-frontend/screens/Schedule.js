import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { formatEvents } from '../functions';
import { getEvents } from '../fetch';
// import DodajSat from '../DodajSatModal/DodajSat';
// import fetchTermini from '../../functions/fetchTermini'
// import ChangeWeekModal from '../ChangeWeekModal';
// import { format, add, parseISO } from 'date-fns';


const Schedule = props => {

    const [changeWeekModalVisible, setChangeWeekModalVisible] = useState(false);
    const [events, setEvents] = useState([]);
    const [dateTime, setDateTime] = useState(new Date(Date.now()));


    async function refreshEvents() {
        // Get events from server
        let events = await getEvents();

        // Format events data to presentation format
        let formatedEvents = await formatEvents(events, dateTime);

        // Set use state to new events
        setEvents(formatedEvents);
    }

    // Happens on render and every re-render when at least one array argument changes value
    useEffect(() => {

        // Get events from server and refresh screen
        refreshEvents();
    },
        // Happens when dateTime changes its value
        [dateTime]
    );

    return (
        <View style={styles.container}>
            <Header title={'Schedule'} />
            <View style={styles.schedule}>
                {events.map(element => element)}
            </View>
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
});

export default Schedule;