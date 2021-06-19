import React from 'react';
import LoginScreen from './screens/LoginScreen';
import LoggedOnScreen from './screens/LoggedOnScreen'
import { useUser } from './components/UserContex';

const Index = () => {

    // Get user from provider
    const user = useUser();

    return (
        // If user is saved go to logged on screen, else show login
        user == null ? <LoginScreen /> : <LoggedOnScreen />
    )
}

export default Index;