import { SafeAreaView, StyleSheet, Text, View,Image,TextInput,TouchableOpacity, Button, } from 'react-native'
import React, { useState } from 'react'
 
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
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

    <View style={styles.viewtext}>
<Text>Don't have an account? 
       
</Text>
<View style={styles.signupbt}>
    <Button title='Sign Up' color="#000" onPress={() =>navigation.navigate("Signup" as never)}></Button>
        </View>

</View>
            

 </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({

        image:{
          flex:1,
            height:500,
            width:500,
            alignSelf:'center',
            paddingTop:100,
            borderRadius:100/2,
            resizeMode:"contain"
        },
        container:{
          flex:1,
            paddingTop:100,
            backgroundColor:'#D3E7F9',
            height:1200
        },
        textcontainer: {
      
            marginTop: '20%',
            width: 300,
            alignSelf:'center'
          },
        input: {
       
            height: '20%',
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderRadius: 8,
            width:'150%',
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
         
            marginBottom: '1%',
            height: '20%',
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
          },
          viewtext:{
           
            alignSelf:'center',
            paddingTop: 10
         },
         signupbt:{
     
          paddingBottom:'60%',
          borderRadius:100
          
         }



})