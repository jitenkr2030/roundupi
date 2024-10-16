import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const buttonAnimation = useRef(new Animated.Value(1)).current;
  const opacityAnimation = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const fadeInOut = () => {
    Animated.sequence([
      Animated.timing(opacityAnimation, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = (screen) => {
    animateButton();
    fadeInOut();
    setTimeout(() => {
      navigation.navigate(screen);
    }, 200); // Slight delay to complete animation
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to the Dashboard</Text>
      </View>

      {/* Quick Navigation Buttons */}
      {renderButtonRows([
        { title: 'Transaction History', icon: <MaterialIcons name="attach-money" size={24} color="white" />, screen: 'TransactionHistory', color: '#FF5722' },
        { title: 'Round-Up Settings', icon: <Ionicons name="ios-settings" size={24} color="white" />, screen: 'RoundUpSettings', color: '#4CAF50' },
        { title: 'Savings Goals', icon: <Ionicons name="ios-pie-chart" size={24} color="white" />, screen: 'SavingsGoals', color: '#009688' },
        { title: 'Investment Options', icon: <FontAwesome name="line-chart" size={24} color="white" />, screen: 'InvestmentOptions', color: '#3F51B5' },
        { title: 'Performance Analytics', icon: <FontAwesome name="bar-chart" size={24} color="white" />, screen: 'PerformanceAnalytics', color: '#FFC107' },
        { title: 'Community Forum', icon: <Ionicons name="ios-people" size={24} color="white" />, screen: 'CommunityForum', color: '#9C27B0' },
        { title: 'Educational Resources', icon: <Ionicons name="ios-book" size={24} color="white" />, screen: 'EducationalResources', color: '#00BCD4' },
        { title: 'Profile', icon: <Ionicons name="ios-person" size={24} color="white" />, screen: 'Profile', color: '#E91E63' },
        { title: 'Premium Features', icon: <MaterialIcons name="star" size={24} color="white" />, screen: 'PremiumFeatures', color: '#FF9800' },
        { title: 'Notifications', icon: <Ionicons name="ios-notifications" size={24} color="white" />, screen: 'Notifications', color: '#607D8B' },
        { title: 'Settings', icon: <Ionicons name="ios-settings" size={24} color="white" />, screen: 'Settings', color: '#795548' },
      ], handlePress)}
    </ScrollView>
  );
};

// Renders the buttons in rows
const renderButtonRows = (buttons, handlePress) => {
  return buttons.reduce((acc, button, index) => {
    if (index % 2 === 0) {
      const buttonRow = (
        <View style={styles.buttonRow} key={index}>
          <AnimatedButton {...button} onPress={() => handlePress(button.screen)} />
          {buttons[index + 1] && <AnimatedButton {...buttons[index + 1]} onPress={() => handlePress(buttons[index + 1].screen)} />}
        </View>
      );
      acc.push(buttonRow);
    }
    return acc;
  }, []);
};

const AnimatedButton = ({ title, icon, onPress, color }) => {
  const buttonAnimation = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: buttonAnimation }], flex: 1 }}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        onPress={() => {
          animateButton();
          onPress();
        }}
      >
        <Text style={styles.buttonText}>{title}</Text>
        {icon}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;











