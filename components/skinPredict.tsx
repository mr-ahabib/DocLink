

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Button, View, Image, Text, TouchableOpacity } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

export default function SkinPredict(props: any) {
    const { token } = props.route.params;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };

    const apiUrl = 'http://192.168.254.93:5000/uploadimg';
    const [output, setOutput] = useState<string | null >(null)
    const [type, setType] = useState('back' as 'back' | 'front');
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [isCameraReady, setCameraReady] = useState(false);

    const cameraRef = useRef<any>(null);

    useEffect(() => {
        (async () => {
            const { status } = await ExpoCamera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    if (hasCameraPermission === null) {
        return <Text>Requesting camera permission...</Text>;
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const pickSomething = async () => {
        try {
            const docRes = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
            });

            const formData = new FormData();
            const assets = docRes.assets;

            if (!assets) return;

            const file = assets[0];

            const imageFile = {
                name: file.name,
                uri: file.uri,
                type: file.mimeType,
                size: file.size,
            };

            formData.append('image', imageFile as any);

            const axiosConfig = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            };

            const response = await axios.post(apiUrl, formData, axiosConfig);
            console.log(response.data.prediction)
            setOutput(response.data.prediction)

        } catch (error) {
            console.error('Error while selecting file: ', error);
        }
    };

    const handleCameraCapture = async () => {
        if (!cameraRef.current || !isCameraReady) {
            console.warn('Camera is not ready yet. Wait for onCameraReady callback.');
            return;
        }

        try {
            const photo = await (cameraRef.current as any).takePictureAsync({ base64: true });
            const formData = new FormData();
            const imageFile = {
                name: 'photo.jpg',
                type: 'image/jpeg',
                uri: photo.uri,
            };

            formData.append('image', imageFile as any);

            const axiosConfig = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            };

            const response = await axios.post(apiUrl, formData, axiosConfig);
            console.log(response.data.prediction)
            setOutput(response.data.prediction)
        } catch (error) {
            console.error('Error while taking photo: ', error);
        }
    };

    const toggleCameraType = () => {
        setType((current: "back" | "front") =>
            current === "back" ? "front" : "back"
        );
    };

    return (
        <View style={styles.container}>
            <ExpoCamera
                style={styles.camera}
                type={type as any}

                onCameraReady={() => setCameraReady(true)}
                ref={(ref) => (cameraRef.current = ref!)}
            >
                <View style={styles.cameraContainer}>
                    <TouchableOpacity style={styles.flipCameraButton} onPress={toggleCameraType}>
                        <Text style={styles.flipCameraButtonText}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </ExpoCamera>

            <View style={styles.buttonContainer}>
            <Button title="Pick something" onPress={pickSomething}  />
                <Button title="Take Photo" onPress={handleCameraCapture} />
            </View>
            <View>
                <Text style={{fontSize:18,marginTop:20}}>DocLink predicts that, you are affected with:</Text>
                </View>
            <View>

                <Text style={{fontSize:30,marginTop:20}}>{output}</Text>
            </View>
            <View>
                <Text style={{fontSize:16,marginTop:50}}>N.B: Please visit to a doctor near by you. Thank you.</Text>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        

    },
    camera: {
        width: '100%',
        height: 500,

    },
    cameraContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 20,
    },
    flipCameraButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 15,
    },
    flipCameraButtonText: {
        color: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginHorizontal: 10 
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});
