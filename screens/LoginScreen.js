import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Add login logic here (e.g., authentication API call)
    console.log('Logging in with:', { email, password });

    // Simulating successful login
    if (email && password) {
      navigation.replace('Home'); // Navigate to Home Screen after successful login
    }
  };

  return (
    <LinearGradient colors={['#6200EE', '#A56DFF']} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Welcome Back</Text>

        <TextInput
          style={styles.input}
          placeholder="Email or Phone Number"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#fff"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.togglePassword}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.loginButton,
            { backgroundColor: email && password ? '#4CAF50' : 'rgba(255,255,255,0.3)' },
          ]}
          onPress={handleLogin}
          disabled={!email || !password}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <Text style={styles.dividerText}>Or sign in with</Text>
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="google" size={20} color="#fff" />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="facebook" size={20} color="#fff" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpLink}>Don’t have an account? Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  passwordContainer: {
    position: 'relative',
  },
  togglePassword: {
    position: 'absolute',
    right: 20,
    top: 15,
    color: '#fff',
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#fff',
    textDecorationLine: 'underline',
    marginBottom: 30,
  },
  loginButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerText: {
    color: '#fff',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  socialButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  signUpLink: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;



