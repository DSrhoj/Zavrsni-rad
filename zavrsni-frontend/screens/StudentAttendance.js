import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';

const StudentAttendance = props => {

    // Happens on render and every re-render when at least one array argument changes value
    useEffect(() => {
        // Fetch termini and update dani
        //! fetchTermini.updateDani({ setDani, date_time: format(dateTime, "yyyy-MM-dd HH:mm:ss.SSSx") });
    },
        // Happens when dateTime changes its value
        []
    );

    return (
        <View style={styles.container}>
            <Header title={'Attendance'} />
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

export default StudentAttendance;