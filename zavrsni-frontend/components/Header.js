import React, { useState } from 'react';
import { Appbar, Provider } from 'react-native-paper';

const Header = (props) => {

    const title = props.title !== undefined ? props.title : props.scene.descriptor.options.headerTitle;

    return (
        <Appbar.Header>
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
};

export default Header;
