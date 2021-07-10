import { Alert } from "react-native";

module.exports = async function login(username, password) {
    try {
        // Set request options
        const fetchOptions = {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
            mode: 'corse',
            body: JSON.stringify({
                username: username,
                password: password
            })
        };

        // Send request
        const res = await fetch(`http://10.0.2.2:6000/api/login`, fetchOptions);

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