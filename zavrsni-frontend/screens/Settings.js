import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import SettingsList from 'react-native-settings-list';
import Header from '../components/Header';
import { logout } from '../fetch';
import { removeToken } from '../functions';


import { useUserUpdate } from '../components/UserContex';

const Settings = props => {

    const userUpdate = useUserUpdate();

    const handleLogOut = async () => {
        let res = await logout();
        if (res) {
            userUpdate(null);
            removeToken();
        }
    }

    return (
        <View style={styles.container}>
            <Header title={'Settings'} />
            <SettingsList borderColor="#6200EE">
                <SettingsList.Header headerStyle={styles.header} />
                <SettingsList.Item
                    title='Dodaj polaznika'
                    onPress={() => Alert.alert('Dodan!')}
                />
                <SettingsList.Item
                    title='Dark theme'
                    hasSwitch={true}
                    hasNavArrow={false}
                    switchOnValueChange={() => Alert.alert('Upaljen dark mode je, je')}
                />
                <SettingsList.Item
                    title='Grupa postavki'
                    onPress={() => Alert.alert('Neka grupa postavki')}
                />
                <SettingsList.Header headerStyle={{ ...styles.header, marginTop: 0 }} />
                <SettingsList.Item
                    title='Račun'
                    hasNavArrow={false}
                    borderHide="Both"
                    titleStyle={styles.title}
                />
                <SettingsList.Item title='Security' />
                <SettingsList.Item
                    title='Log Out'
                    hasNavArrow={false}
                    onPress={handleLogOut}
                />

            </SettingsList>
        </View>
    );
}
//
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "#f6f6f6",
    },

    header: {
        //backgroundColor: "#6200EE",
        //color: '#6200EE',
        marginTop: 10,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#6200EE',
    }

});

export default Settings;