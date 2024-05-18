import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo1.png';

const Landing = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Log');
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Animal Wiki</Text>
        <Text style={styles.text}>What do you know about the animal kingdom?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToLogin}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#057B8B',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#057B8B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    padding: 40
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Landing;
