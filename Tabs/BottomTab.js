import React from 'react';
import HomePage from '../Screens/HomePage';
import LoginPage from '../Screens/LoginPage';
import UserProfile from '../Screens/UserProfile';
import SearchPage from '../Screens/SearchPage';
import HistoryPage from '../Screens/HistoryPage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';


/*
/In order to see whatever new screen you're working on, you need to add it here.
/Import the screen at the top of the file, then add it down below.
/If you google feather icons in react native, you can find a list of icons to use if you want to be special :)
*/



const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    //<NavigationContainer>

        <Tab.Navigator 
        initialRouteName="Logout"
        screenOptions={{
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray'
        }}>
            <Tab.Screen name="Home" component={HomePage} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Feather 
                        name={'home'}
                        size={25}
                        color={focused ? 'orange' : 'black'} />)
            }}/>
            <Tab.Screen name="Profile" component={UserProfile} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Feather 
                        name={'user'}
                        size={25}
                        color={focused ? 'orange' : 'black'} />)
            
            }} />
            <Tab.Screen name="Search" component={SearchPage} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Feather 
                        name={'search'}
                        size={25}
                        color={focused ? 'orange' : 'black'} />)
            
            }} />
            <Tab.Screen name="History" component={HistoryPage} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Feather 
                        name={'dollar-sign'}
                        size={25}
                        color={focused ? 'orange' : 'black'} />)
            
            }} />
            <Tab.Screen name="Logout" component={LoginPage} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Feather 
                        name={'log-out'}
                        size={25}
                        color={focused ? 'orange' : 'black'} />)
            
            }} />
            
        </Tab.Navigator>
    //</NavigationContainer>
  );
}

export default Tabs;