import { Image, StyleSheet, Text, TextInput, View, } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from 'react-native-elements';


// dropdown
import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';

  const data = [
    { label: 'Patient', value: '1' },
    { label: 'Doctor', value: '2' },
    { label: 'Pathologist', value: '3' },
    { label: 'Pharmacist', value: '4' },
    
  ];
// dropdown

const Register = () => {
  const [userId, setUserId] = useState('');
  const [userId1, setUserId1] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSelected, setSelection] = useState(false); // Define state for checkbox
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object
  const [contactNumber, setContactNumber] = useState(''); //for ContactNumber

  const [value, setValue] = useState(null); // dropdown

  const firstName = (text: string) => {
    setUserId(text);
  };

  const lastName = (text: string) => {
    setUserId(text);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/DocLink1.png')} style={styles.image} />

       {/* dropdown */}
      <Dropdown
        style={styles. dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        // inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select your identity"
        // searchPlaceholder="Search..."
        value={value}
        onChange={dropdownItem => {
          setValue(dropdownItem.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />

      {/* dropdown */}

      <View>
        {/* <Text style={styles.text1}>User ID:</Text> */}
        <TextInput
          style={styles.styleText}
          onChangeText={firstName}
          value={userId}
          placeholder="First Name"
        />
      </View>

      <View>
        {/* <Text style={styles.text1}>User ID:</Text> */}
        <TextInput
          style={styles.styleText}
          onChangeText={lastName}
          value={userId1}
          placeholder="Last Name"
        />
      </View>

      {/* Contact Number Input */}
      <View>
        {/* <Text style={styles.text1}>Contact Number:</Text> */}
        <TextInput
          style={styles.styleText}
          // onChangeText={handleContactNumberChange}
          value={contactNumber}
          placeholder="Contact Number"
          keyboardType="phone-pad"
        />
      </View>

      <View>
        {/* <Text style={styles.text1}>Password:</Text> */}
      </View>

      <View style={styles.passContainer}>
        <TextInput
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
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

      <View style={styles.passContainer1}>
        <TextInput
          secureTextEntry={!showPassword}
          value={password1}
          onChangeText={setPassword1}
          style={styles.input}
          placeholder="Confirm Password"
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

      
      <View style={styles.checkboxContainer}>
      <CheckBox
        checked={isSelected}
        onPress={() => setSelection(!isSelected)} 
       style={styles.checkbox}

        />

        <Text style={styles.label}>I am accepting that, I have read & agreed to the {"\n"} <Text style={styles.label1}>Private Policy</Text></Text>
      </View>

      

      <TouchableOpacity style={styles.button} >
        <Text style={styles.text3}>Sign Up</Text>
      </TouchableOpacity>

     {/* <View><Text style={styles.forgetText}>Forgot Password?</Text></View> */}
     <Text style={styles.labe2}>Already have an account? <Text style={styles.labe3} onPress={() => navigation.navigate("Login")}>Login</Text></Text>
     
     
     <View><Text style={styles.ContactUS}>Contact US</Text></View>
     
     

    </View>
    
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8D4FE',
  },
  image: {
    alignSelf: 'center',
    height: 150,
    width: 400,
    marginTop: '1%',
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
  passContainer1: {
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
  // forgetText:{
  //   alignSelf:'center',
  //   marginTop:'2%'
  // },
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
    marginTop:'56%',
    marginLeft:'8%'
  },
  // dropdown design
  dropdown: {
    margin: 16,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff',
    width: '84%',
    height: 40,
    borderRadius: 8,
    alignSelf: 'center',
  },
  dropdownIcon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  }

});


