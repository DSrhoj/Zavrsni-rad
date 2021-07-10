import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Event = props => {

    const color = () => {
        let color;
        switch (props.groupCategory) {
            case "Ispiti,":
                color = "#510062";
                break;
            case "Kolokviji,":
                color = "#850071";
                break;
            case "Predavanja,":
                color = "#00aeff";
                break;
            case "Auditorne vježbe,":
                color = "#16ba00";
                break;
            case "Laboratorijske vježbe,":
                color = "#e74700";
                break;
            default:
                color = "gray";
                break;
        }

        return color;
    }

    return (
        <View style={{ ...styles.container, backgroundColor: color(), borderColor: color() }}>
            <View style={styles.text}>
                <Text style={styles.name} adjustsFontSizeToFit={true} numberOfLines={1}>{props.name}</Text>
            </View>
            <View style={styles.text}>
                <Text style={styles.time} adjustsFontSizeToFit={true} numberOfLines={1}>{props.time}</Text>
            </View>
            <View style={styles.text}>
                <Text style={styles.hall} adjustsFontSizeToFit={true} numberOfLines={1}>{props.hall}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 1,
        height: 75,
        width: "100%",
        backgroundColor: 'white',
        borderWidth: 2,
        // borderRadius: 15,
    },
    text: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    },
    time: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    hall: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default Event;