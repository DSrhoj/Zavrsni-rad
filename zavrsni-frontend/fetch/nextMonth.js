import { Alert } from "react-native";
import getToken from '../functions/getToken';

module.exports = async function nextMonth() {
    try {
        // Set request options
        const fetchOptions = {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await getToken()
            },
            mode: 'corse',
        };

        // Send request
        const res = await fetch(`http://10.0.2.2:6000/api/nextMonth`, fetchOptions);

        // Check if request was successful
        if (res.status == 200) {
            // Request successfull
            return 0;
        }
        else {
            // Request failed
            return null;
        }
        
    } catch (error) {
        // Error in fetching data
        Alert.alert(error.message)
    }
}
