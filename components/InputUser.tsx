import { StyleSheet, Text,Alert, View,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import  { useState } from 'react';
import apiUrl from './api';
import axios from 'axios';

const InputUser = (props:any ) => {
  const { token } = props.route.params;
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token, // Include any authorization token if required
    };
    const newTitle = async () => {
      try {
        setLoading(true);
        if (!title) {
          Alert.alert('Please input all the fields first');
          return;
        }
    
        const response = await axios.post(`${apiUrl}/api/userInfo`, {
          title: title,
        },
        {
          headers: headers,
        }
        
        );
    
        // Assuming the API returns a success status (e.g., 200)
        if (response.status === 201) {
          console.log(response.data)
          console.log('User information saved successfully:', response.data);
          // Optionally, you can provide feedback to the user if needed
          Alert.alert('Success', 'User information saved successfully');
        } else {
          console.error('Unexpected status code:', response.status);
          Alert.alert('Error', 'Failed to save user information. Please try again.');
        }
      } catch (error) {
        console.error('Error logging in user:', error);
        Alert.alert('Error', 'Failed to save user information. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    

  return (
    
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.styleText}
          onChangeText={setTitle}
          value={title}
          placeholder="Write something"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={newTitle}>
        <Text style={styles.text3}>save</Text>
      </TouchableOpacity>
    </View>
  )
}

export default InputUser

const styles = StyleSheet.create({
    styleText:{
           marginTop:'30%'
    },
    container:{
        flex:1
    },
    button: {
      height: 40,
      width: '84%',
      backgroundColor: '#75B2FF',
      borderRadius: 8,
      alignSelf: 'center',
      marginTop: '5%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text3: {
      fontSize: 20,
      alignSelf: 'center',
      textAlign: 'center',
      lineHeight: 40,
    }
})