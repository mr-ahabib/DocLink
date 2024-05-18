import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput } from 'react-native';
import React from 'react';
import { darkBlue } from './Color';

const DoctorProfile = () => {

    const handleHomePress = () => console.log('Home pressed');
    const handlePredictPress = () => console.log('Predict pressed');
    const handleHighlightPress = () => console.log('Highlight pressed');

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Text style={styles.text}>Sunday      18/2/24</Text>
                <Image source={require('../assets/qr.png')} style={styles.image} />
            </View>

            <View style={styles.centeredImageContainer}>
                <Image source={require('../assets/doctor.png')} style={styles.image1} />
                <Text style={{ fontWeight: 'bold' }}>Mirza Hasan</Text>

                


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.doctor}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>10</Text>
                        </View>
                        <Text style={{fontSize:20,fontWeight: 'bold', marginLeft:'-18%'}}>patient</Text>
                    </View>



                 
                    


                   
                </View>

                <View style={styles.searchContainer}>
        <TextInput
            style={styles.inputField}
            placeholder="Search"
            placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
    </View>




                <View style={styles.nav}>
                    <TouchableOpacity style={styles.navButton} onPress={handleHomePress}>
                        <Image source={require('../assets/home.png')} style={styles.navicon} />
                        <Text style={styles.navtext}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navButton} onPress={handlePredictPress}>
                        <Image source={require('../assets/camera.png')} style={styles.navicon} />
                        <Text style={styles.navtext}>Predict</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navButton} onPress={handleHighlightPress}>
                        <Image source={require('../assets/hei.png')} style={styles.navicon} />
                        <Text style={styles.navtext}>Highlight</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A8D4FE',
        paddingTop: '100%',
    },
    rowContainer: {
        flexDirection: 'row',
        marginTop: '-93%',
        backgroundColor: darkBlue,
        alignItems: 'center',
        paddingVertical: '7%',
        paddingHorizontal: '7%',
       
    },
    text: {
        marginRight: 10,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    },
    image: {
        width: 30,
        height: 30,
        marginLeft: '50%',
    },
    centeredImageContainer: {
        alignItems: 'center',
        marginTop: '-3%',
    },
    image1: {
        width: 141,
        height: 133,
        marginTop: '10%'
    },
    healthStatusContainer: {
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
    },
    circle: {
        width: 140,
        height: 140,
        borderRadius: 75,
        backgroundColor: '#A8D4FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%',
        marginLeft: '-8%',
        borderWidth: 12,
        borderColor: '#75B2FF',
    },
    healthStatusText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    healthStatusPercentage: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 22,
    },
    healthDetailContainer: {
        marginTop: 10,
        alignItems: 'center',
        marginLeft: '8%',
    },
    healthDetailText: {
        color: 'black',
        fontSize: 14,
        fontWeight: '600',
    },

    doctor: {
        width: 78,
        height: 78,
        borderRadius: 39,
        backgroundColor: '#A8D4FE',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 12,
        borderColor: '#75B2FF',
        marginRight: '10%',
        marginTop: '55%'
    },



    report: {
        width: 78,
        height: 78,
        borderRadius: 39,
        backgroundColor: '#A8D4FE',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 12,
        borderColor: '#75B2FF',
        marginRight: '10%',
        marginTop: '55%'
    },
    prescription: {
        width: 78,
        height: 78,
        borderRadius: 39,
        backgroundColor: '#A8D4FE',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 12,
        borderColor: '#75B2FF',
        marginRight: '10%',
        marginTop: '55%'
    },



    nav: {
        backgroundColor: darkBlue,
        position: 'absolute',
        bottom: '0%',
        left: '0%',
        right: '0%',
        height: '15%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '-85%'
    },
    navicon: {
        width: 35,
        height: 35,
        marginBottom: '20%',
    },
    navtext: {
        color: 'black',
        fontSize: 13,
    },
    navButton: {
        alignItems: 'center',
    },


    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:'10%'
    },
    inputField: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#ccc',
        width: '70%', 
        marginRight: '5%', 
    },
    searchButton: {
        backgroundColor: '#75B2FF',
        padding: '3%',
        borderRadius: 3,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    
});

export default DoctorProfile;

