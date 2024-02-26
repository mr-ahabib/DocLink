import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { darkBlue } from './Color'; 

const Prescription = () => {
  
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
        <View style={[styles.listContainer, { height: '45%' }]}>
          <Text style={styles.listTitle}>Lab Tests</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.listItem}>1. Thyroid Test(s)</Text>
            <Text style={styles.listItem}>2. Complete Blood Count (CBC)</Text>
            <Text style={styles.listItem}>3. Altrasono</Text>
            <Text style={styles.listItem}>1. Thyroid Test(s)</Text>
            <Text style={styles.listItem}>2. Complete Blood Count (CBC)</Text>
            <Text style={styles.listItem}>3. Altrasono</Text>
            <Text style={styles.listItem}>1. Thyroid Test(s)</Text>
            <Text style={styles.listItem}>2. Complete Blood Count (CBC)</Text>
            <Text style={styles.listItem}>3. Altrasono</Text>
          </ScrollView>
        </View>
        
        <View style={[styles.listContainer, { height: '45%' }]}>
          <Text style={styles.listTitle}>Medicines</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.listItem}>1. Paracetamol</Text>
            <Text style={styles.listItem}>2. Amoxicillin</Text>
            <Text style={styles.listItem}>3. Ibuprofen</Text>
            <Text style={styles.listItem}>1. Paracetamol</Text>
            <Text style={styles.listItem}>2. Amoxicillin</Text>
            <Text style={styles.listItem}>3. Ibuprofen</Text>
            <Text style={styles.listItem}>1. Paracetamol</Text>
            <Text style={styles.listItem}>2. Amoxicillin</Text>
            <Text style={styles.listItem}>3. Ibuprofen</Text>
          </ScrollView>
        </View>
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
    backgroundColor: '#A8D4FE',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: darkBlue,
    alignItems: 'center',
    padding: '12%',
    //marginRight:'10%'
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
   
    marginLeft:'-7%'
  },
  scrollViewContainer: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: '12%',
    borderWidth: 1,
    borderColor: '#000',
  },
  listTitle: {
    color: darkBlue, 
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    borderBottomWidth: 3, 
    borderBottomColor: darkBlue, 
  },
  listItem: {
    color: 'black',
    fontSize: 14,
    marginBottom: 5,
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
});

export default Prescription;
