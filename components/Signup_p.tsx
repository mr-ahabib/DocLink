import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import apiUrl from './api';

const Signup = () => {
  const navigation = useNavigation();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const newSignUp = async () => {
    try {
      setLoading(true);

      if (!firstname || !lastname || !email || !password) {
        Alert.alert("Please input all the fields first");
        return;
      }

      // const api = `${apiUrl}/api/users`;

      const response = await axios.post( `${apiUrl}/api/users`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      });

      Alert.alert("Account created Successfully.");
    } catch (error) {
      console.error("Error creating user:", error);
      Alert.alert("Error", "Invalid input. Please check your details.");
      Alert.alert("Error", "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const goToSignIn = () => {
    // Navigate to the sign-in screen using your navigation object
    navigation.navigate('SignIn'); // Replace 'SignIn' with the actual name of your sign-in screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require("../assets/doctor.png")}
          style={styles.image}
        />
      </View>

      <View>
        <Text style={styles.textContainer}>D O C L I N K</Text>
      </View>

      <View style={styles.textcontainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstname}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastname}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View>
        <TouchableOpacity style={styles.buttoncontainer} onPress={newSignUp}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.viewtext}>
        <Text>Already have an account?</Text>
        <View style={styles.signupbt}>
          <Button title='Sign In' color="#000" onPress={goToSignIn} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 300,
    width: 300,
    alignSelf: 'center',
    paddingTop: 100,
    borderRadius: 100 / 2,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#D3E7F9',
    height: 1200,
  },
  textcontainer: {

    marginTop: 20,
    width: 300,
    alignSelf: 'center',
    paddingBottom: 20,
  },
  input: {

    height: 70,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: 450,
    alignSelf: 'center',
  },
  textContainer: {

    fontSize: 40,
    textAlign: 'center',
    color: '#006600',
    paddingTop: 50,
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  buttoncontainer: {

    marginTop: 5,
    height: 40,
    width: 300,
    backgroundColor: '#000',
    alignSelf: 'center',
    borderRadius: 8,
  },
  buttonText: {

    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 10,
    fontSize: 20,
  },
  viewtext: {

    alignSelf: 'center',
    paddingTop: 40,
  },
  signupbt: {

    paddingTop: 20,
    borderRadius: 200,
  },
});
