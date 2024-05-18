import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Button, TextInput } from 'react-native';
import { blue, darkBlue } from './Color';
import MedicineInputs from './MedicineInputs';

const MainPrescription = () => {

  const handleHomePress = () => console.log('Home pressed');
  const handlePredictPress = () => console.log('Predict pressed');
  const handleHighlightPress = () => console.log('Highlight pressed');

  // State variables for lab tests and medicine inputs
  const [labTests, setLabTests] = useState<string[]>(['', '', '', '', '', '', '']);
  const [medicineName, setMedicineName] = useState<string>('');
  const [medicineFrequency, setMedicineFrequency] = useState<string>('');
  const [medicineDuration, setMedicineDuration] = useState<string>('');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lab Tests</Text>
            {/* Inputs for lab tests */}
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
          {/* Vertical line */}
          <View style={styles.verticalLine} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Medicine</Text>
           
            <MedicineInputs
              placeholder="Name"
              setMedicineName={setMedicineName}
              medicineName={medicineName}
              setMedicineFrequency={setMedicineFrequency}
              medicineFrequency={medicineFrequency}
              setMedicineDuration={setMedicineDuration}
              medicineDuration={medicineDuration}
            />
            {[...Array(6)].map((_, index) => (
              <MedicineInputs
                key={`medicine${index}`}
                placeholder={`Medicine ${index + 2}`}
                setMedicineName={(value: string) => setMedicineName(value)}
                medicineName={medicineName}
                setMedicineFrequency={(value: string) => setMedicineFrequency(value)}
                medicineFrequency={medicineFrequency}
                setMedicineDuration={(value: string) => setMedicineDuration(value)}
                medicineDuration={medicineDuration}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed position footer */}
      <View style={styles.footer}>
        <Button title="Submit" onPress={() => console.log('Submit pressed')} />
        <View style={styles.nav}>
          <TouchableOpacity style={styles.navButton} onPress={handleHomePress}>
            <Image source={require('../assets/home.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={handlePredictPress}>
            <Image source={require('../assets/camera.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Predict</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={handleHighlightPress}>
            <Image source={require('../assets/hei.png')} style={styles.navIcon} />
            <Text style={styles.navText}>Highlight</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkBlue,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '10%',
    paddingBottom: 100, // Add padding to accommodate the footer
  },
  section: {
    flex: 1,
    padding: 10,
    borderWidth: 3,
    borderColor: blue,
    borderRadius: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    borderBottomWidth: 5,
    borderBottomColor: blue,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputShort: {
    height: 40,
    width: 100, // Adjust width as needed
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: darkBlue,
    paddingVertical: 10,
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
    color: 'white',
    fontSize: 13,
  },
  navButton: {
    alignItems: 'center',
  },
  // Style for the vertical line
  verticalLine: {
    borderLeftWidth: 5,
    borderLeftColor: blue,
    marginHorizontal: 10,
    height: '100%',
  },
});

export default MainPrescription;
