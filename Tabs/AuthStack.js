// AuthStack.js or AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../Screens/LoginPage';
import CreateAccountPage from '../Screens/createAccountPage';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login" headerMode="none">
    <Stack.Screen name="Login" component={LoginPage} />
    <Stack.Screen name="CreateAccount" headerMode="none" component={CreateAccountPage} />
  </Stack.Navigator>
);

export default AuthStack;
