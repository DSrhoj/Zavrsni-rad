import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

const Day = props => {

    // Variables from user context
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <View style={{ ...styles.date, backgroundColor: colors.primary }}>
                <Text style={styles.dateText}>{props.dayName}</Text>
            </View>
            <View style={styles.events}>
                {props.events.map(element => element)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        margin: 1,
    },
    date: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ffffff',
    },
    events: {
        flex: 20,
    },
});

export default Day;