import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Header from '../components/Header';
import { usePage, usePageUpdate } from '../components/PageContext';
import { getAttendanceStudent } from '../fetch';
import { formatAttendance } from '../functions';

const StudentAttendance = props => {

    const [attendanceWinter, setAttendanceWinter] = useState([]);
    const [attendanceSummer, setAttendanceSummer] = useState([]);

    // Use page context
    const page = usePage();
    const updatePage = usePageUpdate();

    const refreshAttendance = async () => {

        // Get attendance from server
        let attendanceData = await getAttendanceStudent();

        // Format attendance data to presentation format
        let formattedAttendance = await formatAttendance(attendanceData);
        //console.log("FOrmatirani podaci: ", formattedAttendance);

        // Set use state to new cards
        setAttendanceSummer(formattedAttendance.summerSemester);
        setAttendanceWinter(formattedAttendance.winterSemester);
    }

    // Happens on render and every re-render when at least one array argument changes value
    useEffect(() => {

        // Change page context
        updatePage(1);

        // Fetch attendance and update cards
        refreshAttendance();
    },
        // Happens when element of array changes its value
        []
    );

    return (
        <View style={styles.container}>
            <Header title={'Attendance'} />
            <View style={styles.semester}>
                <Text style={styles.semesterText}>WINTER SEMESTER</Text>
            </View>
            <ScrollView style={styles.cards} horizontal={true}>
                {attendanceWinter.map(element => element)}
            </ScrollView>
            <View style={styles.semester}>
                <Text style={styles.semesterText}>SUMMER SEMESTER</Text>
            </View>
            <ScrollView style={styles.cards} horizontal={true}>
                {attendanceSummer.map(element => element)}
            </ScrollView>
        </View>
    );
};

// {console.log(attendanceSummer)} {attendanceSummer.map(element => element)}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
    },
    semester: {
        height: 30,
        width: "100%",
        paddingLeft: 30,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "gray"
    },
    semesterText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "gray",
    },
    cards: {
        width: "100%",
        flexDirection: 'row',
    },
});

export default StudentAttendance;