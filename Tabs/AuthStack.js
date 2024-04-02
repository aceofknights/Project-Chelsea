import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../Screens/LoginPage';
import CreateAccountPage from '../Screens/createAccountPage';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginPage} />
    <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
  </Stack.Navigator>
);

export default AuthStack;
