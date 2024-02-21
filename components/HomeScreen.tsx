import { View, Text, Image, StyleSheet, TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import SearchBar from "react-native-dynamic-search-bar";
 import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.containers}>
     
<View style={styles.container}>
<Text style={styles.text}>Doc <Text style={styles.text2}>Link</Text></Text>
      <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate("Login")}>
        <Text style={styles.text3}>Login</Text>
      </TouchableOpacity>
</View>
      

      <View>
        <Image source={require('../assets/home.png')} style={styles.image}></Image>
      </View>
      
      

      <View  style={styles.search}>
      <Text style={styles.searchtext}>Doctor/Disease</Text>
      <SearchBar
  placeholder="Search here"
  onPress={() => alert("onPress")}
  onChangeText={(text) => console.log(text)}
/>
      </View>

    </View>
  )
  

}


export default HomeScreen
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 20,   //for place center DocLink text
    width: '100%',
    height: 80,
    backgroundColor: '#75B2FF',
    flexDirection: 'row', // for align the items horizontally
    alignItems: 'center', //for center the items vertically
    justifyContent: 'flex-start', // for align items to the start (left side)
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  text2: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button:{
    height:40,
    width:90,
    backgroundColor:'#A8D4FE',
    borderRadius:8,
    justifyContent: 'center', // for center text vertically
    alignItems: 'center', // for center text horizontally
    position: 'absolute', //for place the button right side
    right: 20,        // right side theke 20 space chara
  },
  text3:{
    fontSize:20,
    fontWeight:'bold'
  },
  image:{
     height:200,
     width:200,
     marginTop:40,
     alignSelf:'center'
     
  },
  
  containers:{
    flex:1,
    backgroundColor: '#A8D4FE',
  },
  search:{
    marginTop:30
  },
  searchtext:{
    marginLeft:'6%',
    marginBottom:4,
    fontWeight:'bold',
   
  
  }

})
