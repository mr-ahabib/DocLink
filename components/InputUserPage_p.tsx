import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import UserDetails from './UserDetails'; 

const MyComponent = (props:any) => {
  
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [loading, setLoading] = useState(false);

  const handleButtonPress = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`http://192.168.10.93:3000/api/user`, {
        name: input1,
        designation: input2,
        email: input3,
        address: input4
      });
      Alert.alert("Submitted");
      props.navigation.navigate('UserDetails', { email: input3 });
    } catch (error) {
      console.error("Error creating user:", error);
      Alert.alert("Error", "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={text => setInput1(text)}
        value={input1}
      />
      <TextInput
        style={styles.input}
        placeholder="Designation"
        onChangeText={text => setInput2(text)}
        value={input2}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setInput3(text)}
        value={input3}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={text => setInput4(text)}
        value={input4}
      />
      <Button
        title="Submit"
        onPress={handleButtonPress}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    marginTop: 40
  },
});

export default MyComponent;
