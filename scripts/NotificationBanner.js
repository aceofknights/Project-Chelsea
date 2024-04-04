import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationBanner = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show the banner if message is not empty
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose(); // Close the banner after a certain time
      }, 3000); // 3 seconds duration

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!visible) {
    return null; // Don't render anything if banner is not visible
  }

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    alignItems: 'center',
  },
  message: {
    color: 'white',
  },
});

export default NotificationBanner;
