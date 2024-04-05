import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

//hooks for allowing values to be updated on screen
//the useState hook allows the app to rerender something when an event happens
export default function LoginPage({ navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  //function is called when login button it pressed
  function handleLogin({}) {
    // Implement login functionality here
    navigation.navigate('Home')
    console.log('Logging in with email:', email, 'and password:', password);
  };  

  

  function handleAccount({}) {
    navigation.navigate('CreateAccountPage') // Navigate to CreateAccountPage

  }

   // this looks different but this is just another way to do a function it works just like the one above but is called when forgot email is clicked
  const handleForgotEmail = () => {
    Alert.alert('Forgot Email', 'Please contact support for assistance with your email.');
    console.log('Forgot Email', 'Please contact support for assistance with your email.');

  };

  //see above
  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Please check your email for instructions on resetting your password.');
    console.log('Forgot Password', 'Please check your email for instructions on resetting your password.');

  };


  //the <view></view> tags work just like <div></div> tags in html
  //wrapping items in view tags and giving them a style make them easy to add style to
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Project Chelsea</Text>
      <Text style={styles.slogan}>Shift the way you work</Text>

      <Image
        source={require('../assets/dog picture.png')}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.eyeIconContainer} onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={24} color="#777" />
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButton} onPress={handleAccount}>
          <Text style={styles.accountButtonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotButton} onPress={handleForgotEmail}>
          <Text style={styles.forgotButtonText}>Forgot Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotButton} onPress={handleForgotPassword}>
          <Text style={styles.forgotButtonText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF4F0', // seashell
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
    borderRadius: 400,
    marginRight: 10,
    borderWidth: 5,
    borderColor: '#331507',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0e4fdb', //byzantine blue
    fontFamily: 'serif',

  },
  slogan: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0e4fdb', //byzantine blue
    fontStyle: 'italic',
    fontFamily: 'serif',

  },
  inputContainer: {
    width: '80%',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#331507', //black bean even tho its brown
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    width: '100%',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  loginButton: {
    backgroundColor: '#ef8833', //orange
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#331507',
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountButton: {
    backgroundColor: '#ef8833',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  accountButtonText: {
    color: '#331507',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotButton: {
    alignItems: 'center',
    marginBottom: 10,
  },
  forgotButtonText: {
    color: '#0e4fdb',
    fontSize: 16,
  },
});

