import { Image, StyleSheet, Text, TextInput, View ,Alert} from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from 'react-native-elements';
import apiUrl from './api';
import axios from 'axios';
const Dlogin = (props:any) => {


  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSelected, setSelection] = useState(false); 
  const navigation = useNavigation(); 
  const [loading, setLoading] = useState(false);
  const handleUserIdChange = (text: string) => {
    setUserId(text);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const signin=async ()=>{
    try {
      setLoading(true);
      if(!userId||!password){
        Alert.alert("Please input all the fields first");
        return;
      }
      const response = await axios.post( `${apiUrl}/api/user`, {
        email:userId,
        password: password,
      });

      Alert.alert("Welcome to DocLink app");
    
      const { success,nessage,token } = response.data;
      console.log(token)
     props.navigation.navigate('Docprofile', {
       
          token: token,
          
        
      });


     // props.navigation.navigate('InputUser')
    } catch (error) {
      console.error("Error logging in user:", error);
      Alert.alert("Error", "Invalid input. Please check your details.");
      Alert.alert("Error", "Failed to load user");
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/DocLink1.png')} style={styles.image} />
      <View>
        <Text style={styles.text1}>User ID:</Text>
        <TextInput
          style={styles.styleText}
          onChangeText={handleUserIdChange}
          value={userId}
          placeholder="User ID"
        />
      </View>

      <View>
        <Text style={styles.text1}>Password:</Text>
      </View>

      <View style={styles.passContainer}>
        <TextInput
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#aaa"
        />
        <MaterialCommunityIcons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowPassword}
        />
      </View>

      
      {/* <View style={styles.checkboxContainer}>
      <CheckBox
        checked={isSelected}
        onPress={() => setSelection(!isSelected)} 
       style={styles.checkbox}

        />

        <Text style={styles.label}>I am accepting that, I have read & agreed to the {"\n"} <Text style={styles.label1}>Private Policy</Text></Text>
      </View> */}

      

      <TouchableOpacity style={styles.button} onPress={signin}>
        <Text style={styles.text3}>Login</Text>
      </TouchableOpacity>

     <View><Text style={styles.forgetText}>Forgot Password?</Text></View>

     <Text style={styles.labe2}>Are you a Doctor? <Text style={styles.labe3} onPress={() =>props.navigation.navigate("Register")}>Sign in as Doctor</Text></Text>
     
     <View><Text style={styles.ContactUS}>Contact US</Text></View>
     
     

    </View>
    
  );
};

export default Dlogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8D4FE',
  },
  image: {
    alignSelf: 'center',
    height: 150,
    width: 400,
    marginTop: '10%',
  },
  text1: {
    marginLeft: '8%',
    marginBottom: '2%',
    fontWeight: 'bold',
  },
  styleText: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '84%',
    height: 40,
    borderRadius: 8
  },
  passContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '84%',
    height: 40,
    borderRadius: 8
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: '#000',
  },
  icon: {
    marginLeft: 10,
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
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
    
  },
  label: {
    marginTop:'3%',
    marginLeft:'-2%',
    fontSize:13
  },
  label1: {
    fontSize:13,
    color:'#ffffff' 
  },
  forgetText:{
    alignSelf:'center',
    marginTop:'2%'
  },
  labe2: {
    marginTop:'2%',
    fontSize:13,
    alignSelf:'center'
  },
  labe3: {
    fontWeight: 'bold',
    fontSize:13,
    textDecorationLine: 'underline',
    
  },
  ContactUS:{
    marginTop:'70%',
    marginLeft:'8%'
  }

});
