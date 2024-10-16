import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const PremiumFeaturesScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'} Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Premium Features</Text>
      </View>

      {/* List of Premium Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Unlock Exclusive Features</Text>
        <View style={styles.featureItem}>
          <Text style={styles.featureDescription}>Feature 1: Brief description</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureDescription}>Feature 2: Brief description</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureDescription}>Feature 3: Brief description</Text>
        </View>
        {/* Add more feature items as needed */}
      </View>

      {/* Pricing Plans */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Your Plan</Text>
        <View style={styles.planCard}>
          <Text style={styles.planTitle}>Monthly Plan</Text>
          <Text style={styles.planPrice}>$9.99/month</Text>
          <Text style={styles.featuresIncluded}>Features included:</Text>
          {/* List features here */}
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.buttonText}>Subscribe Now</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.planCard}>
          <Text style={styles.planTitle}>Annual Plan</Text>
          <Text style={styles.planPrice}>$99.99/year</Text>
          <Text style={styles.featuresIncluded}>Features included:</Text>
          {/* List features here */}
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.buttonText}>Subscribe Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Free Trial Offer */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Try Premium for Free!</Text>
        <Text style={styles.freeTrialDescription}>Start your 7-day free trial today!</Text>
        <TouchableOpacity style={styles.freeTrialButton}>
          <Text style={styles.buttonText}>Start Free Trial</Text>
        </TouchableOpacity>
      </View>

      {/* Optional Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => alert('Go to Home')}>
          <Text style={styles.footerLink}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Go to Profile')}>
          <Text style={styles.footerLink}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Go to Settings')}>
          <Text style={styles.footerLink}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    color: '#007BFF',
    fontSize: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featureItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  featureDescription: {
    fontSize: 16,
  },
  planCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 18,
    color: '#007BFF',
  },
  featuresIncluded: {
    marginVertical: 5,
  },
  subscribeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  freeTrialDescription: {
    marginVertical: 5,
  },
  freeTrialButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  footerLink: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default PremiumFeaturesScreen;
