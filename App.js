import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs/BottomTab'; // Assuming Tabs contains the bottom tab navigator

// Import your screens here
import CreateAccountPage from './Screens/createAccountPage';
import LoginPage from './Screens/LoginPage'; // Make sure to import LoginPage as well

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccountPage" component={CreateAccountPage} />
        {/* You can add other screens to this stack if needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
