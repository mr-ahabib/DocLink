import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { blue, darkBlue } from './Color';

const DoctorList = () => {

  const handleHomePress = () => console.log('Home pressed');
  const handlePredictPress = () => console.log('Predict pressed');
  const handleHighlightPress = () => console.log('Highlight pressed');

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Sunday 18/2/24</Text>
        <Image source={require('../assets/qr.png')} style={styles.qrImage} />
      </View>

      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.contentContainer}>
          {[1, 2, 3, 4].map((item, index) => (
            <View style={styles.headerContainer} key={index}>
              <Image source={require('../assets/doctor.png')} style={styles.image} />
              <View style={styles.headerTextContainer}>
                <Text style={styles.doctorName}>Dr. Md Russel Mustafiz</Text>
                <Text style={styles.doctorInfo}>MBBS, MCPS (Medicine), FCPS</Text>
                <Text style={styles.doctorInfo}>Associate Professor & Head,</Text>
                <Text style={styles.doctorInfo}>Department of Medicine</Text>
                <Text style={styles.doctorInfo}>Rajshahi Medical College & Hospital</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add a gap */}
      <View style={styles.gap} />

      {/* Fixed Navigation */}
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
    backgroundColor: blue,
  },
  scrollViewContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 90, 
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10%',
    backgroundColor: darkBlue,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  qrImage: {
    width: 40,
    height: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: darkBlue,
    alignItems: 'center',
    padding: '12%',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
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
  gap: {
    height: 20, // Adjust the height of the gap as needed
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
});

export default DoctorList;
