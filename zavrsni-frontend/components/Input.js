import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const Input = (props) => {

    return (
        <View style={styles.container}>
            <TextInput
                label={props.label}
                value={props.text}
                onChangeText={text => props.setText(text)}
                mode="outlined"
                style={styles.input}
                secureTextEntry={props.isPassword == true ? props.isPassword : false}
                selectionColor="#94C9C4"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: "100%",
    },
});

export default Input;