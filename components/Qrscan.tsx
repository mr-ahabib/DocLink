import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from '../assets/homee.png'; 
import CameraIcon from '../assets/Cam.png'; 
import HighlightIcon from '../assets/News.png';
import Qr from '../assets/qr-code.png';

const Qrscan = () => {
  const navigation = useNavigation();  

  const navigateToSecondPage = () => {
    navigation.navigate('Second');  
  };

  const navigateToNews = () =>{
    navigation.navigate('News');

  };

  const navigateToqr = () =>{
    navigation.navigate('Qrscan');

  };

  const navigateToCam = () =>{
    navigation.navigate('Camera');

  };

  return (
    <View style={styles.container}>
     
      <View style={styles.topBar}>
        <Text style={{textAlign:"left",marginRight: 260,fontSize:20, fontWeight:20}}>Date: </Text>
        <TouchableOpacity style={styles.topbarbutton} onPress={navigateToqr}>
          <Image source={Qr} style={styles.qr}/>
        </TouchableOpacity>
      </View>

       
      <ScrollView style={styles.content}>
        <Text style={styles.Text}>Scan</Text>
        <View style={styles.Cam}>
            <TouchableOpacity style={{marginLeft:120,marginTop:140}}>

            <Image source={CameraIcon} style={styles.iconImage} />

            </TouchableOpacity>

        </View>
        
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={navigateToSecondPage}>
          <Image source={HomeIcon} style={styles.iconImage} />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={navigateToCam}>
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
        backgroundColor: 'lightblue',  
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
        resizeMode: 'contain',  
      },
      iconText: {
        fontSize: 12,
        marginTop: 5,
      },
      Cam: {
        paddingTop:40,
        height: 400,
        width:270,
        backgroundColor: '#fff',
        marginBottom: '6%',
        marginTop: '10%',
         marginLeft:'15%',
         
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

export default Qrscan;
