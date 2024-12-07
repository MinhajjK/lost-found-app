import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Ionicons package

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
      console.log('Sign In button pressed');

      if (!email || !password) {
          Alert.alert('Error', 'Please enter both email and password');
          return;
      }

      try {
          const response = await fetch('http://192.168.0.114:5000/login', { // Update with your server IP address
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }),
          });

          const data = await response.json();
          console.log('Response from server:', data);

          if (!response.ok) {
              Alert.alert('Error', data.message || 'Login failed');
              return;
          }

          if (response.status === 200) {
              Alert.alert('Success', data.message || 'Login successful');
              navigation.navigate('HomePage'); // Navigate to HomePage after successful login
          }
      } catch (error) {
          console.error('Error during login:', error);
          Alert.alert('Error', 'Something went wrong. Please try again.');
      }
  };

  return (
      <View style={styles.container}>
          <Text style={styles.title}>Sign in</Text>

          <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
          />

          <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
          />

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
              <Text style={styles.signInButtonText}>SIGN IN</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't Have An Account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
          </View>

          <View style={styles.socialIconsContainer}>
              <Icon name="logo-facebook" size={35} color="blue" style={styles.socialIcon} />
              <Icon name="logo-twitter" size={35} color="#1DA1F2" style={styles.socialIcon} />
              <Icon name="logo-google" size={35} color="red" style={styles.socialIcon} />
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#fff',
  },
  title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
  },
  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 15,
      borderRadius: 50,
      paddingLeft: 40,
      fontSize: 16,
  },
  forgotPassword: {
      color: 'red',
      textAlign: 'right',
      marginBottom: 20,
  },
  signInButton: {
      backgroundColor: '#3b0b40',
      padding: 15,
      borderRadius: 30,
      alignItems: 'center',
      marginBottom: 20,
  },
  signInButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
  },
  signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
  },
  signupText: {
      color: '#000',
  },
  signupLink: {
      color: 'red',
      marginLeft: 5,
  },
  socialIconsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
  },
});

export default LoginScreen;