import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, time: '2024-10-16 09:30 AM', text: 'Your investment has been updated.', read: false },
    { id: 2, time: '2024-10-15 04:15 PM', text: 'Transaction successful.', read: false },
    { id: 3, time: '2024-10-15 01:00 PM', text: 'Savings plan updated.', read: false },
    // More notifications...
  ]);

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'} Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      {/* List of Recent Notifications */}
      <View style={styles.notificationList}>
        <Text style={styles.sectionTitle}>Recent Notifications</Text>
        {notifications.map(notification => (
          <View key={notification.id} style={styles.notificationItem}>
            <Text style={styles.notificationTime}>{notification.time}</Text>
            <Text style={styles.notificationText}>{notification.text}</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.clearButton} onPress={clearAllNotifications}>
          <Text style={styles.buttonText}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.markReadButton} onPress={markAllAsRead}>
          <Text style={styles.buttonText}>Mark All as Read</Text>
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
  notificationList: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  notificationTime: {
    fontSize: 14,
    color: '#888',
  },
  notificationText: {
    fontSize: 16,
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  clearButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  markReadButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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

export default NotificationsScreen;
