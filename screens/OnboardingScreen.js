import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const slides = [
  {
    id: '1',
    title: 'Welcome to the App',
    description: 'An app that helps you manage your settings and more.',
    image: 'https://via.placeholder.com/300.png',  // Replace with your image
  },
  {
    id: '2',
    title: 'Track Your Activity',
    description: 'Monitor your activities efficiently with our tracking system.',
    image: 'https://via.placeholder.com/300.png',  // Replace with your image
  },
  {
    id: '3',
    title: 'Stay Connected',
    description: 'Get instant notifications and stay connected.',
    image: 'https://via.placeholder.com/300.png',  // Replace with your image
  },
];

const OnboardingScreen = ({ navigation }) => {
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const handleNextPress = (index) => {
    if (index < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: index + 1 });
    } else {
      navigation.replace('Settings');  // Navigate to main screen after onboarding
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.nextButton} onPress={() => handleNextPress(0)}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
