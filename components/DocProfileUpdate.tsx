import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import apiUrl from './api';

const DocProfileUpdate = (props) => {
  const { token } = props.route.params;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  const [name, setName] = useState('');
  const [degree, setDegree] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [rank, setRank] = useState('');
  const [hospital, setHospital] = useState('');

  const saveProfile = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/docinfo`,
        {
          name,
          degree,
          specialization,
          rank,
          hospital,
        },
        {
          headers,
        }
      );

      console.log('Profile saved:', response.data);
      Alert.alert('Success', 'Doctor information saved successfully.');
      // Navigate to Docprofile (assuming you have navigation prop passed)
    } catch (error) {
      console.error('Error saving profile:', error);
      // Handle error, show a message, etc.
    }
  };

  // Function to get current date and time
  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    return currentDateTime.toLocaleString();
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        {/* Left: Logo */}
        <Image source={require('../assets/DocLink1.png')} style={styles.logo} />

        {/* Right: Date and Time */}
        <Text style={styles.dateTime}>{getCurrentDateTime()}</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Degree"
          placeholderTextColor="#777"
          value={degree}
          onChangeText={setDegree}
        />
        <TextInput
          style={styles.input}
          placeholder="Specialization"
          placeholderTextColor="#777"
          value={specialization}
          onChangeText={setSpecialization}
        />
        <TextInput
          style={styles.input}
          placeholder="Rank"
          placeholderTextColor="#777"
          value={rank}
          onChangeText={setRank}
        />
        <TextInput
          style={styles.input}
          placeholder="Hospital"
          placeholderTextColor="#777"
          value={hospital}
          onChangeText={setHospital}
        />
        <Button
          title="Save"
          color="#4CAF50"
          onPress={saveProfile}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.nav}>
        <TouchableOpacity style={styles.navButton} onPress={() => {
                props.navigation.navigate('Docprofile',{ 
                    token: token,});
            }}>
          <Image source={require('../assets/home (2).png')} style={styles.navicon}  />
          <Text style={styles.navtext}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => {
                props.navigation.navigate('SkinPredict',{ 
                    token: token,});
            }}>
          <Image source={require('../assets/camera.png')} style={styles.navicon} />
          <Text style={styles.navtext}>Predict</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => {
                props.navigation.navigate('Ambulance')}}>
          <Image source={require('../assets/ambu.png')} style={styles.navicon} />
          <Text style={styles.navtext}>Ambulance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8D4FE',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#75B2FF',
    paddingHorizontal: 20,
    paddingTop: 40, // Adjust as needed for top padding
    paddingBottom: 10,
  },
  logo: {
    width: 200,
    height: 50,
  },
  dateTime: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#75B2FF',
    height: 60,
  },
  navButton: {
    alignItems: 'center',
  },
  navicon: {
    width: 35,
    height: 35,
    marginBottom: 5,
  },
  navtext: {
    color: 'black',
    fontSize: 13,
  },
});

export default DocProfileUpdate;
