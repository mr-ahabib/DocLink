import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { blue, darkBlue } from './Color';

const MainPrescription = () => {

  const handleHomePress = () => console.log('Home pressed');
  const handlePredictPress = () => console.log('Predict pressed');
  const handleHighlightPress = () => console.log('Highlight pressed');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/user.png')} style={styles.image} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.doctorName}>Md Russel Mustafiz</Text>
          <Text style={styles.doctorInfo}>MBBS, MCPS (Medicine), FCPS</Text>
          <Text style={styles.doctorInfo}>Associate Professor & Head,</Text>
          <Text style={styles.doctorInfo}>Department of Medicine</Text>
          <Text style={styles.doctorInfo}>Rajshahi Medical College & Hospital</Text>
        </View>
      </View>

      <View style={styles.scrollViewContainer}>
        <View style={[styles.listContainer, { height: '100%' }]}>
          <Text style={styles.listTitle}>Lab Tests</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.listItem}>1. xxxxxxx</Text>
            <Text style={styles.listItem}>2. xxxxxxx</Text>
            <Text style={styles.listItem}>3. xxxxxxx</Text>
          </ScrollView>
        </View>
        {/* Black line below lab tests box */}
        <View style={styles.blackLine} />
      </View>

      <View style={styles.nav}>
        <TouchableOpacity style={styles.navButton} onPress={handleHomePress}>
          <Image source={require('../assets/home.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handlePredictPress}>
          <Image source={require('../assets/camera.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Predict</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleHighlightPress}>
          <Image source={require('../assets/hei.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Highlight</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkBlue,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: darkBlue,
    alignItems: 'center',
    padding: '12%',
  },
  headerTextContainer: {
    marginLeft: 10,
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
  image: {
    width: 100,
    height: 100,
    marginLeft: '-7%'
  },
  scrollViewContainer: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    borderRadius: 3,
    padding: 10,
    marginBottom: '12%',
    borderWidth: 5,
    borderColor: blue,
  },
  listTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    borderBottomWidth: 5,
    borderBottomColor: blue,
  },
  listItem: {
    color: 'black',
    fontSize: 14,
    marginBottom: 5,
    paddingRight: 10, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollView: {
    maxHeight: 200,
  },
  nav: {
    backgroundColor: darkBlue,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
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
  medicineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  medicineName: {
    color: 'black',
    fontSize: 14,
    flex: 3, 
  },
  medicineFrequency: {
    color: 'black',
    fontSize: 14,
    flex: 1, 
  },
  medicineDuration: {
    color: 'red', 
    flex: 1, 
  },
  // Style for the black line
  blackLine: {
    //borderBottomWidth: 1,
    borderBottomColor: blue,
    height: 8,
   
        borderBottomWidth: 5, // Increase the border width to make it more visible
        //borderBottomColor: blue,
      
  },
});

export default MainPrescription;
