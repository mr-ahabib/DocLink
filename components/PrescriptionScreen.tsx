import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import apiUrl from './api';

const PrescriptionScreen = (props:any) => {
    const { token } = props.route.params;

    const [prescriptions, setPrescriptions] = useState([]);
    const [tests, setTests] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch prescriptions with token
                const prescriptionResponse = await axios.get(`${apiUrl}/api/Userprescriptions`, {
                    headers: {
                        'Authorization': token,
                    },
                });
                setPrescriptions(prescriptionResponse.data);
                
                // Fetch tests with token
                const testResponse = await axios.get(`${apiUrl}/api/userTest`, {
                    headers: {
                        'Authorization': token,
                    },
                });
                setTests(testResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [token]);

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <Image source={require('../assets/DocLink1.png')} style={styles.logo} />
                <Text style={styles.dateTime}>{new Date().toLocaleString()}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Map over prescriptions and render cards */}
                {prescriptions.map((prescription, index) => (
                    <View style={[styles.card, index === 0 ? { marginTop: 20 } : null]} key={index}>
                        {/* Render prescription details */}
                        <Text style={styles.title}>Prescription {index + 1}</Text>
                        <View style={styles.detailsContainer}>
                            <View style={styles.leftDetails}>
                                {/* Render test details */}
                                <Text style={styles.subTitle}>Tests:</Text>
                                {tests[index] && (
                                    <>
                                        <Text style={styles.detailText}>{`1: ${tests[index].test1}`}</Text>
                                        <Text style={styles.detailText}>{`2: ${tests[index].test2}`}</Text>
                                        <Text style={styles.detailText}>{`3: ${tests[index].test3}`}</Text>
                                        <Text style={styles.detailText}>{`4: ${tests[index].test4}`}</Text>
                                        <Text style={styles.detailText}>{`5: ${tests[index].test5}`}</Text>
                                    </>
                                )}
                            </View>
                            <View style={styles.middleDetails}>
                                {/* Render medicine details */}
                                <Text style={styles.subTitle}>Medicines:</Text>
                                <Text style={styles.detailText}>{`1: ${prescription.medicine1}`}</Text>
                                <Text style={styles.detailText}>{`2: ${prescription.medicine2}`}</Text>
                                <Text style={styles.detailText}>{`3: ${prescription.medicine3}`}</Text>
                                <Text style={styles.detailText}>{`4: ${prescription.medicine4}`}</Text>
                                <Text style={styles.detailText}>{`5: ${prescription.medicine5}`}</Text>
                            </View>
                            <View style={styles.rightDetails}>
                                {/* Render frequency details */}
                                <View style={styles.dayTimeHeadingContainer}>
                                    <Text style={styles.dayTimeHeading}>Day</Text>
                                    <Text style={styles.dayTimeHeading}>Time</Text>
                                </View>
                                <View style={styles.dayTimeContainer}>
                                    <Text style={styles.dayTimeText}>{prescription.day1}</Text>
                                    <Text style={styles.dayTimeText}>{prescription.time1}</Text>
                                </View>
                                <View style={styles.dayTimeContainer}>
                                    <Text style={styles.dayTimeText}>{prescription.day2}</Text>
                                    <Text style={styles.dayTimeText}>{prescription.time2}</Text>
                                </View>
                                <View style={styles.dayTimeContainer}>
                                    <Text style={styles.dayTimeText}>{prescription.day3}</Text>
                                    <Text style={styles.dayTimeText}>{prescription.time3}</Text>
                                </View>
                                <View style={styles.dayTimeContainer}>
                                    <Text style={styles.dayTimeText}>{prescription.day4}</Text>
                                    <Text style={styles.dayTimeText}>{prescription.time4}</Text>
                                </View>
                                <View style={styles.dayTimeContainer}>
                                    <Text style={styles.dayTimeText}>{prescription.day5}</Text>
                                    <Text style={styles.dayTimeText}>{prescription.time5}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}

            </ScrollView>
          
            {/* Navigation buttons */}
            <View style={styles.nav}>
                <TouchableOpacity style={styles.navButton} onPress={() => {
                props.navigation.navigate('UserHome',{ 
                    token: token,});
            }}>
                    <Image source={require('../assets/home (2).png')} style={styles.navIcon} />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}  onPress={() => {
                props.navigation.navigate('SkinPredict',{ 
                    token: token,});
            }}>
                    <Image source={require('../assets/camera.png')} style={styles.navIcon} />
                    <Text style={styles.navText}>Predict</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => {
                props.navigation.navigate('DoctorList',{ 
                    token: token,});
            }}>
                    <Image source={require('../assets/medical-team.png')} style={styles.navIcon} />
                    <Text style={styles.navText}>All Doctors</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#75B2FF', // Top bar color
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15, // Increased paddingBottom
    },
    logo: {
        width: 120, // Increased width
        height: 40, // Increased height
    },
    dateTime: {
        color: 'white',
        fontSize: 16,
    },
    content: {
        alignItems: 'center',
        paddingBottom: 120, // Adjusted paddingBottom to accommodate navbar
    },
    card: {
        backgroundColor: '#A8D4FE',
        width: '90%',
        borderRadius: 10,
        padding: 25, // Increased padding
        marginBottom: 20,
        // Add 3D effect
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 20,
        marginBottom: 5,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Ensure equal spacing between sections
    },
    leftDetails: {
        flex: 1,
        paddingRight: 20, // Add padding to create space for vertical line
    },
    middleDetails: {
        flex: 1,
        paddingHorizontal: 20, // Add padding to create space for vertical line
        borderLeftWidth: 2, // Add vertical line
        borderColor: '#fff', // Match the card background color
    },
    rightDetails: {
        flex: 1,
        paddingLeft: 20, // Add padding to create space for vertical line
    },
    nav: {
        backgroundColor: '#75B2FF', // Match top bar color
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0, // Fixed at the bottom
        left: 0,
        right: 0,
        height: 70,
    },
    navIcon: {
        width: 35,
        height: 35,
    },
    navText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    navButton: {
        alignItems: 'center',
    },
    dayTimeHeadingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dayTimeHeading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dayTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dayTimeText: {
        fontSize: 20,
    },
});

export default PrescriptionScreen;
