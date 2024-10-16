import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen'; // Added OnboardingScreen import
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import TransactionHistoryScreen from './screens/TransactionHistoryScreen';
import RoundUpSettingsScreen from './screens/RoundUpSettingsScreen';
import SavingsGoalsScreen from './screens/SavingsGoalsScreen';
import InvestmentOptionsScreen from './screens/InvestmentOptionsScreen';
import PerformanceAnalyticsScreen from './screens/PerformanceAnalyticsScreen';
import CommunityForumScreen from './screens/CommunityForumScreen';
import ProfileScreen from './screens/ProfileScreen';
import EducationalResourcesScreen from './screens/EducationalResourcesScreen';
import SettingsScreen from './screens/SettingsScreen';
import PremiumFeaturesScreen from './screens/PremiumFeaturesScreen';
import NotificationsScreen from './screens/NotificationsScreen';

// Create a Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
          options={{ headerShown: false }} // Hide header for onboarding
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{ title: 'Sign Up' }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="TransactionHistory" 
          component={TransactionHistoryScreen} 
          options={{ title: 'Transaction History' }} 
        />
        <Stack.Screen 
          name="RoundUpSettings" 
          component={RoundUpSettingsScreen} 
          options={{ title: 'Round-Up Settings' }} 
        />
        <Stack.Screen 
          name="SavingsGoals" 
          component={SavingsGoalsScreen} 
          options={{ title: 'Savings Goals' }} 
        />
        <Stack.Screen 
          name="InvestmentOptions" 
          component={InvestmentOptionsScreen} 
          options={{ title: 'Investment Options' }} 
        />
        <Stack.Screen 
          name="PerformanceAnalytics" 
          component={PerformanceAnalyticsScreen} 
          options={{ title: 'Performance Analytics' }} 
        />
        <Stack.Screen 
          name="CommunityForum" 
          component={CommunityForumScreen} 
          options={{ title: 'Community Forum' }} 
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Profile' }} 
        />
        <Stack.Screen 
          name="EducationalResources" 
          component={EducationalResourcesScreen} 
          options={{ title: 'Educational Resources' }} 
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'Settings' }} 
        />
        <Stack.Screen 
          name="PremiumFeatures" 
          component={PremiumFeaturesScreen} 
          options={{ title: 'Premium Features' }} 
        />
        <Stack.Screen 
          name="Notifications" 
          component={NotificationsScreen} 
          options={{ title: 'Notifications' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



