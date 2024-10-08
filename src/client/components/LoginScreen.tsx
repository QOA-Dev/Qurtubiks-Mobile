import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../context/AuthProvider';
import { useNavigation } from '@react-navigation/native'; 

const LoginScreen = () => {
  const { loginWithCredentials, loginGoogle } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation(); 

  const handleLogin = async () => {
    try {
      setError(null); 
      await loginWithCredentials(email, password);
      // @ts-ignore
      navigation.navigate('Home'); 
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      await loginGoogle(); 
      // @ts-ignore
      navigation.navigate('Home'); 
    } catch (err) {
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/login-logo.png')}
        style={styles.logo}
      />
      
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <Text style={styles.subText}>
        Don’t have an account? <Text style={styles.createAccount}>Create an account</Text>
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#7B7B7B"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        placeholderTextColor="#7B7B7B"
      />
      <Text style={styles.forgotPassword}>Forgot password?</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Image
        source={require('../../../assets/google.png')}
        style={styles.googleIcon}
      />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>
      <Text style={styles.termsText}>
        By signing up for Qurtuba Online Academy, you agree to our{' '}
        <Text style={styles.linkText}>Terms and Conditions</Text> and{' '}
        <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    color: '#7B7B7B',
    marginBottom: 20,
  },
  createAccount: {
    color: '#EC7F55',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#7B7B7B',
    marginBottom: 20,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#EC7F55',
    borderRadius: 25,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 25,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    marginBottom: 30,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: '#000',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    fontSize: 14,
  },
  termsText: {
    textAlign: 'center',
    color: '#7B7B7B',
    fontSize: 12,
  },
  linkText: {
    color: '#EC7F55',
  },
});

export default LoginScreen;
