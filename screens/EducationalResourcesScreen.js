import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EducationalResourcesScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredType, setFilteredType] = useState('All');
  const resources = [
    // Sample data for content cards
    {
      id: 1,
      title: 'Understanding Budgeting',
      description: 'A guide to managing your budget effectively.',
      type: 'Article',
      thumbnail: 'https://via.placeholder.com/150',
      duration: '5 min read',
    },
    {
      id: 2,
      title: 'Investing 101',
      description: 'Basics of investing and how to start.',
      type: 'Video',
      thumbnail: 'https://via.placeholder.com/150',
      duration: '10 min watch',
    },
    // Add more resources as needed
  ];

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filterResources = () => {
    return resources.filter(resource => 
      (filteredType === 'All' || resource.type === filteredType) &&
      resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Educational Resources</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search resources..."
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Filter Options */}
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilteredType('Article')} style={styles.filterButton}>
          <Text>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilteredType('Video')} style={styles.filterButton}>
          <Text>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilteredType('Tutorial')} style={styles.filterButton}>
          <Text>Tutorials</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilteredType('All')} style={styles.filterButton}>
          <Text>Reset Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Content List */}
      <ScrollView style={styles.contentList}>
        {filterResources().map(resource => (
          <View key={resource.id} style={styles.contentCard}>
            <Image source={{ uri: resource.thumbnail }} style={styles.thumbnail} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{resource.title}</Text>
              <Text style={styles.cardDescription}>{resource.description}</Text>
              <Text style={styles.cardDuration}>{resource.duration}</Text>
              <TouchableOpacity style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>Read More</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bookmark Section */}
      <View style={styles.bookmarkSection}>
        <Text style={styles.sectionTitle}>Bookmarked Resources</Text>
        {/* Display bookmarked resources here */}
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Transactions</Text>
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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  contentList: {
    flex: 1,
  },
  contentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardDescription: {
    color: '#555',
  },
  cardDuration: {
    color: '#888',
    marginVertical: 4,
  },
  readMoreButton: {
    marginTop: 8,
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 4,
  },
  readMoreText: {
    color: 'white',
  },
  bookmarkSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default EducationalResourcesScreen;
