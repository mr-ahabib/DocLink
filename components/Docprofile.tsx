import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import apiUrl from './api';

const Docprofile = (props:any) => {
  const { token } = props.route.params;
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  const getDoctorInfo = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/doctordetails`, { headers });

      if (response.data) {
        setDoctorInfo(response.data);
      }
    } catch (error) {
      console.error('Error fetching doctor info:', error);
      // Handle error, show a message, etc.
    }
  };

  useEffect(() => {
    getDoctorInfo();
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  const handleHomePress = () => console.log('Home pressed');
  const handlePredictPress = () => console.log('Predict pressed');
  const handleHighlightPress = () => console.log('Highlight pressed');
  const updateProfile = () => {
    props.navigation.navigate('DocProfileUpdate', {
      token: token,
      searchValue: searchValue,
    });
  };

  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.rowContainer}>
        {/* Left: Logo */}
        <Image source={require('../assets/DocLink1.png')} style={styles.logo} />

        {/* Right: Date and Time */}
        <Text style={styles.text}>{currentDateTime.toLocaleString()}</Text>
      </View>

      <View style={styles.centeredImageContainer}>
        <View style={styles.profileInfo}>
          <Image source={require('../assets/doctor (1).png')} style={styles.image1} />
          <View style={styles.doctorInfo}>
            <Text style={styles.nameText}>
              {doctorInfo ? doctorInfo.name : '-'}
            </Text>
            <Text style={styles.otherInfoText}>
              {doctorInfo ? doctorInfo.degree : '-'}
            </Text>
            <Text style={styles.otherInfoText}>
              {doctorInfo ? doctorInfo.specialization : '-'}
            </Text>
            <Text style={styles.otherInfoText}>
              {doctorInfo ? doctorInfo.rank : '-'}
            </Text>
            <Text style={styles.otherInfoText}>
              {doctorInfo ? doctorInfo.hospital : '-'}
            </Text>
          </View>
        </View>

        {/* Update Profile Button */}
        <TouchableOpacity style={styles.updateButton} onPress={updateProfile}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>

        {/* Search Section */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Search"
            placeholderTextColor="#aaa"
            value={searchValue}
            onChangeText={setSearchValue}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              props.navigation.navigate('PrescriptionWrite', {
                token: token,
                searchValue: searchValue,
              });
            }}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.nav}>
          <TouchableOpacity style={styles.navButton} onPress={handleHomePress}>
            <Image source={require('../assets/home (2).png')} style={styles.navicon} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8D4FE',
    paddingTop: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: '-100%',
    backgroundColor: '#75B2FF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '7%',
    paddingHorizontal: '7%',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  logo: {
    width: 250,
    height: 40,
  
  },
  centeredImageContainer: {
    alignItems: 'center',
    marginTop: '-3%',
  },
  image1: {
    width: 141,
    height: 133,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '10%',
  },
  doctorInfo: {
    alignItems: 'center',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  otherInfoText: {
    fontSize: 16,
    textAlign: 'center',
  },
  updateButton: {
    height: '10%',
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: '5%',
    marginLeft:'-55%'
  },
  buttonText: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },
  inputField: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    width: '70%',
    marginRight: '5%',
  },
  searchButton: {
    backgroundColor: '#75B2FF',
    padding: '3%',
    borderRadius: 3,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nav: {
    backgroundColor: '#75B2FF',
    position: 'absolute',
    bottom: 0, // Fixing navbar at the bottom
    left: 0,
    right: 0,
    height: '25%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '-157%',
  },
  navicon: {
    width: 35,
    height: 35,
    marginBottom: '20%',
  },
  navtext: {
    color: 'black',
    fontSize: 13,
  },
  navButton: {
    alignItems: 'center',
  },
});

export default Docprofile;
