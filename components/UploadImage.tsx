import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Button, View, Image, Text, TouchableOpacity } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import apiUrl from './api';
import * as FileSystem from 'expo-file-system';
export default function UploadImage(props: any) {
    const { token } = props.route.params;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    };
    const [output, setOutput] = useState<string | null>(null);
    const [type, setType] = useState<'back' | 'front'>('back');
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [isCameraReady, setCameraReady] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

            setSelectedImage(imageFile.uri);

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
            const photo = await cameraRef.current.takePictureAsync({ base64: true });
            const formData = new FormData();
            const imageFile = {
                name: 'photo.jpg',
                type: 'image/jpeg',
                uri: photo.uri,
            };

            formData.append('image', imageFile as any);

            setSelectedImage(photo.uri);

        } catch (error) {
            console.error('Error while taking photo: ', error);
        }
    };

    const toggleCameraType = () => {
        setType(current => (current === 'back' ? 'front' : 'back'));
    };

    const savePrediction = async () => {
        try {
            if (!selectedImage) {
                console.warn('No image selected to save.');
                return;
            }
    
            // Convert selected image to Base64 data
            const base64Image = await FileSystem.readAsStringAsync(selectedImage, { encoding: FileSystem.EncodingType.Base64 });
    
            // Make POST request to save the image
            const response = await axios.post(`${apiUrl}/api/upload`, { imageData: base64Image }, {
                headers: headers,
            });
    
            console.log('Image saved successfully!', response.data);
        } catch (error) {
            console.error('Error while saving image: ', error);
        }
    };
    
    
    
    
    
    

    return (
        <View style={styles.container}>
            <ExpoCamera
                style={styles.camera}
                type={type as any}

                onCameraReady={() => setCameraReady(true)}
                ref={cameraRef}
            >
                <View style={styles.cameraContainer}>
                    <TouchableOpacity style={styles.flipCameraButton} onPress={toggleCameraType}>
                        <Text style={styles.flipCameraButtonText}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </ExpoCamera>

            <View style={styles.buttonContainer}>
                <Button title="Pick something" onPress={pickSomething} />
                <Button title="Take Photo" onPress={handleCameraCapture} />
            </View>

            {selectedImage && (
                <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                    <Button title="Save" onPress={savePrediction} />
                </View>
            )}

            
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
        marginHorizontal: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
});
