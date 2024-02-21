import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from './components/Login'
import { color } from 'react-native-elements/dist/helpers';
import Register from './components/Register';

const Stack = createStackNavigator();


const App=()=>{
  return (

    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
    <Stack.Navigator initialRouteName="HomeScreen">
   
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
              
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
              
              
            </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>


   
  );
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8D4FE',
    paddingTop:40
  },
});
