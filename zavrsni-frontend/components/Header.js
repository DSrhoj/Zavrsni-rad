import React from 'react';
import { Appbar, Provider } from 'react-native-paper';

const Header = (props) => {

    return (
        <Appbar.Header>
            <Appbar.Content title={props.title} />
        </Appbar.Header>
    );
};

export default Header;
