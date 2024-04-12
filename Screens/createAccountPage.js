import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// Define the CreateAccountPage component
const CreateAccountPage = ({ navigation }) => {
  // Define state variables for user inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [jobRole, setJobRole] = useState('');

  // Function to handle the creation of an account
  const handleCreateAccount = () => {
    // Logic to create the account goes here
    // For now, just navigate back to the login page
    navigation.goBack();
  };

  // Render the component
  return (
    <View style={styles.container}>
      {/* Email input field */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      
      {/* Password input field */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Hide password input
      />
      
      {/* Full name input field */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={name}
        onChangeText={setName}
      />

      {/* Date of birth input field */}
      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your date of birth"
        value={dob}
        onChangeText={setDob}
      />

      {/* Address input field */}
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />

      {/* Job role input field */}
      <Text style={styles.label}>Job Role</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your job role"
        value={jobRole}
        onChangeText={setJobRole}
      />

      {/* Button to create account */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
        <Text style={styles.createButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#ef8833',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateAccountPage;
