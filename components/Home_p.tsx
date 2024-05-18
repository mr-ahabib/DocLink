import { ScrollView, StyleSheet, Text, View,Image,Button,Alert} from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";


const Home = () => {
    const navigation = useNavigation();
  return (
   
    <ScrollView  style={styles.homecontainer}>
        <Image
        source={require("../assets/doctor.png")}
        style={styles.homeimage} />


      <Text style={styles.textcontainer} >D O C L I N K</Text>


    <Image source={require("../assets/doc.png")}
    style={styles.image}
    
    />
<View style={styles.signinbt}>

<Button title='Sign In'  color="#000"  onPress={() =>navigation.navigate("Login" as never)} />

</View>


    
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1
    },

    homecontainer:{
        flex:1,
        paddingTop:100,
        backgroundColor:'#D3E7F9',
        height:1200   
    },
    textcontainer:{
      
          fontSize:40,
          textAlign: 'center',
          color:"#006600",
          paddingTop:50,
          paddingBottom:20,
          fontWeight: 'bold', 
        
          
          
    },
    image:{
    
        height:100,
        width:100,
        alignSelf: 'center',
         paddingTop:50

    },
    signinbt:{
       
        height:100,
        width:200,
        alignSelf: 'center',
        paddingTop:40,
        borderRadius:40
    },
   
    homeimage:{
       
        height:300,
        width:300,
        alignSelf:'center',
        paddingBottom:50,
        borderRadius:100/2
    }
    
})


