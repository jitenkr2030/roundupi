import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Ensure you have this library installed
import { Dimensions } from 'react-native';

// Sample data
const historicalData = [
  { name: 'Equity Mutual Fund', startDate: 'Jan 1, 2024', initialInvestment: 10000, currentValue: 12500, growth: 25 },
  { name: 'Fixed Deposit', startDate: 'Feb 15, 2024', initialInvestment: 15000, currentValue: 15600, growth: 4 },
];

const projectedEarnings = [
  { period: '6 months', value: 18500 },
  { period: '1 year', value: 20000 },
];

const PerformanceAnalyticsScreen = ({ navigation }) => {
  // Sample data for the investment growth graph
  const graphData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [10000, 11000, 12000, 11500, 13000, 15000],
        strokeWidth: 2, // optional
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Performance Analytics</Text>
      </View>

      {/* Investment Growth Graph */}
      <LineChart
        data={graphData}
        width={Dimensions.get('window').width - 40} // 40px padding
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Green color
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={styles.graph}
      />

      {/* Historical Performance Data */}
      <Text style={styles.sectionTitle}>Historical Performance Data</Text>
      <FlatList
        data={historicalData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.dataRow}>
            <Text style={styles.dataCell}>{item.name}</Text>
            <Text style={styles.dataCell}>{item.startDate}</Text>
            <Text style={styles.dataCell}>₹{item.initialInvestment}</Text>
            <Text style={styles.dataCell}>₹{item.currentValue}</Text>
            <Text style={styles.dataCell}>{item.growth}%</Text>
          </View>
        )}
      />

      {/* Projected Earnings Section */}
      <Text style={styles.sectionTitle}>Projected Earnings</Text>
      {projectedEarnings.map((earning, index) => (
        <Text key={index} style={styles.projectionText}>
          Projected Portfolio Value in {earning.period}: ₹{earning.value}
        </Text>
      ))}

      {/* Optional Performance Summary Section */}
      <Text style={styles.sectionTitle}>Performance Summary</Text>
      <Text style={styles.summaryText}>Total Investment: ₹25,000</Text>
      <Text style={styles.summaryText}>Current Value: ₹28,100</Text>
      <Text style={styles.summaryText}>Overall Growth: +12%</Text>

      {/* Footer Navigation Bar */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Investments')}>
          <Text style={styles.navButtonText}>Investments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.navButtonText}>Transactions</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  graph: {
    marginVertical: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dataCell: {
    flex: 1,
    textAlign: 'center',
  },
  projectionText: {
    marginVertical: 5,
    fontSize: 16,
  },
  summaryText: {
    marginVertical: 5,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PerformanceAnalyticsScreen;
