import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  Button 
} from 'react-native';

// Sample data for investment products
const investmentProducts = [
  {
    id: '1',
    name: 'Equity Mutual Fund',
    description: 'A diversified portfolio of stocks.',
    risk: 'Medium',
    returns: '5-10% annually',
  },
  {
    id: '2',
    name: 'Fixed Deposit',
    description: 'Secure investment with fixed returns.',
    risk: 'Low',
    returns: '4-6% annually',
  },
  {
    id: '3',
    name: 'Government Bonds',
    description: 'Loans to the government with regular interest.',
    risk: 'Low',
    returns: '3-5% annually',
  },
];

// Investment Option Card Component
const InvestmentOptionCard = ({ product, onInvest }) => {
  const riskColor = {
    Low: 'green',
    Medium: 'yellow',
    High: 'red',
  };

  return (
    <View style={styles.card}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={[styles.riskLabel, { backgroundColor: riskColor[product.risk] }]}>
        {product.risk}
      </Text>
      <Text style={styles.expectedReturns}>{product.returns}</Text>
      <TouchableOpacity style={styles.investButton} onPress={() => onInvest(product)}>
        <Text style={styles.investButtonText}>Invest Now</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main Investment Options Screen Component
const InvestmentOptionsScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('All'); // State for filtering products

  const handleInvestNow = (product) => {
    // Navigate to investment details or investment process
    navigation.navigate('InvestmentDetails', { product });
  };

  // Filter investment products (if required)
  const filteredProducts = investmentProducts.filter(product => {
    if (filter === 'All') return true;
    return product.risk === filter;
  });

  const renderItem = ({ item }) => (
    <InvestmentOptionCard product={item} onInvest={handleInvestNow} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>Investment Options</Text>
      
      <View style={styles.filterSortContainer}>
        <Button title="Filter by Low Risk" onPress={() => setFilter('Low')} />
        <Button title="Filter by Medium Risk" onPress={() => setFilter('Medium')} />
        <Button title="Show All" onPress={() => setFilter('All')} />
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No investment products available at this time. Please check back later.</Text>}
      />

      <View style={styles.footer}>
        <Text>Home | Savings | Transactions</Text>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  productList: {
    paddingBottom: 16,
  },
  card: {
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  riskLabel: {
    padding: 4,
    borderRadius: 4,
    color: '#fff',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  expectedReturns: {
    fontSize: 14,
    marginBottom: 8,
  },
  investButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  investButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default InvestmentOptionsScreen;
