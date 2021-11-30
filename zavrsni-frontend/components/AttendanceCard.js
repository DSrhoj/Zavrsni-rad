import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts'

const AttendanceCard = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.titleText} adjustsFontSizeToFit={true} numberOfLines={1} >{props.title}</Text>
                <Text style={styles.titleText} adjustsFontSizeToFit={true} numberOfLines={1} >{props.type}</Text>
            </View>
            <PieChart
                style={styles.pie}
                outerRadius={'70%'}
                innerRadius={10}
                data={props.data}
            />
            <View style={styles.dataView}>
                <Text style={styles.dataText}>{props.dataText}</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        height: 260,
        width: 200,
        backgroundColor: "#f6f6f6",
        borderRadius: 10,
        shadowColor: "gray",
        shadowRadius: 8,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        elevation: 10,
        justifyContent: 'space-between',
        margin: 5,
    },

    pie: {
        height: 180,
        paddingBottom: 0,
    },

    titleView: {
        width: "100%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleText: {
        fontSize: 16,
        color: "black",
    },

    dataView: {
        width: "100%",
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    dataText: {
        fontSize: 15,
        color: "black",
    }

});
export default AttendanceCard;