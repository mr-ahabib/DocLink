import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';


interface MedicineInputsProps {
  placeholder: string;
}

const MedicineInputs: React.FC<MedicineInputsProps> = ({ placeholder }) => {
  const [medicineName, setMedicineName] = useState('');
  const [medicineFrequency, setMedicineFrequency] = useState('');
  const [medicineDuration, setMedicineDuration] = useState('');

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={`Medicine ${placeholder}`}
        value={medicineName}
        onChangeText={setMedicineName}
      />
      <TextInput
        style={styles.input}
        placeholder="Frequency (e.g., 0-0-0)"
        value={medicineFrequency}
        onChangeText={setMedicineFrequency}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration"
        value={medicineDuration}
        onChangeText={setMedicineDuration}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default MedicineInputs;
