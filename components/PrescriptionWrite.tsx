import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import apiUrl from './api';

const PrescriptionWrite = (props: any) => {
    const { token, searchValue } = props.route.params;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };

    const [prescriptions, setPrescriptions] = useState([]);
    const [tests, setTests] = useState([]);
    const [dateTime, setDateTime] = useState(new Date().toLocaleString());
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch prescriptions with token
                const prescriptionResponse = await axios.get(`${apiUrl}/api/findpatient`, {
                    params: {
                        'pid': searchValue,
                    },
                });
                setPrescriptions(prescriptionResponse.data);

                // Fetch tests with token
                const testResponse = await axios.get(`${apiUrl}/api/findtest`, {
                    params: {
                        'pid': searchValue,
                    },
                });
                setTests(testResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Update current date and time every second
        const intervalId = setInterval(() => {
            setDateTime(new Date().toLocaleString());
        }, 1000);

        // Clean up the interval
        return () => clearInterval(intervalId);
    }, [token]);

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                {/* Left: Logo */}
                <Image source={require('../assets/DocLink1.png')} style={styles.logo} />

                {/* Right: Date and Time */}
                <Text style={[styles.dateTime, { color: 'black' }]}>{dateTime}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Map over prescriptions and render cards */}
                {prescriptions.map((prescription, index) => (
                    <View style={[styles.card, index === 0 ? { marginTop: 20 } : null]} key={index}>
                        {/* Render createdAt */}
                        <Text style={styles.createdAt}>{prescription.createdAt}</Text>

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

            {/* Bottom Navigation */}
            <View style={styles.nav}>
                <TouchableOpacity style={styles.navButton} onPress={() => {
                props.navigation.navigate('Docprofile',{ 
                    token: token,
                    searchValue: searchValue,
                });
            }}>
                    <Image source={require('../assets/home (2).png')} style={styles.navicon} />
                    <Text style={styles.navtext}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => {
                props.navigation.navigate('SkinPredict',{ 
                    token: token,});
            }}>
                    <Image source={require('../assets/camera.png')} style={styles.navicon} />
                    <Text style={styles.navtext}>Predict</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => {
                props.navigation.navigate('Ambulance')}}>
                    <Image source={require('../assets/ambu.png')} style={styles.navicon} />
                    <Text style={styles.navtext}>Ambulance</Text>
                </TouchableOpacity>
            </View>

            {/* Create Prescription button */}
            <TouchableOpacity style={styles.createButton} onPress={() => {
                props.navigation.navigate('MainPrescription', { 
                    token: token,
                    searchValue: searchValue,
                });
            }}>
                <Text style={styles.createButtonText}>Create Prescription</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Set page background to white
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#75B2FF',
        paddingHorizontal: 20,
        paddingTop: 40, // Adjust as needed for top padding
        paddingBottom: 10,
    },
    logo: {
        width: 200,
        height: 50,
    },
    dateTime: {
        fontSize: 16,
        color: 'black',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#B4D9EF', // Change card background color to gray
        width: '95%',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        minHeight: 300, // Set minimum height for the card
    },
    createdAt: {
        fontSize: 16,
        marginBottom: 10,
        color: 'black',
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
        justifyContent: 'space-between',
    },
    leftDetails: {
        flex: 1,
        paddingRight: 20,
    },
    middleDetails: {
        flex: 1,
        paddingHorizontal: 20,
        borderLeftWidth: 2,
        borderColor: '#fff',
    },
    rightDetails: {
        flex: 1,
        paddingLeft: 20,
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
    createButton: {
        backgroundColor: 'green',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: 80,
        right: 20,
    },
    createButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#75B2FF',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
    },
    navButton: {
        alignItems: 'center',
    },
    navicon: {
        width: 35,
        height: 35,
        marginBottom: 5,
    },
    navtext: {
        color: 'black',
        fontSize: 13,
    },
});

export default PrescriptionWrite;
