import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Platform, StatusBar, Modal, ScrollView, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import apiUrl from './api';
import axios from 'axios';

interface Medicine {
  id: string;
  medicine: string;
  date: string;
  time: string;
  frequency: string;
}

const Alarm: React.FC = (props:any) => {
  const { token } = props.route.params;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token,
  };

  const [medicineName, setMedicineName] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [timingModalVisible, setTimingModalVisible] = useState(false);
  const [timing, setTiming] = useState<string>('Once');
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    fetchAlarmData();
  }, []);

  const fetchAlarmData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/findalarm`, {
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch alarm data');
      }

      const data = await response.json();
      setMedicines(data); // Assuming data is an array of Medicine objects
    } catch (error) {
      console.error('Error fetching alarm data:', error);
      Alert.alert('Error', 'Failed to fetch alarm data. Please try again later.');
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDateTime = (date: Date) => {
    hideDatePicker();
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDateTime(new Date(formattedDate));
  };
  

  const handleSubmit = async () => {
    if (!medicineName || !selectedDateTime) {
      Alert.alert('Please fill all fields');
      return;
    }

    const newMedicine: Medicine = {
      id: Math.random().toString(), // This should be generated on the server side
      medicine: medicineName,
      date: selectedDateTime?.toLocaleDateString() || '',
      time: selectedDateTime?.toLocaleTimeString([], { hour12: false }) || '',
      frequency: timing,
    };

    try {
      const response = await fetch(`${apiUrl}/api/alarm`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newMedicine),
      });

      if (!response.ok) {
        throw new Error('Failed to create alarm');
      }

      setMedicines([...medicines, newMedicine]);
      setMedicineName('');
      setSelectedDateTime(null);
      setTiming('Once');
    } catch (error) {
      console.error('Error creating alarm:', error);
      Alert.alert('Error', 'Failed to create alarm. Please try again later.');
    }
  };

  const handleDelete  = async (id: string) => {
    console.log(id)
    const response = await axios.delete( `${apiUrl}/api/alarmDelete`, {
        params: {
            'id': id,
        },

    })
    if(response){
        Alert.alert('Success', 'Delete Successfully');
        fetchAlarmData();

    }


    const updatedMedicines = medicines.filter(medicine => medicine.id !== id);
    setMedicines(updatedMedicines);
  };

  return (
    <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, padding: 20 }}>
      <TextInput
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
        placeholder="Medicine Name"
        value={medicineName}
        onChangeText={text => setMedicineName(text)}
      />

      <TouchableOpacity onPress={showDatePicker} style={{ marginBottom: 10 }}>
        <Text style={{ padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>Pick Date and Time</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirmDateTime}
        onCancel={hideDatePicker}
      />

      <TouchableOpacity onPress={() => setTimingModalVisible(true)} style={{ marginBottom: 10 }}>
        <Text style={{ padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>Select Timing: {timing}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={timingModalVisible}
        onRequestClose={() => setTimingModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
            <TouchableOpacity onPress={() => { setTiming('Once'); setTimingModalVisible(false); }} style={{ marginBottom: 10 }}>
              <Text>Once</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setTiming('Everyday'); setTimingModalVisible(false); }} style={{ marginBottom: 10 }}>
              <Text>Everyday</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTimingModalVisible(false)} style={{ marginBottom: 10 }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Button title="Submit" onPress={handleSubmit} />

      <ScrollView style={{ marginTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 10 }}>
          <Text style={styles.tableHeader}>ID</Text>
          <Text style={styles.tableHeader}>Medicine</Text>
          <Text style={styles.tableHeader}>Date and Time</Text>
          <Text style={styles.tableHeader}>Frequency</Text>
          <Text style={styles.tableHeader}>Action</Text>
        </View>

        {medicines.map(medicine => (
          <View key={medicine.id} style={{ height:50,flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 10 }}>
            <Text style={{ flex: 1 }}>{medicine.id}</Text>
            <Text style={{ flex: 1 }}>{medicine.medicine}</Text>
            <Text style={{ flex: 1 }}>{medicine.date} {medicine.time}</Text>
            <Text style={{ flex: 1 }}>{medicine.frequency}</Text>
            <TouchableOpacity onPress={() => handleDelete(medicine.id)} style={{  justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderRadius: 5 , width:60}}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Alarm;
