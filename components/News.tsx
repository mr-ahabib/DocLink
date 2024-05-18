import React from "react";
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const News = () => {
  const navigation = useNavigation();

  const navigateToSecondPage = () => {
    navigation.navigate('Second');
  };

  const navigateToReport = () => {
    navigation.navigate('Report');
  };

   

  return (
    <ScrollView>
      <Button title="Second" onPress={navigateToSecondPage} />
      <Button title="Report" onPress={navigateToReport} />
    </ScrollView>
  );
};

export default News;
