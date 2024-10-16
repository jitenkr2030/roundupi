import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Switch, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const RoundUpSettingsScreen = ({ navigation }) => {
    const [roundingType, setRoundingType] = useState('nearest');
    const [customAmount, setCustomAmount] = useState('');
    const [toggleAbove100, setToggleAbove100] = useState(false);
    const [investmentOptions, setInvestmentOptions] = useState({
        mutualFunds: false,
        savingsAccount: false,
        other: false,
        selectedFund: '',
    });
    const [transferFrequency, setTransferFrequency] = useState('daily');

    const handleSaveSettings = () => {
        // Handle the save logic here
        Alert.alert('Settings Saved Successfully');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Round-Up Settings</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>{'< Back'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Rounding Rules</Text>
                <View style={styles.option}>
                    <TouchableOpacity onPress={() => setRoundingType('nearest')}>
                        <Text style={styles.radioButton}>{roundingType === 'nearest' ? '•' : '○'} Nearest Rupee</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setRoundingType('custom')}>
                        <Text style={styles.radioButton}>{roundingType === 'custom' ? '•' : '○'} Custom Amount</Text>
                    </TouchableOpacity>
                    {roundingType === 'custom' && (
                        <TextInput
                            style={styles.input}
                            placeholder="₹____"
                            value={customAmount}
                            keyboardType="numeric"
                            onChangeText={setCustomAmount}
                        />
                    )}
                </View>
                <View style={styles.toggleContainer}>
                    <Text>Round up only above ₹100</Text>
                    <Switch value={toggleAbove100} onValueChange={setToggleAbove100} />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Choose Investment Options</Text>
                <View style={styles.option}>
                    <TouchableOpacity onPress={() => setInvestmentOptions({ ...investmentOptions, mutualFunds: !investmentOptions.mutualFunds })}>
                        <Text style={styles.checkbox}>{investmentOptions.mutualFunds ? '☑' : '☐'} Mutual Funds</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setInvestmentOptions({ ...investmentOptions, savingsAccount: !investmentOptions.savingsAccount })}>
                        <Text style={styles.checkbox}>{investmentOptions.savingsAccount ? '☑' : '☐'} Savings Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setInvestmentOptions({ ...investmentOptions, other: !investmentOptions.other })}>
                        <Text style={styles.checkbox}>{investmentOptions.other ? '☑' : '☐'} Other (e.g., Digital Gold, Stocks)</Text>
                    </TouchableOpacity>
                </View>
                {investmentOptions.mutualFunds && (
                    <TextInput
                        style={styles.input}
                        placeholder="Select Fund"
                        value={investmentOptions.selectedFund}
                        onChangeText={text => setInvestmentOptions({ ...investmentOptions, selectedFund: text })}
                    />
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Transfer Frequency</Text>
                <View style={styles.option}>
                    <TouchableOpacity onPress={() => setTransferFrequency('daily')}>
                        <Text style={styles.radioButton}>{transferFrequency === 'daily' ? '•' : '○'} Daily</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTransferFrequency('weekly')}>
                        <Text style={styles.radioButton}>{transferFrequency === 'weekly' ? '•' : '○'} Weekly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTransferFrequency('monthly')}>
                        <Text style={styles.radioButton}>{transferFrequency === 'monthly' ? '•' : '○'} Monthly</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
                <Text style={styles.saveButtonText}>Save Settings</Text>
            </TouchableOpacity>

            {/* Optional Navigation Bar */}
            <View style={styles.navigationBar}>
                <Text style={styles.navItem}>Home</Text>
                <Text style={styles.navItem}>Transactions</Text>
                <Text style={styles.navItem}>Profile</Text>
                <Text style={styles.navItem}>Settings</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    backButton: {
        fontSize: 16,
        color: 'blue',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    option: {
        marginBottom: 10,
    },
    radioButton: {
        fontSize: 16,
        marginVertical: 5,
    },
    checkbox: {
        fontSize: 16,
        marginVertical: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    navItem: {
        fontSize: 16,
    },
});

export default RoundUpSettingsScreen;
