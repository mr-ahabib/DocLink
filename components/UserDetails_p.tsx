import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const UserDetails = (props: any) => {
  const { email } = props.route.params;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://192.168.10.93:3000/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = async (email: string) => {
    try {
      await axios.delete(`http://192.168.10.93:3000/api/deleteUser`, {
        headers: {
            'Content-Type': 'application/json',
            'email': email 
          }
      });
      Alert.alert('Success', 'User deleted successfully');
      
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Error', 'Failed to delete user');
    }
  };
  
  

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No users found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Designation</Text>
        <Text style={styles.headerText}>Email</Text>
        <Text style={styles.headerText}>Address</Text>
        <Text style={styles.headerText}>Actions</Text>
      </View>
      {users.map((user: any, index: number) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.cellText}>{user.name}</Text>
          <Text style={styles.cellText}>{user.designation}</Text>
          <Text style={styles.cellText}>{user.email}</Text>
          <Text style={styles.cellText}>{user.address}</Text>
          <Button title="Delete" onPress={() => handleDelete(user.email)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 5,
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
  },
});

export default UserDetails;
