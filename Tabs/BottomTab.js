import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

// Import your screens here
import HomePage from '../Screens/HomePage';
import UserProfile from '../Screens/UserProfile';
import SearchPage from '../Screens/SearchPage';
import HistoryPage from '../Screens/HistoryPage';
import LoginPage from '../Screens/LoginPage';

const Tab = createBottomTabNavigator();

// Define an array of tab screens with their respective components and icon names
const TabScreens = [
  { name: 'Home', component: HomePage, iconName: 'home' },
  { name: 'Profile', component: UserProfile, iconName: 'user' },
  { name: 'Search', component: SearchPage, iconName: 'search' },
  { name: 'History', component: HistoryPage, iconName: 'dollar-sign' },
  { name: 'Login', component: LoginPage, iconName: 'log-out' },
];

// Define the TabNavigator component that renders the bottom tab navigation
const TabNavigator = () => {
  return (
      <Tab.Navigator 
        initialRouteName="Login" 
        screenOptions={{
          // Additional tabBar options can be added here if needed
        }}
      >
        {/* Dynamically generate Tab.Screen components based on TabScreens array */}
        {TabScreens.map((screen, index) => (
          <Tab.Screen
            key={index} 
            name={screen.name} 
            component={screen.component} 
            options={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => (
                <Feather 
                  name={screen.iconName} 
                  size={25} 
                  color={focused ? 'orange' : 'black'} 
                />
              ),
              headerShown: false, 
            })}
          />
        ))}
      </Tab.Navigator>
  );
};

export default TabNavigator;
