import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons

const TransactionHistoryScreen = ({ navigation }) => {
    const [transactions, setTransactions] = useState([
        { id: '1', date: '2024-10-10', type: 'Round-Up', amount: 4.5, roundUpAmount: 0.5 },
        { id: '2', date: '2024-10-11', type: 'Savings', amount: 100, roundUpAmount: 0 },
        { id: '3', date: '2024-10-12', type: 'Investment', amount: 50, roundUpAmount: 0 },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);
    const buttonScale = new Animated.Value(1);

    const filterTransactions = () => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = transactions.filter(transaction =>
            transaction.type.toLowerCase().includes(lowerCaseQuery) ||
            transaction.date.includes(lowerCaseQuery)
        );
        setFilteredTransactions(filtered);
    };

    const handlePressIn = () => {
        Animated.spring(buttonScale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(buttonScale, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    const renderTransactionItem = ({ item }) => (
        <TouchableOpacity
            style={styles.transactionRow}
            onPress={() => navigation.navigate('TransactionDetails', { transactionId: item.id })}
        >
            <Text style={styles.transactionDate}>{item.date}</Text>
            <Text style={styles.transactionType}>{item.type}</Text>
            <Text style={styles.transactionAmount}>${item.amount.toFixed(2)}</Text>
            {item.type === 'Round-Up' && (
                <Text style={styles.roundUpAmount}>Round-Up: ${item.roundUpAmount.toFixed(2)}</Text>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Transaction History</Text>
            </View>

            <View style={styles.filterSection}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Transactions"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={filterTransactions}
                />
                <Animated.View style={[styles.applyFiltersButton, { transform: [{ scale: buttonScale }] }]}>
                    <TouchableOpacity
                        onPress={filterTransactions}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                    >
                        <Text style={styles.applyFiltersButtonText}>Apply Filters</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            <FlatList
                data={filteredTransactions}
                renderItem={renderTransactionItem}
                keyExtractor={item => item.id}
                style={styles.transactionList}
                ListEmptyComponent={<Text style={styles.emptyMessage}>No transactions found.</Text>}
            />

            <View style={styles.navigationBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.navItem}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
                    <Text style={styles.navItem}>Transactions</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.navItem}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Text style={styles.navItem}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        elevation: 2,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
        flex: 1,
        textAlign: 'center',
    },
    filterSection: {
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 8,
    },
    applyFiltersButton: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 3,
    },
    applyFiltersButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    transactionList: {
        paddingHorizontal: 16,
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 8,
        elevation: 2,
    },
    transactionDate: {
        flex: 1,
    },
    transactionType: {
        flex: 1,
    },
    transactionAmount: {
        flex: 1,
        textAlign: 'right',
    },
    roundUpAmount: {
        color: 'green',
        fontStyle: 'italic',
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    navItem: {
        fontWeight: 'bold',
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontStyle: 'italic',
    },
});

export default TransactionHistoryScreen;


