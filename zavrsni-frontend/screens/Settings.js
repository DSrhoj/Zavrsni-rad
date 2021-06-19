import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useUserUpdate } from '../components/UserContex';
import SettingsList from 'react-native-settings-list';
import Header from '../components/Header';
import { logout } from '../fetch';
import { removeToken } from '../functions';

const Settings = props => {

    // Variables from user context
    const userUpdate = useUserUpdate();

    // Variables from theme context
    const { colors } = useTheme();

    const handleLogOut = async () => {
        // Log out on server
        let res = await logout();
        if (res) {
            // if logout was succsessful remove user and token
            userUpdate(null);
            removeToken();
        }
    }

    return (
        <View style={{ ...styles.container, backgroundColor: colors.background }}>
            <Header title={'Settings'} />
            <SettingsList borderColor={colors.accent}>
                <SettingsList.Header />
                <SettingsList.Item
                    title='Account'
                    hasNavArrow={false}
                    borderHide="Both"
                    titleStyle={{ ...styles.title, color: colors.accent }}
                />
                <SettingsList.Item
                    title='Security'
                />
                <SettingsList.Item
                    title='Log Out'
                    hasNavArrow={false}
                    onPress={handleLogOut}
                />
            </SettingsList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "#f6f6f6",
    },

    title: {
        fontWeight: 'bold',
        fontSize: 20,
    }
});


export default Settings;