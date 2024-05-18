import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { blue, darkBlue, white } from './Color'; // Assuming 'white' color is defined
import apiUrl from './api';
import { useNavigation } from "@react-navigation/native";

const DoctorList = (props:any) => {
  const { token } = props.route.params;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };
  const [doctors, setDoctors] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    fetchDoctors();

    return () => clearInterval(timer);
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/alldoctors`);
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleHomePress = () => props.navigation.navigate('UserHome');
  const handlePredictPress = () => console.log('Predict pressed');
  const handleHighlightPress = () => console.log('Highlight pressed');

  return (
    <View style={styles.container}>
      {/* Top bar with auto-updating time and date */}
      <View style={styles.topBar}>
        <Image source={require('../assets/DocLink1.png')} style={styles.logo} />
        <Text style={styles.dateTimeText}>{currentTime.toLocaleString()}</Text>
      </View>

      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.contentContainer}>
          {doctors.map((doctor, index) => (
            <View style={styles.card} key={index}>
              <Image source={require('../assets/doctor (1).png')} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorInfo}>{doctor.degree}</Text>
                <Text style={styles.doctorInfo}>{doctor.specialization}</Text>
                <Text style={styles.doctorInfo}>Rank: {doctor.rank}</Text>
                <Text style={styles.doctorInfo}>{doctor.hospital}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Navigation */}
      <View style={styles.nav}>
        <TouchableOpacity style={styles.navButton} onPress={() => {
                props.navigation.navigate('UserHome',{ 
                    token: token,});
            }}>
          <Image source={require('../assets/home (2).png')} style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => {
                props.navigation.navigate('SkinPredict',{ 
                    token: token,});
            }}>
          <Image source={require('../assets/camera.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Predict</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={handleHighlightPress}>
          <Image source={require('../assets/medical-team.png')} style={styles.navIcon} />
          <Text style={styles.navText}>All Doctors</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  topBar: {
    backgroundColor: darkBlue,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 200,
    height: 50,
  },
  dateTimeText: {
    color: 'white',
    fontSize: 16,
  },
  scrollViewContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  doctorName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  doctorInfo: {
    color: 'black',
    fontSize: 12,
  },
  nav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: darkBlue,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  navIcon: {
    width: 35,
    height: 35,
  },
  navText: {
    color: 'white',
    fontSize: 13,
  },
  navButton: {
    alignItems: 'center',
  },
});

export default DoctorList;
