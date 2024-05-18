// components/MedicineAlarmScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AlarmButton from '../components/AlarmButton';

interface MedicineAlarmScreenProps {
  onAlarmSet: () => void;
}

const MedicineAlarmScreen: React.FC<MedicineAlarmScreenProps> = ({ onAlarmSet }) => {
  const [isAlarmSet, setIsAlarmSet] = useState<boolean>(false);

  const handleSetAlarm = () => {
    // Logic to set alarm goes here
    setIsAlarmSet(true);
    onAlarmSet(); // Notify parent component that alarm is set
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Medicine Alarm</Text>
      {isAlarmSet ? (
        <Text>Alarm Set Successfully!</Text>
      ) : (
        <AlarmButton onPress={handleSetAlarm} title="Set Alarm" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default MedicineAlarmScreen;
