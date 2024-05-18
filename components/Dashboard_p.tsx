import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Dashboard = () => {
    return (
        <View style={styles.container}>
            <View  >
                <Image source={require('../images/akar-icons_search.png')} style={styles.image}></Image>
                <Image source={require('../images/Group 3.png')} style={styles.image1}></Image>
            </View>
            <View>
            <Image source={require('../images/Frame 4.png')} style={styles.image2}></Image>
            </View>
            <View style={styles.color}>

                <Text style={styles.info}>Lion</Text>
            </View>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        marginTop: '15%',
        marginLeft: '10%'
    },
    image1: {
        marginTop: '-5%',
        marginLeft: '85%'
    },
    image2:{
        marginTop:'10%',
        marginLeft:'20%'
    },
    image3:{
        marginTop:'10%',
        width:'100%',
        height:'100%'
        
    },
    info:{
        backgroundColor:'#fff',
        height:40,
    },
    color:{
        width:'100%',
        height:'100%',
        backgroundColor:'#0081A7'
    }
})