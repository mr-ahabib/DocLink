import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import axios from 'axios';
import { darkBlue } from './Color';
import apiUrl from './api';
import { useNavigation } from "@react-navigation/native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';


interface NotificationData {
    medicine: string;
    time: string;
}
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});
const UserHome = (props: any) => {
    const { token } = props.route.params;
    const [expoPushToken, setExpoPushToken] = useState<string>('');
    const [notification, setNotification] = useState<NotificationData | null>(null);
    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };

    const handleHomePress = () => console.log('Home pressed');
    const handleHighlightPress = () => props.navigation.navigate('DoctorList', {
        token: token,
    });


    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        gender: '',
        dob: '',
        phone: '',
        bloodGroup: ''
    });

    const handlePredictPress = () => {
        props.navigation.navigate('SkinPredict', {
            token: token,
        });
    };

    const fetchUserAlarm = async () => {
        try {

            const response = await axios.get<NotificationData[]>(`${apiUrl}/api/notification`, { headers });

            response.data.forEach(async (notification: NotificationData) => {
                await Notifications.scheduleNotificationAsync({
                            content: {
                                title: "ঔষধ সতর্কতা",
                                body: `Reminder: ${notification.medicine} - Time: ${notification.time}`,
                            },
                            trigger: { seconds: 2 }, 
                        });
               
    });




} catch (error) {
    // Handle error, maybe show an alert
}
    };


useEffect(() => {

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(receivedNotification => {
        const notificationData = receivedNotification.request.content.data as NotificationData | null;
        if (notificationData) {
            setNotification(notificationData);
        }
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
    });


    const fetchUserDetails = async () => {
        try {
            setLoading(true);



            const response = await axios.get(`${apiUrl}/api/userdetails`, { headers });
            const userData = response.data;

            setUserInfo({
                name: userData.name,
                gender: userData.gender,
                dob: userData.dob,
                phone: userData.phone,
                bloodGroup: userData.bloodGroup
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user details:', error);
            setLoading(false);
            // Handle error, maybe show an alert
            Alert.alert('Error', 'Failed to fetch user details');
        }
    };



    fetchUserDetails();
    fetchUserAlarm();

    return () => {
        if (notificationListener.current) {
            Notifications.removeNotificationSubscription(notificationListener.current);
        }
        if (responseListener.current) {
            Notifications.removeNotificationSubscription(responseListener.current);
        }
    };
}, []); // Empty dependency array means this effect runs only once on mount

const updateProfile = () => {
    props.navigation.navigate('ProfileUpdate', {
        token: token,
    });
};

const setTimer = () => {
    props.navigation.navigate('Alarm', {
        token: token,
    });
};

async function registerForPushNotificationsAsync(): Promise<string> {
    let token = '';

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return token;
        }
        const expoPushToken = await Notifications.getExpoPushTokenAsync({ projectId: 'bcc60e42-1104-4c8d-8de9-c78cc8f14c43' });
        if (expoPushToken.data) {
            token = expoPushToken.data;
            console.log(token);
        }
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}




const { name, gender, dob, phone, bloodGroup } = userInfo;
const navigateToAnotherPage = () => {
    // Navigate to another page
    props.navigation.navigate('UploadImage', {
        token: token,
    });
};

return (
    <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
            <Image source={require('../assets/DocLink1.png')} style={styles.image} />
            <Text style={styles.dateTime}>{new Date().toLocaleString()}</Text>
        </View>

        <View style={styles.content}>
            {/* User Details */}
            <View style={styles.userDetailsContainer}>
            <TouchableOpacity onPress={navigateToAnotherPage}>
    <Image source={require('../assets/patient.png')} style={styles.image1} />
</TouchableOpacity>

                <View style={styles.userInfo}>
                    <Text style={styles.userInfoText}>Name: {name}</Text>
                    <Text style={styles.userInfoText}>Gender: {gender}</Text>
                    <Text style={styles.userInfoText}>Date of Birth: {dob}</Text>
                    <Text style={styles.userInfoText}>Phone: {phone}</Text>
                    <Text style={styles.userInfoText}>Blood Group: {bloodGroup}</Text>
                </View>
            </View>

            {/* Update Profile Button */}
            <TouchableOpacity style={styles.updateProfileButton} onPress={updateProfile}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.updateProfileButton} onPress={setTimer}>
                <Text style={styles.buttonText}>Set Timer</Text>
            </TouchableOpacity>

            {/* Health Status */}
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

            {/* Bottom Buttons */}
            <View style={styles.bottomButtonsContainer}>
                <TouchableOpacity style={styles.bottomButton} onPress={() => props.navigation.navigate('Ambulance')}>
                    <Image source={require('../assets/ambulance (1).png')} style={styles.buttonImage} />
                    <Text>Ambulance</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomButton} onPress={() => props.navigation.navigate('Ambulance')}>
                    <Image source={require('../assets/scan.png')} style={styles.buttonImage} />
                    <Text>Scan Prescription</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomButton} onPress={() => props.navigation.navigate('PrescriptionScreen', { token: token })}>
                    <Image source={require('../assets/prescription.png')} style={styles.buttonImage} />
                    <Text>My Prescription</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.nav}>
            <TouchableOpacity style={styles.navButton} onPress={handleHomePress}>
                <Image source={require('../assets/home (2).png')} style={styles.navicon} />
                <Text style={styles.navtext}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={handlePredictPress}>
                <Image source={require('../assets/camera.png')} style={styles.navicon} />
                <Text style={styles.navtext}>Predict</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={handleHighlightPress}>
                <Image source={require('../assets/medical-team.png')} style={styles.navicon} />
                <Text style={styles.navtext}>All Doctors</Text>
            </TouchableOpacity>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A8D4FE',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: darkBlue,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    dateTime: {
        color: 'white',
        fontSize: 16,
    },
    image: {
        width: 200,
        height: 50,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    userDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    image1: {
        width: 141,
        height: 133,
    },
    userInfo: {
        marginLeft: 20,
    },
    userInfoText: {
        fontSize: 16,
        marginBottom: 8,
    },
    updateProfileButton: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginBottom: 20,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    healthStatusContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
    circle: {
        width: 140,
        height: 140,
        borderRadius: 75,
        backgroundColor: '#A8D4FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
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
        alignItems: 'center',
    },
    healthDetailText: {
        color: 'black',
        fontSize: 14,
        fontWeight: '600',
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    bottomButton: {
        alignItems: 'center',
    },
    buttonImage: {
        width: 78,
        height: 78,
        borderRadius: 39,
    },
    nav: {
        backgroundColor: darkBlue,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
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
        color: 'white',
        fontSize: 13,
    },
});

export default UserHome;
