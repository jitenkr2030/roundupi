import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import

const SettingsScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language
  const [locationAccess, setLocationAccess] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'} Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Language Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language Preferences</Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
          {/* Add more languages as needed */}
        </Picker>
      </View>

      {/* Privacy Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Settings</Text>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Allow Location Access</Text>
          <Switch
            value={locationAccess}
            onValueChange={() => setLocationAccess((previous) => !previous)}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Data Sharing Preferences</Text>
          <Switch
            value={dataSharing}
            onValueChange={() => setDataSharing((previous) => !previous)}
          />
        </View>
      </View>

      {/* Help and Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help and Support</Text>
        <Button title="FAQs" onPress={() => alert('FAQs')} />
        <Button title="Contact Support" onPress={() => alert('Contact Support')} />
      </View>

      {/* Legal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal Information</Text>
        <TouchableOpacity onPress={() => alert('Terms and Conditions')}>
          <Text style={styles.link}>Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Privacy Policy')}>
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      {/* Optional Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => alert('Go to Home')}>
          <Text style={styles.footerLink}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Go to Profile')}>
          <Text style={styles.footerLink}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Go to Transactions')}>
          <Text style={styles.footerLink}>Transactions</Text>
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
  picker: {
    height: 50,
    width: '100%',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  toggleLabel: {
    fontSize: 16,
  },
  link: {
    color: '#007BFF',
    marginVertical: 5,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  footerLink: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default SettingsScreen;

