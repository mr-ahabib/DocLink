// components/Report.js

import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import HomeIcon from '../assets/Home.png'; 
import CameraIcon from '../assets/cam 1.png'; 
import HighlightIcon from '../assets/News.png';
import Qr from '../assets/qr-code.png';

const Report = () => {
  const navigation = useNavigation();  

  const navigateToReport = () => {
    navigation.navigate('Report');
    
  };

  const navigateToNews = () => {

    navigation.navigate('News');
  };

  const navigateToCamera = () =>{
    navigation.navigate('Camera');

  };
  const navigateToqr = () =>{
    navigation.navigate('Qrscan');

  };


  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={{textAlign:"left",marginRight: 260,fontSize:20, fontWeight:20}}>Date: </Text>
        <TouchableOpacity style={styles.topbarbutton} onProgress={navigateToqr}>
          <Image source={Qr} style={styles.qr} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.Text}>Suggestion</Text>
        <View style={styles.Report}></View>
        {/* report content here */}
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={navigateToReport}>
          <Image source={HomeIcon} style={styles.iconImage} />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={navigateToCamera}>
          <Image source={CameraIcon} style={styles.iconImage} />
          <Text style={styles.iconText}>Predict</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={navigateToNews}>
          <Image source={HighlightIcon} style={styles.iconImage} />
          <Text style={styles.iconText}>Highlights</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue', // Set background color as needed
      },
      topBar: {
        height: 50,
        backgroundColor: '#75B2FF',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      },
      content: {
        flex: 1,
        padding: 10,
      },
      bottomBar: {
        height: 70,
        backgroundColor: '#75B2FF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      iconButton: {
        alignItems: 'center',
      },
      iconImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain', // Adjust the resizeMode as needed
      },
      iconText: {
        fontSize: 12,
        marginTop: 5,
      },
      Report: {
        paddingTop:10,
        height: 480,
        backgroundColor: '#fff',
        marginBottom:20,
      },
      Text: {
        paddingTop: 10,
        textAlign: 'center',
        paddingBottom: 10,
        fontSize: 20,
        fontWeight: 'bold'
      },
      qr:{
         marginLeft: 257,
      },
      topbarbutton: {
        position: 'absolute',
        right: 5,
      },
});

export default Report;
