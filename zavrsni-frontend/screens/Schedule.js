import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
// import DodajSat from '../DodajSatModal/DodajSat';
// import fetchTermini from '../../functions/fetchTermini'
// import ChangeWeekModal from '../ChangeWeekModal';
// import { format, add, parseISO } from 'date-fns';


const Schedule = props => {

    const [changeWeekModalVisible, setChangeWeekModalVisible] = useState(false);
    const [dateTime, setDateTime] = useState(new Date(Date.now()));

    // Happens on render and every re-render when at least one array argument changes value
    useEffect(() => {
        // Fetch termini and update dani
        //! fetchTermini.updateDani({ setDani, date_time: format(dateTime, "yyyy-MM-dd HH:mm:ss.SSSx") });
    },
        // Happens when dateTime changes its value
        [dateTime]
    );

    return (
        <View style={styles.container}>
            <Header title={'Schedule'} />
            <View style={styles.schedule}>
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