import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Linking } from 'react-native';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    // Implement sign-up logic here
    console.log('Signing up with:', { name, emailOrPhone, password, confirmPassword, termsAccepted });
  };

  const handleTermsAndConditions = () => {
    // Open the Terms and Conditions in a modal or new screen
    Linking.openURL('https://example.com/terms-and-conditions');
  };

  const isSignUpButtonDisabled = () => {
    return !name || !emailOrPhone || !password || !confirmPassword || !termsAccepted;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <TextInput
        style={styles.inputField}
        placeholder="Enter Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.inputField}
        placeholder="Enter Email or Phone Number"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Enter Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.passwordToggle}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Text style={styles.passwordToggle}>
            {showConfirmPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setTermsAccepted(!termsAccepted)}
        >
          <View style={[styles.checkbox, termsAccepted && styles.checkedCheckbox]} />
          <Text style={styles.termsText}>I agree to the Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTermsAndConditions}>
          <Text style={styles.termsLink}>Terms and Conditions</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.signUpButton, isSignUpButtonDisabled() && styles.disabledButton]}
        disabled={isSignUpButtonDisabled()}
        onPress={handleSignUp}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log('Navigate to Login Screen')}>
        <Text style={styles.loginLink}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputField: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  passwordToggle: {
    marginLeft: 8,
    color: '#007AFF',
  },
  termsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
  },
  checkedCheckbox: {
    backgroundColor: '#007AFF',
  },
  termsText: {
    fontSize: 16,
  },
  termsLink: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  signUpButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;