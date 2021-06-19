import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import Input from '../components/Input'
import { login } from '../fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser, useUserUpdate } from '../components/UserContex';

const LoginScreen = props => {

    useEffect(() => {
        const eventSubscription = Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            eventSubscription.remove();
        };
    }, []);

    const _keyboardDidHide = (e) => {
        Keyboard.dismiss();
    };

    // Variables from user context
    const userUpdate = useUserUpdate();
    const user = useUser();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handlePotvrdi = async () => {
        // Hide keyboard if login was pressed
        Keyboard.dismiss;

        // Send login request
        let data = await login(username, password);

        // Check if res != null, else authentication failed
        if (data) {
            // Authentication successful

            // Storing JWT to async storage
            try {
                await AsyncStorage.setItem('@auth_token', data.token)
            } catch (error) {
                // Storing JWT to async storage failed
                console.log('Error storing token');
            }

            // JWT stored to async storage successfully
            // Setting login data to display for user
            userUpdate(data);
        }
    
        // If something was wrong
        else {
            Alert.alert('Login failed!');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logInTitle}>
                <Text style={styles.logInText}>LogIn</Text>
            </View>
            <View style={styles.inputs}>
                <Input label="Username" text={username} setText={setUsername} />
                <Input label="Password" text={password} setText={setPassword} isPassword={true} />
            </View>
            <TouchableHighlight style={styles.button} onPress={handlePotvrdi} activeOpacity={0.65}>
                <View style={styles.buttonViewLogin}>
                    <Text style={styles.buttonText}>Log in</Text>
                </View>
            </TouchableHighlight>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logInTitle: {
        height: 110,
        paddingBottom: 30,
        width: "100%",
    },
    logInText: {
        color: "#39C426",
        fontSize: 60,
        textShadowColor: "gray",
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 7,
        fontWeight: 'bold',
        width: "100%",
        height: "100%",
        textAlign: 'center',
    },
    inputs: {
        width: "75%",
        height: 200,
        justifyContent: 'center',
    },
    button: {
        height: 50,
        width: 130,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "gray",
        shadowRadius: 8,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        elevation: 10,
    },
    buttonViewLogin: {
        height: 50,
        width: 130,
        backgroundColor: '#39C426',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f6f6f6',
    },
});

export default LoginScreen;