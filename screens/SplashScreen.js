import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // Transition to the next screen after 3 seconds
      setTimeout(() => {
        navigation.navigate('Login');
      }, 3000);
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.tagline}>Save Smart, Invest Wisely</Text>
      </Animated.View>
      <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  loadingContainer: {
    marginTop: 20,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default SplashScreen;