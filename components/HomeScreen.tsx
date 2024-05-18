import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Animated, Easing } from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import { useNavigation } from "@react-navigation/native";
import apiUrl from './api';

const HomeScreen = (props: any) => {
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList<any>>(null);
  const rotateValue = useRef(new Animated.Value(0)).current;

  const [doctors, setDoctors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/alldoctors`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    
    fetchDoctors();

    const interval = setInterval(() => {
      // Determine the next index, looping back to 0 if at the end
      const nextIndex = (currentIndex + 1) % doctors.length;
      setCurrentIndex(nextIndex);
      // Scroll to the next card
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, doctors.length]); // Update effect when currentIndex or doctors.length changes

  const startAnimation = () => {
    rotateValue.setValue(0);
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item, index }) => {
    const rotateY = rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const animatedStyle = {
      transform: [
        { perspective: 1000 },
        { rotateY },
        { scale: 0.9 }, // Scale down slightly
      ],
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    };

    return (
      <Animated.View style={[styles.card, animatedStyle]}>
        <Image source={require('../assets/icons8-doctor-48.png')} style={styles.logo} />
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardText}>{item.degree}</Text>
        <Text style={styles.cardText}>{item.specialization}</Text>
        <Text style={styles.cardText}>{item.rank}</Text>
        <Text style={styles.cardText}>{item.hospital}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Doc <Text style={styles.headerText2}>Link</Text></Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.navigate("Login")}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Image source={require('../assets/doctor-visit.png')} style={styles.image} />

      <View style={styles.search}>
        <Text style={styles.searchText}>Doctor/Disease</Text>
        <SearchBar
          placeholder="Search here"
          onPress={() => alert("onPress")}
          onChangeText={(text) => console.log(text)}
        />
      </View>

      {doctors.length === 0 ? (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={doctors}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: 450, // Width of the card + any margins
            offset: 450 * index,
            index,
          })}
          initialScrollIndex={0}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          windowSize={2}
          onMomentumScrollEnd={(event) => {
            const contentOffsetX = event.nativeEvent.contentOffset.x;
            const newIndex = Math.floor(contentOffsetX / 450); // Width of the card
            setCurrentIndex(newIndex);
            startAnimation(); // Start animation when scrolling ends
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8D4FE',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerText2: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginButton: {
    height: 40,
    width: 90,
    backgroundColor: '#A8D4FE',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    height: 200,
    width: 200,
    marginTop: 40,
    alignSelf: 'center',
  },
  search: {
    marginTop: 30,
  },
  searchText: {
    marginLeft: '6%',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  card: {
    width: 460,
    height: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // More transparent
    borderRadius: 8,
    padding: 10,
    marginRight: 20,
    marginTop: 130,
    alignItems: 'center', // Center content inside the card
    justifyContent: 'center',
  },
  logo: {
    width: '50%',
    height: '30%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 3,
    alignSelf: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
