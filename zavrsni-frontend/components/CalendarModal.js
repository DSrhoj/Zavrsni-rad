import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Modal } from 'react-native';
import { useTheme } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const CalendarModal = (props) => {

    const [date, setDate] = useState(moment(props.dateTime));

    // Variables from theme context
    const { colors } = useTheme();

    const onDateChange = (date) => {
        setDate(date)
    }

    const hideModal = () => {
        props.setVisible(false);
    }

    const onOk = () => {
        props.setDateTime(date.toDate());
        hideModal();
    }

    const onCancel = () => {
        setDate(moment(props.dateTime))
        hideModal();
    }

    return (
        <Modal animationType="slide" transparent={true} visible={props.visible}>
            <View style={styles.container}>
                <View style={styles.calendar}>
                    <CalendarPicker
                        startFromMonday={true}
                        selectedDayColor={colors.primary}
                        todayBackgroundColor={colors.accent}
                        onDateChange={onDateChange}
                        initialDate={moment(props.dateTime)}
                        selectedStartDate={date}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableHighlight style={styles.button} onPress={onCancel} activeOpacity={0.65}>
                        <View style={styles.buttonViewLogin}>
                            <Text style={{ ...styles.buttonText, color: colors.accent }}>Cancel</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} onPress={onOk} activeOpacity={0.65}>
                        <View style={styles.buttonViewLogin}>
                            <Text style={{ ...styles.buttonText, color: colors.primary }}>OK</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: "60%",
        width: "100%",
        backgroundColor: "white",
        marginTop: "75%",
    },
    calendar: {
        height: "80%"
    },
    buttonsContainer: {
        height: "10%",
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 30,
    },
    button: {
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
    },
    buttonViewLogin: {
        height: 50,
        width: 70,
        backgroundColor: "white",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f6f6f6',
    },
});
export default CalendarModal;
