import AsyncStorage from '@react-native-async-storage/async-storage';

module.exports = async function getToken() {
    try {
        // Get token form async storage
        const value = await AsyncStorage.getItem('@auth_token');

        // Check if token exists
        if (!value) {
            // Token does not exist
            console.log("Token does not exist!");
            return null;
        }
        // Token exists
        return value;
    } catch (error) {
        // Error geting token from async storage
        console.log("Error geting token from async storage");
    }
}