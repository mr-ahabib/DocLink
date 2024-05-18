import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, TextInput, Alert } from 'react-native';
import { green, blue, darkBlue } from './Color'; // assuming green color is defined in Color.js
import apiUrl from './api';

const MainPrescription = (props: any) => {
  const { token, searchValue } = props.route.params;

  const handleHomePress = () => console.log('Home pressed');
  const handlePredictPress = () => console.log('Predict pressed');
  const handleHighlightPress = () => console.log('Highlight pressed');

  const [labTests, setLabTests] = useState<string[]>(['', '', '', '', '']);
  const [medicines, setMedicines] = useState<Array<{ name: string, time: string, day: string }>>([
    { name: '', time: '', day: '' },
    { name: '', time: '', day: '' },
    { name: '', time: '', day: '' },
    { name: '', time: '', day: '' },
    { name: '', time: '', day: '' },
  ]);

  const handleMedicineInputChange = (index: number, field: keyof typeof medicines[0], value: string) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const handleSubmit = async () => {
    try {
      const prescriptionResponse = await fetch(`${apiUrl}/api/prescription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          pid: searchValue,
          medicine1: medicines[0].name,
          medicine2: medicines[1].name,
          medicine3: medicines[2].name,
          medicine4: medicines[3].name,
          medicine5: medicines[4].name,
          day1: medicines[0].day,
          day2: medicines[1].day,
          day3: medicines[2].day,
          day4: medicines[3].day,
          day5: medicines[4].day,
          time1: medicines[0].time,
          time2: medicines[1].time,
          time3: medicines[2].time,
          time4: medicines[3].time,
          time5: medicines[4].time,
        }),
      });
  
      const testsResponse = await fetch(`${apiUrl}/api/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          pid: searchValue,
          test1: labTests[0],
          test2: labTests[1],
          test3: labTests[2],
          test4: labTests[3],
          test5: labTests[4],
        }),
      });
  
      const prescriptionData = await prescriptionResponse.json();
      const testsData = await testsResponse.json();
  
      console.log('Prescription Response:', prescriptionData);
      console.log('Tests Response:', testsData);
  
      // Show success alert
      Alert.alert('Success', 'Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
      // Show error alert
      Alert.alert('Error', 'Failed to submit data');
    }
  };
  

  const renderMedicineInputs = () => {
    return medicines.map((input, index) => (
      <View key={`medicineInput${index}`} style={styles.medicineInputContainer}>
        <TextInput
          style={styles.input}
          placeholder={`Medicine ${index + 1}`}
          value={input.name}
          onChangeText={(text) => handleMedicineInputChange(index, 'name', text)}
        />
        <View style={styles.timeDayContainer}>
          <TextInput
            style={[styles.input, styles.timeInput]}
            placeholder="Time"
            value={input.time}
            onChangeText={(text) => handleMedicineInputChange(index, 'time', text)}
          />
          <TextInput
            style={[styles.input, styles.dayInput]}
            placeholder="Day"
            value={input.day}
            onChangeText={(text) => handleMedicineInputChange(index, 'day', text)}
          />
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lab Tests</Text>
          {labTests.map((test, index) => (
            <TextInput
              key={`labTest${index}`}
              style={styles.input}
              placeholder={`Lab Test ${index + 1}`}
              value={labTests[index]}
              onChangeText={(text) => {
                const updatedLabTests = [...labTests];
                updatedLabTests[index] = text;
                setLabTests(updatedLabTests);
              }}
            />
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medicine</Text>
          {renderMedicineInputs()}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Submit" onPress={handleSubmit} color={green} />
        <View style={styles.nav}>
          <TouchableOpacity style={styles.navButton} onPress={() => {
                props.navigation.navigate('Docprofile',{ 
                    token: token,
                    searchValue:searchValue,
                  });
            }}>
            <Image source={require('../assets/home (2).png')} style={styles.navIcon} />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => {
                props.navigation.navigate('SkinPredict',{ 
                    token: token,});
            }}>
            <Image source={require('../assets/camera.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Predict</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => {
                props.navigation.navigate('Ambulance',{ 
                    token: token,});
            }}>
            <Image source={require('../assets/ambu.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Ambulance</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: blue,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  footer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: blue,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  navIcon: {
    width: 35,
    height: 35,
  },
  navText: {
    color: 'black',
    fontSize: 13,
  },
  navButton: {
    alignItems: 'center',
  },
  medicineInputContainer: {
    marginBottom: 20,
  },
  timeDayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInput: {
    flex: 1,
    marginRight: 5,
  },
  dayInput: {
    flex: 1,
    marginLeft: 5,
  },
});

export default MainPrescription;
