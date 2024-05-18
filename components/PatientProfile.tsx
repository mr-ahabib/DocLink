import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from '../assets/Home.png'; 
import CameraIcon from '../assets/cam 1.png'; 
import HighlightIcon from '../assets/News.png'; 
import PatientAvatar from '../assets/boss 1.png'; 
import Qr from '../assets/qr-code.png';
const PatientProfile = () => {
  const navigation = useNavigation();

  
  const navigateToDoctor = () => navigation.navigate('Docprofile');
  const navigateToReport = () => navigation.navigate('Report');
  const navigateToPrescription = () => navigation.navigate('Second');
  
  const navigateToPredict = () => navigation.navigate('Qrscan');
  const navigateToHighlight = () => navigation.navigate('News');

  const navigateToqr = () => navigation.navigate('Qrscan');

  return (
    <View style={styles.container}>
      {/* Top Bar and Date */}
      <View style={styles.topBar}>
        <Text style={{textAlign:"left",marginRight: 260,fontSize:20, fontWeight:20}}>Date: </Text>
        <TouchableOpacity style={styles.topbarbutton} onPress={navigateToqr}>
          <Image source={Qr} style={styles.qr} />
        </TouchableOpacity>
      </View>
      {/* Patient Avatar and Information */}
      <View style={styles.profileSection}>
        <Image source={PatientAvatar} style={styles.avatar} />
        <Text style={styles.patientName}>Md. Someone Someone</Text>
        <View style={styles.healthStatus}>
          <Text style={styles.healthStatusText}>Health status 94%</Text>
          <Text style={styles.conditions}>Major: Diabetic</Text>
          <Text style={styles.conditions}>Minor: Blood Pressure</Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <View style= {styles.circularContainer}>
        <TouchableOpacity style={styles.navButton} onPress={navigateToDoctor}>
          <Text style={styles.navText}>10</Text>
          <Text style={styles.navText}>Doctor</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.circularContainer}>
        <TouchableOpacity style={styles.navButton} onPress={navigateToReport}>
          <Text style={styles.navText}>20</Text>
          <Text style={styles.navText}>Report</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.circularContainer}>
        <TouchableOpacity style={styles.navButton} onPress={navigateToPrescription}>
          <Text style={styles.navText}>10</Text>
          <Text style={styles.navText}>Prescription</Text>
        </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Bar Icons */}
      <View style={styles.iconBar}>
        <TouchableOpacity onPress={navigateToReport}>
          <Image source={HomeIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToPredict}>
          <Image source={CameraIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToHighlight}>
          <Image source={HighlightIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  topBar: {
    backgroundColor: '#ffffff',
    paddingTop: 20, // for status bar
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // half of width/height to make it round
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  topBar: {
    height: 50,
    backgroundColor: '#75B2FF',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  healthStatus: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  healthStatusText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
  },
  conditions: {
    fontSize: 14,
    color: '#000000',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'lightblue',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
    color: '#000000',
  },
  iconBar: {
    height: 60,
     backgroundColor: '#75B2FF',
     flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  circularContainer: {
    width: 95,  
        height: 95,  
        borderRadius: 120,
        borderWidth:10, 
        borderColor: '#75B2FF' ,
        backgroundColor: 'lightblue',  
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:40,
        marginBottom:90,

  },
});

export default PatientProfile;
