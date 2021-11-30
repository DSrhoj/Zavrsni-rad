import { Alert } from "react-native";
import { getToken } from '../functions';

module.exports = async function getEvents() {
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
        const res = await fetch(`http://10.0.2.2:6000/api/getEvents`, fetchOptions);

        // Check if request was successful
        if (res.status == 200) {
            // Request successfull
            const data = await res.json();
            // console.log(data);
            return data;
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
