import React, { useState } from 'react';
import { Text } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import SLIIcon from 'react-native-vector-icons/SimpleLineIcons';
import Schedule from '../screens/Schedule';
import Attendance from '../screens/Attendance';
import Settings from '../screens/Settings';


const Navigation = (props) => {

    const scheduleRoute = Schedule;

    const attendanceRoute = Attendance;

    const settingsRoute = Settings;

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'schedule', title: 'Schedule', icon: (props) => <FAIcon {...props} name='calendar' /> },
        { key: 'attendance', title: 'Attendance', icon: (props) => <SLIIcon {...props} name='pie-chart' /> },
        { key: 'settings', title: 'Settings', icon: (props) => <SLIIcon {...props} name='settings' /> },
    ]);

    const handleIndexChange = (index) => {
        setIndex(index);
    };

    const renderScene = BottomNavigation.SceneMap({
        schedule: scheduleRoute,
        attendance: attendanceRoute,
        settings: settingsRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={handleIndexChange}
            renderScene={renderScene}
            shifting={true}
        />
    );
};

export default Navigation;