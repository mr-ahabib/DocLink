import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,TextInput, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from '../assets/homee.png'; 
import CameraIcon from '../assets/cam 1.png'; 
import HighlightIcon from '../assets/News.png';
import Qr from '../assets/qr-code.png';
import Doc from '../assets/Doc.png';

const Docprofie = () => {
  const navigation = useNavigation();  

  const navigateToSecondPage = () => {
    navigation.navigate('Second'); // Navigate to the 'Second' screen
  };

  const navigateToNews = () =>{
    navigation.navigate('News');

  };

  const navigateToCamera = () =>{
    navigation.navigate('Camera');

  };
  const navigateToqr = () =>{
    navigation.navigate('Qrscan');

  };
  const navigateTopatient = () =>{
    navigation.navigate('Patienthome');

  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={{textAlign:"left",marginRight: 260,fontSize:20, fontWeight:20}}>Date: </Text>
        <TouchableOpacity style={styles.topbarbutton} onPress={navigateToqr}>
          <Image source={Qr} style={styles.qr} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        
        <View style={styles.circle}>
        <Image source={Doc} style={styles.doctor} />

        </View>
        <TextInput style={{marginLeft:55,marginTop: 12,fontSize:20, backgroundColor:'white', textAlign:'center',height:40,width:240}}placeholder="Doctor Name"></TextInput>
        <TextInput style={{marginLeft:55,marginTop: 12,fontSize:20, backgroundColor:'white', textAlign:'center',height:75,width:240}}placeholder="Doctor Details"></TextInput>
        
        
        <View style={styles.circularContainer}>
            <Text style={{fontSize:30}}>10</Text>



            
            
       
    </View>
   

        {/* doc profile content here */}
      </View>
      <Text style={{marginBottom:7,marginLeft:28,fontSize:15,}}>Patient</Text>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={navigateToSecondPage}>
          <Image source={HomeIcon} style={styles.iconImage} />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={navigateToCamera}>
          <Image source={CameraIcon} style={styles.iconImage} />
          <Text style={styles.iconText}>Predict</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={navigateTopatient}>
          <Image source={HighlightIcon} style={styles.iconImage} />
          <Text style={styles.iconText}>Patient</Text>
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
      circle: {
        width: 264,  
    height: 255,  
    borderRadius: 140, // Half of width and height to create a circle
    backgroundColor: '#fff', // Set your desired background color
    justifyContent: 'center',
     
    marginLeft: 42,
    
      },
      doctor:{
        marginLeft: 62,
        height:220,
        width:140,

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
      circularContainer: {
        width: 80, // Adjust the width as needed
        height: 80, // Adjust the height as needed
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

export default Docprofie;
