import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { Camera } from 'expo-camera'; 
import * as DocumentPicker from 'expo-document-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons'; // Import Feather icon
import { blue } from './Color';
import { Platform } from 'react-native';

type LocalCameraType = 'front' | 'back';

const CAMERA_TYPE_FRONT: LocalCameraType = 'front';
const CAMERA_TYPE_BACK: LocalCameraType = 'back';

export default function DocumentPickerExample() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<LocalCameraType>(CAMERA_TYPE_BACK);
  const cameraRef = useRef<Camera>(null);
  const { showActionSheetWithOptions } = useActionSheet();
  const [cameraOn, setCameraOn] = useState<boolean>(false); 
  const [gender, setGender] = useState<string | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const districts = ['Pabna', 'Bagura', 'Dhaka']; 
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
  const professionals = ['Engineer', 'Doctor', 'Teacher']; 
  const [showBoxes, setShowBoxes] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string | null>(null);

  const handleHeightClick = () => {
    setShowBoxes(!showBoxes);
  };

  const selectProfessional = (professional: string) => {
    setSelectedProfessional(professional);
  };

  const pickProfessional = () => {
    const options = professionals.concat(['Cancel']);
    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        containerStyle: {
          backgroundColor: blue,
          borderRadius: 10,
        },
        textStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      },
      (buttonIndex) => {
        if (buttonIndex !== undefined && buttonIndex !== cancelButtonIndex) {
          selectProfessional(options[buttonIndex]);
        }
      }
    );
  };

  const onDOBPress = () => {
    setShowDatePicker(true);
  };
  
  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const pictureResult = await cameraRef.current?.takePictureAsync();
        setSelectedImage(pictureResult.uri);
      } catch (error) {
        handleCameraError(error);
      }
    }
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === CAMERA_TYPE_BACK
        ? CAMERA_TYPE_FRONT
        : CAMERA_TYPE_BACK
    );
  };

  const pickDocument = async () => {
    const options = ['Take a photo', 'Choose from the gallery', 'Remove profile pic', 'Cancel'];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        containerStyle: {
          backgroundColor: blue,
          borderRadius: 10,
        },
        textStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      },
      async (buttonIndex) => {
        if (buttonIndex === 0 && hasPermission) {
          setCameraOn(true); 
        } else if (buttonIndex === 1) {
          let result = await DocumentPicker.getDocumentAsync({
            type: 'image/*',
          });
          if (!result.canceled && result.assets) {
            setSelectedImage(result.assets[0].uri);
            setCameraOn(false); 
          }
        } else if (buttonIndex === 2) {
          setSelectedImage(null);
          setCameraOn(false); 
        }
      }
    );
  };

  const handleCameraError = (error: unknown) => {
    const errorMessage = typeof error === 'string' ? error : (error as Error).message;
    Alert.alert('Error', `Failed to open camera: ${errorMessage}`);
    console.error('Failed to open camera:', errorMessage);
  };

  const pickDistrict = () => {
    const options = districts.concat(['Cancel']);
    const cancelButtonIndex = options.length - 1;
  
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        containerStyle: {
          backgroundColor: blue,
          borderRadius: 10,
        },
        textStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      },
      (buttonIndex) => {
        if (buttonIndex !== undefined && buttonIndex !== cancelButtonIndex) {
          setSelectedDistrict(options[buttonIndex]);
        }
      }
    );
  };

  const handleSaveChanges = () => {
    if (!selectedImage || !gender || !dateOfBirth || !selectedDistrict || !selectedProfessional || !selectedBloodGroup) {
      Alert.alert('Incomplete Information', 'Please fill all the required fields before saving changes.');
    } else {
      Alert.alert('Success', 'Your information has been saved successfully.');
    }
  };

  if (hasPermission === null) {
    return <View><Text>Requesting camera permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={pickDocument}>
          <View style={[styles.imageContainer, selectedImage ? styles.imageContainerWithImage : null]}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            ) : (
              <Text style={styles.changePhotoText}>Change Photo</Text>
            )}
            {cameraOn && ( 
              <TouchableOpacity style={styles.offCameraButton} onPress={() => setCameraOn(false)}>
                <Text style={styles.offCameraText}>Off Camera</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
        
        <View style={styles.gap}></View>

        <TextInput
          placeholder="Full Name *" 
          style={styles.input}
        />
        
        <Text style={styles.title}>Gender *</Text>
        <View style={styles.radioButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              gender === 'male' ? styles.radioButtonSelected : {}
            ]}
            onPress={() => setGender('male')}
          >
            <View style={gender === 'male' ? styles.radioButtonInnerSelected : {}} />
            <Text style={styles.radioButtonText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              gender === 'female' ? styles.radioButtonSelected : {}
            ]}
            onPress={() => setGender('female')}
          >
            <View style={gender === 'female' ? styles.radioButtonInnerSelected : {}} />
            <Text style={styles.radioButtonText}>Female</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title1}>Date Of birth *</Text>
        <View style={styles.dateOfBirthContainer}>
          <TouchableOpacity onPress={onDOBPress}>
            <Text style={styles.dateText}>
              {dateOfBirth.toDateString()} 
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>

        <View style={styles.districtContainer}>
          <TextInput
            placeholder="District *"
            style={[styles.input, { paddingRight: 40 }]} 
            value={selectedDistrict || ''}
            editable={false} 
          />
          <TouchableOpacity onPress={pickDistrict} style={styles.dropdownIcon}>
            <Feather name="chevron-down" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Phone Number" 
          style={styles.inputphn} 
        />

        <TextInput
          placeholder="Email address" 
          style={styles.inputeml} 
        />

        <View style={styles.professionalContainer}>
          <TextInput
            placeholder="Professional *"
            style={[styles.input, { paddingRight: 40 }]} 
            value={selectedProfessional || ''}
            editable={false} 
          />
          <TouchableOpacity onPress={pickProfessional} style={styles.dropdownIcon}>
            <Feather name="chevron-down" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.container1}>
          <Text style={styles.title2}>Height</Text>
          <View style={styles.inputBoxContainer}>
            <View style={styles.inputBox}>
              
              <TextInput
                style={styles.input2}
                placeholder="Feet"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputBox}>
              
              <TextInput
                style={styles.input2}
                placeholder="Inch"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputBox}>
              
              <TextInput
                style={styles.input2}
                placeholder="Kg"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>


        <View style={styles.container3}>
          <Text style={styles.title3}>Blood Group</Text>
          <View style={styles.bloodGroupContainer}>
            
            <TouchableOpacity
              style={[styles.bloodGroup, selectedBloodGroup === 'A+' ? styles.selectedBloodGroup : null]}
              onPress={() => setSelectedBloodGroup('A+')}
            >
              <Text style={styles.bloodGroupText}>A+</Text>
            </TouchableOpacity>
            {/* Add similar TouchableOpacity components for other blood groups */}
            <TouchableOpacity
              style={[styles.bloodGroup, selectedBloodGroup === 'A-' ? styles.selectedBloodGroup : null]}
              onPress={() => setSelectedBloodGroup('A-')}
            >
              <Text style={styles.bloodGroupText}>A-</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bloodGroup, selectedBloodGroup === 'B+' ? styles.selectedBloodGroup : null]}
              onPress={() => setSelectedBloodGroup('B+')}
            >
              <Text style={styles.bloodGroupText}>B+</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.bloodGroup, selectedBloodGroup === 'B-' ? styles.selectedBloodGroup : null]}
              onPress={() => setSelectedBloodGroup('B-')}
            >
              <Text style={styles.bloodGroupText}>B-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bloodGroup, selectedBloodGroup === 'AB+' ? styles.selectedBloodGroup : null]}
              onPress={() => setSelectedBloodGroup('AB+')}
            >
              <Text style={styles.bloodGroupText}>AB+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bloodGroup, selectedBloodGroup === 'AB-' ? styles.selectedBloodGroup : null]}
              onPress={() => setSelectedBloodGroup('AB-')}
            >
              <Text style={styles.bloodGroupText}>AB-</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bloodGroup, selectedBloodGroup === '0+' ? styles.selectedBloodGroup : null]}
              onPress={() => setSelectedBloodGroup('0+')}
            >
              <Text style={styles.bloodGroupText}>0+</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bloodGroup, selectedBloodGroup === '0-' ? styles.selectedBloodGroup : null]}
              onPress={() => setSelectedBloodGroup('0-')}
            >
              <Text style={styles.bloodGroupText}>0-</Text>
            </TouchableOpacity>


          </View>
        </View>

        
        <View style={styles.cameraContainer}>
          {cameraOn && ( 
            <Camera
              style={styles.camera}
              type={cameraType as Camera['props']['type']}
              ref={cameraRef}
            >
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <Text style={styles.captureButtonText}>Capture</Text>
              </TouchableOpacity>
            </Camera>
          )}
          {cameraOn && ( 
            <TouchableOpacity style={styles.toggleCameraButton} onPress={toggleCameraType}>
              <Text style={styles.toggleCameraText}>Toggle Camera</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Save Changes button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    
    backgroundColor:'white'
  },
  container: {
    marginTop: '10%',
    marginBottom: '30%',
    alignItems: 'center',
    
  },
  input: {
    width: '95%',
    height: 30,
    borderRadius: 7,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: '20%',
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'grey',
    alignItems: 'center',
  },
  imageContainerWithImage: {
    backgroundColor: 'lightgray',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  changePhotoText: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 5,
  },
  offCameraButton: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  offCameraText: {
    color: 'white',
    fontSize: 16,
  },
  cameraContainer: {
    width: '100%',
    height: 400, 
    //justifyContent: 'center', // Align camera vertically in the middle
    alignItems: 'center', 
    marginTop:'-100%'
  },
  toggleCameraButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  toggleCameraText: {
    color: 'white',
    fontSize: 16,
  },
  camera: {
    width: '90%',
    height: '90%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  captureButtonText: {
    fontSize: 12,
    color: '#000',
  },
  gap: {
    height: 20,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: '-80%',
    marginTop: '-18%'
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    padding: 10,
    marginRight: '10%',
  },
  radioButtonSelected: {
    backgroundColor: 'green',
  },
  radioButtonInnerSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginRight: 5,
  },
  radioButtonText: {
    fontSize: 8,
    color: 'black',
    width: 100,
    height: 10,
  },
  title1: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: '-70%',
    marginTop: '-2%'
  },
  dateText: {
    fontSize: 18,
  },
  dateOfBirthContainer: {
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 7,
    padding: 1,
    marginBottom: 20,
    width: '50%',
  },
  districtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  dropdownIcon: {
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: [{ translateY: -45 }],
  },
  inputphn: {
    width: '95%',
    height: 30,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    marginTop: '-17%',
    paddingHorizontal: 10,
  },
  inputeml: {
    width: '95%',
    height: 30,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    marginTop: '3%',
    paddingHorizontal: 10,
  },
  professionalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
    marginTop: '3%',
  },
  title2: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: '-80%',
    marginTop: '-38%'
  },
  title3:{
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: '-75%',
    marginTop: '-8%'

  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,

  },
  box: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  feetText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  inputBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputBox: {
    flex: 1, 
    marginRight: 10, 
    
  },
  input2: {
    width: '90%',
    height: 30,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    marginTop: '-15%',
    paddingHorizontal: 10,
    marginLeft:'10%',
    
  },
  container3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '22%', 
    height: 10,
  },
 
  bloodGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
  },
  bloodGroup: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10, 
  },
  selectedBloodGroup: {
    borderColor: 'blue',
    backgroundColor: 'lightblue',
  },
  bloodGroupText: {
    fontSize: 8, 
  },
  saveButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
