import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommunityForumScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample discussion threads data
  const threads = [
    {
      id: '1',
      title: 'Best ways to save on daily expenses',
      user: 'JohnDoe',
      replies: 15,
      lastUpdated: '2 hours ago',
      snippet: 'Here are some tips I found really helpful...'
    },
    {
      id: '2',
      title: 'Mutual Funds vs. Stocks: What to choose?',
      user: 'JaneSmith',
      replies: 8,
      lastUpdated: '1 day ago',
      snippet: 'Both options have their pros and cons...'
    },
    // Add more threads as needed
  ];

  const renderThread = ({ item }) => (
    <View style={styles.threadContainer}>
      <Text style={styles.threadTitle}>{item.title}</Text>
      <Text style={styles.userInfo}>User: {item.user} | {item.replies} replies | {item.lastUpdated}</Text>
      <Text style={styles.snippet}>{item.snippet}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community Forum</Text>
        <Ionicons name="search" size={24} color="transparent" /> {/* Placeholder for search icon */}
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="What do you want to discuss today?" 
          value={searchTerm} 
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity>
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Popular/Recent Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Recent</Text>
        </TouchableOpacity>
      </View>

      {/* Discussion Threads */}
      <FlatList 
        data={threads} 
        renderItem={renderThread} 
        keyExtractor={item => item.id} 
        style={styles.threadsList} 
      />

      {/* Create New Topic Button */}
      <TouchableOpacity 
        style={styles.createTopicButton} 
        onPress={() => navigation.navigate('NewTopic')}
      >
        <Text style={styles.createTopicText}>+ Create New Topic</Text>
      </TouchableOpacity>

      {/* Footer Navigation Bar */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Community')}>
          <Ionicons name="people" size={24} color="blue" /> {/* Highlighted icon */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tab: {
    padding: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  threadsList: {
    flex: 1,
  },
  threadContainer: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  threadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    fontSize: 14,
    color: '#555',
  },
  snippet: {
    fontSize: 14,
    color: '#777',
  },
  createTopicButton: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  createTopicText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
});

export default CommunityForumScreen;
