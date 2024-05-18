import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

interface Teacher {
  id: number;
  name: string;
}

interface TeacherListProps {
  navigation: any; // Adjust type as per your navigation setup
}

const TeacherList: React.FC<TeacherListProps> = ({ navigation }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Teacher[]>(`http://10.10.250.80:3000/api/getTeacher`);
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleTeacherPress = (teacherId: number) => {
    navigation.navigate('UpdateSalary', { teacherId });
  };

  return (
    <View>
      <Text>Teachers:</Text>
      {teachers.map((teacher) => (
        <TouchableOpacity key={teacher.id} onPress={() => handleTeacherPress(teacher.id)}>
          <Text style={styles.teacherName}>{teacher.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  teacherName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    color: 'blue',
  },
});

export default TeacherList;
