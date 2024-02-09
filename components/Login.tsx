import { SafeAreaView, StyleSheet, Text, View,Image,TextInput,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
 


const Login = () => {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
 <SafeAreaView style={styles.container}>


 <View >
 <Image
        source={require("../assets/doctor.png")}
        style={styles.image} />
    </View>   


<View>
<Text style={styles.textContainer} >D O C L I N K</Text>
</View>


    <View style={styles.textcontainer}>
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
        <TouchableOpacity   style={styles.buttoncontainer}
        onPress={() => console.log("Sign In button pressed")}
        >

<Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        
    </View>
            

 </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({

        image:{
            height:300,
            width:300,
            alignSelf:'center',
            paddingTop:100,
            borderRadius:100/2
        },
        container:{
            paddingTop:100,
            backgroundColor:'#D3E7F9',
            height:1200
        },
        textcontainer: {
            marginTop: 100,
            width: 300,
            alignSelf:'center'
          },
        input: {
            height: 70,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderRadius: 8,
            width:450,
            alignSelf:'center'
          },
          textContainer:{
            fontSize:40,
          textAlign: 'center',
          color:"#006600",
          paddingTop:50,
          paddingBottom:20,
          fontWeight: 'bold',
          },
          buttoncontainer:{
            marginTop: 5,
            height: 40,
            width: 300,
            backgroundColor: "#000",
           alignSelf:'center',
            borderRadius: 8,
          },
          buttonText:{
                  color:'#FFF',
                  fontWeight:'bold',
                 alignSelf:'center',
                 paddingTop:10,
                 fontSize:20
          }



})