import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, StyleSheet } from 'react-native';

const ProfileScreen = () => {
    const [userName, setUserName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@email.com');
    const [phone, setPhone] = useState('+1234567890');
    const [upiAccounts, setUpiAccounts] = useState([{ bankName: 'Bank A', upiId: 'upi@example.com' }]);

    const handleEditProfile = () => {
        // Functionality to edit profile info
        Alert.alert('Edit Profile', 'Functionality to edit profile goes here.');
    };

    const handleChangePassword = () => {
        // Functionality to change password
        Alert.alert('Change Password', 'Functionality to change password goes here.');
    };

    const handleManageNotifications = () => {
        // Functionality to manage notifications
        Alert.alert('Notification Settings', 'Functionality to manage notifications goes here.');
    };

    const handleLinkUPI = () => {
        // Functionality to link new UPI account
        Alert.alert('Link UPI Account', 'Functionality to link new UPI account goes here.');
    };

    const handleUnlinkUPI = (upiId) => {
        // Functionality to unlink UPI account
        Alert.alert('Unlink UPI Account', `Are you sure you want to unlink ${upiId}?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Unlink', onPress: () => setUpiAccounts(upiAccounts.filter(account => account.upiId !== upiId)) },
        ]);
    };

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: () => {
                // Functionality to logout the user
                Alert.alert('Logged out', 'You have been logged out successfully.');
            }},
        ]);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Profile</Text>
                    <TouchableOpacity onPress={() => {/* Navigate back */}}>
                        <Text style={styles.backButton}>{'< Back'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.userInfoSection}>
                    <TouchableOpacity onPress={() => {/* Open upload/change profile picture */}}>
                        <Image style={styles.profilePicture} source={{ uri: 'https://via.placeholder.com/100' }} />
                    </TouchableOpacity>
                    <Text style={styles.userName}>{userName} <TouchableOpacity onPress={handleEditProfile}><Text style={styles.editIcon}>✏️</Text></TouchableOpacity></Text>
                    <Text>Email: {email} <TouchableOpacity onPress={handleEditProfile}><Text style={styles.editIcon}>✏️</Text></TouchableOpacity></Text>
                    <Text>Phone: {phone} <TouchableOpacity onPress={handleEditProfile}><Text style={styles.editIcon}>✏️</Text></TouchableOpacity></Text>
                </View>

                <View style={styles.settingsSection}>
                    <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleManageNotifications}>
                        <Text style={styles.buttonText}>Notification Settings</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.upiSection}>
                    <Text style={styles.sectionTitle}>Manage UPI Accounts</Text>
                    {upiAccounts.map((account, index) => (
                        <View key={index} style={styles.upiAccountRow}>
                            <Text>{account.bankName} - {account.upiId}</Text>
                            <TouchableOpacity onPress={() => handleUnlinkUPI(account.upiId)}>
                                <Text style={styles.unlinkText}>Unlink</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.button} onPress={handleLinkUPI}>
                        <Text style={styles.buttonText}>Link New UPI Account</Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    backButton: {
        fontSize: 16,
        color: 'blue',
    },
    userInfoSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    editIcon: {
        fontSize: 14,
        color: 'blue',
        marginLeft: 5,
    },
    settingsSection: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 5,
        marginVertical: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    upiSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    upiAccountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    unlinkText: {
        color: 'red',
    },
    logoutButton: {
        backgroundColor: '#FF5733',
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default ProfileScreen;
