import login from './login';
import logout from './logout';
import getEvents from './getEvents';

module.exports = {
    login: login,
    logout: logout,
    getEvents: getEvents,
}
// import { Alert } from "react-native";

// const login = async (username, password) => {
//     try {
//         // Set request options
//         const fetchOptions = {
//             method: 'POST',
//             headers: {
//                 "Accept": "application/json",
//                 'Content-Type': 'application/json',
//             },
//             mode: 'corse',
//             body: JSON.stringify({
//                 username: username,
//                 password: password,
//             })
//         };

//         // Send request
//         const res = await fetch(`http://10.0.2.2:6000/api/login`, fetchOptions);

//         // Check if request was successful
//         if (res.status == 200) {
//             // Request successfull
//             const data = await res.json();
//             // console.log(data);
//             return data;
//         }
//         // Check if access was forbidden
//         else if (res.status == 403) {
//             return res.status;
//         }
//         else {
//             // Request failed
//             return null;
//         }
//     } catch (error) {
//         // Error in fetching data
//         Alert.alert(error.message)
//     }
// }

// const getEvents = async (token) => {
//     try {
//         // Set request options
//         const fetchOptions = {
//             method: 'GET',
//             headers: {
//                 "Accept": "application/json",
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + token.token
//             },
//             mode: 'corse',
//         };

//         // Send request
//         const res = await fetch(`http://10.0.2.2:6000/api/getEvents`, fetchOptions);

//         // Check if request was successful
//         if (res.status == 200) {
//             // Request successfull
//             const data = await res.json();
//             // console.log(data);
//             return data;
//         }
//         else {
//             // Request failed
//             return null;
//         }
//     } catch (error) {
//         // Error in fetching data
//         Alert.alert(error.message)
//     }
// }

