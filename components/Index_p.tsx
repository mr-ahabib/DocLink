import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { useNavigation } from "@react-navigation/native";
const Index = (props: any) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View  >
                <Image source={require('../images/Group 2.png')} style={styles.image}></Image>
            </View>
            <View style={styles.header}>
                <Text style={styles.textheader}>Animal Wiki</Text>
                <Text style={styles.text}>What do you know about the</Text>
                <Text style={styles.text1}>animal kingdom ?</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("Login")}>
                    <Text style={styles.text3}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        marginTop: '20%',
        alignSelf: 'center',

    },
    textheader: {
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#057B8B'

    },
    text: {
        fontSize: 22,
        color: '#1E8695'
    },
    text1: {
        alignSelf: 'center',
        fontSize: 22,
        color: '#1E8695'
    },
    button: {
        height: 60,
        width: 230,
        backgroundColor: '#2AB8CB',
        alignSelf: 'center',
        marginTop: '20%',
        borderRadius: 50
    },
    text3: {
        alignSelf: 'center',
        marginTop: '10%',
        color: 'white',
        fontSize: 18
    },
    image: {
        marginLeft: '65%',
        opacity: 0.5,



    }
})