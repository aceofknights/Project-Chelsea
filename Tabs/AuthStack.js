import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; 
import LoginPage from '../Screens/LoginPage';
import CreateAccountPage from '../Screens/createAccountPage';
import HomeScreen from '../Screens/HomePage';
import UserProfile from '../Screens/UserProfile';
import SearchPage from '../Screens/SearchPage';
import HistoryPage from '../Screens/HistoryPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// AuthStack component containing the authentication flow
const AuthStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="CreateAccountPage" component={CreateAccountPage} />
      <Stack.Screen name="HomeScreen" component={HomeTabNavigator} />
      <Stack.Screen name="SearchPage" component={SearchPage} />
      
    </Stack.Navigator>
  </NavigationContainer>
);

// HomeTabNavigator component containing the bottom tab navigation
const HomeTabNavigator = () => (
  <Tab.Navigator 
    initialRouteName="Home" 
    screenOptions={({ route}) => ({
      headerShown: false,

      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = 'home';
            color= focused ? 'orange' : 'black';
            break;
          case 'Activity':
            iconName = 'dollar-sign';
            color= focused ? 'orange' : 'black';
            break;            
          case 'Profile':
            iconName = 'user';
            color= focused ? 'orange' : 'black';
            break;
          default:
            iconName = 'log-in';
        }

        return <Feather name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Activity" component={HistoryPage} />
    <Tab.Screen name="Profile" component={UserProfile} />
  </Tab.Navigator>
);

export default AuthStack;
