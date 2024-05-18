import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { darkBlue } from './Color';

const UserProfile = () => {

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
                <Image source={require('../assets/user.png')} style={styles.image1} />
                <Text style={{ fontWeight: 'bold' }}>Mirza Hasan</Text>

                <View style={styles.healthStatusContainer}>
                    <View style={styles.circle}>
                        <Text style={styles.healthStatusText}>Health status</Text>
                        <Text style={styles.healthStatusPercentage}>94%</Text>
                    </View>
                    <View style={styles.healthDetailContainer}>
                        <Text style={styles.healthDetailText}>Major: Diabetic</Text>
                        <Text style={styles.healthDetailText}>Minor: Blood Pressure</Text>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.doctor}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>10</Text>
                        </View>
                        <Text>Doctor</Text>
                    </View>


                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.report}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>10</Text>
                        </View>
                        <Text>Report</Text>
                    </View>


                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.prescription}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>10</Text>
                        </View>
                        <Text>Prescription</Text>
                    </View>
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
        marginTop: '-90%',
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
        height: '20%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '-35%'
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
});

export default UserProfile;

