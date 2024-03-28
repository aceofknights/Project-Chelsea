import React from 'react';
import { View, Text, Button } from 'react-native';

export default function UserProfile({navigation}) {
  return (
    <View>
      <Text>have fun Owen!</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      {/* <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      /> */}
    </View>
  );
}