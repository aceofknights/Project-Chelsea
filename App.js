import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs/BottomTab'; // Assuming Tabs contains the bottom tab navigator
import 'react-native-gesture-handler';
import Auth from './Tabs/AuthStack'
// Import your screens here
import CreateAccountPage from './Screens/createAccountPage';
import LoginPage from './Screens/LoginPage'; // Make sure to import LoginPage as well

export default function App(){
  return (
    <Auth />
  )
}
