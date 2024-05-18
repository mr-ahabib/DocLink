import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import apiUrl from './api';

export default function ProfileUpdate(props: any) {
  const { token } = props.route.params;
  const [loading, setLoading] = useState(false);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token, // Include any authorization token if required
  };
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [district, setDistrict] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const genders = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }];
  const districts = [
    { label: 'Dhaka', value: 'Dhaka' },
    { label: 'Bogra', value: 'Bogra' },
    { label: 'Rajshahi', value: 'Rajshahi' },
    { label: 'Manikganj', value: 'Manikganj' },
    { label: 'Pabna', value: 'Pabna' }
  ];
  const professions = [
    { label: 'Doctor', value: 'Doctor' },
    { label: 'Patient', value: 'Patient' },
    { label: 'Pathologist', value: 'Pathologist' },
    { label: 'Pharmacist', value: 'Pharmacist' }
  ];
  const bloodGroups = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' }
  ];

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!name || !gender || !dateOfBirth || !district || !phone || !email || !profession || !bloodGroup) {
        Alert.alert('Please input all the fields first');
        return;
      }

      const userData = {
        name,
        gender,
        dob: dateOfBirth,
        district,
        phone,
        email,
        profession,
        bloodGroup,
      };

      const response = await axios.post(`${apiUrl}/api/userinfo`, userData, { headers });

      console.log(response.data);

      Alert.alert('Success', 'User information saved successfully.');
      

    } catch (error) {
      console.error('Error creating user info:', error);
      Alert.alert('Error', 'Failed to save user information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleHomePress = () => {
    // Handle navigation to Home screen
  };

  const handlePredictPress = () => {
    // Handle navigation to Predict screen
  };

  const handleAllDoctorsPress = () => {
    // Handle navigation to All Doctors screen
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image source={require('../assets/DocLink1.png')} style={styles.logo} />
        <Text style={styles.dateTime}>{new Date().toLocaleString()}</Text>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Dropdown
          style={styles.dropdown}
          data={genders}
          labelField="label"
          valueField="value"
          placeholder="Select Gender"
          value={gender}
          onChange={dropdownItem => {
            setGender(dropdownItem.value);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />
        <Dropdown
          style={styles.dropdown}
          data={districts}
          labelField="label"
          valueField="value"
          placeholder="Select District"
          value={district}
          onChange={dropdownItem => {
            setDistrict(dropdownItem.value);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Dropdown
          style={styles.dropdown}
          data={professions}
          labelField="label"
          valueField="value"
          placeholder="Select Profession"
          value={profession}
          onChange={dropdownItem => {
            setProfession(dropdownItem.value);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          data={bloodGroups}
          labelField="label"
          valueField="value"
          placeholder="Select Blood Group"
          value={bloodGroup}
          onChange={dropdownItem => {
            setBloodGroup(dropdownItem.value);
          }}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Navbar */}
      <View style={styles.nav}>
        <TouchableOpacity style={styles.navButton} onPress={() => {
                props.navigation.navigate('UserHome',{ 
                    token: token,});
            }}>
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
                props.navigation.navigate('DoctorList',{ 
                    token: token,});
            }}>
          <Image source={require('../assets/medical-team.png')} style={styles.navicon} />
          <Text style={styles.navtext}>All Doctors</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#75B2FF',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#75B2FF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logo: {
    width: 250,
    height: 30,
  },
  dateTime: {
    color: 'white',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    height: 40,
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  dropdown: {
    width: '100%',
    marginBottom: 10,
  },
  nav: {
    backgroundColor: '#75B2FF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },
  navButton: {
    alignItems: 'center',
  },
  navicon: {
    width: 35,
    height: 35,
  },
  navtext: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

