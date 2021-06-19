import AsyncStorage from '@react-native-async-storage/async-storage';

module.exports = async function removeToken() {
    try {
        // Remove token form async storage
        await AsyncStorage.removeItem('@auth_token');

    } catch (error) {
        // Error geting token from async storage
        console.log("Error geting token from async storage");
    }
}

