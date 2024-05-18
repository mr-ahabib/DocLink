import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from './components/Login'
import { color } from 'react-native-elements/dist/helpers';
import Register from './components/Register';

import UserHome from './components/UserHome';
import ProfileUpdate from './components/ProfileUpdate';
import InputUser from './components/InputUser';
import Dlogin from './components/Dlogin';
import Docprofile from './components/Docprofile';

import DocProfileUpdate from './components/DocProfileUpdate';
import DoctorList from './components/DoctorList';
import MainPrescription from './components/MainPrescription';
import PrescriptionScreen from './components/PrescriptionScreen';
import SkinPredict from './components/skinPredict';
import Ambulance from './components/Ambulance';
import PrescriptionWrite from './components/PrescriptionWrite';
import Alarm from './components/Alarm';
import UploadImage from './components/UploadImage';



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
              <Stack.Screen name="UserHome" component={UserHome} options={{ headerShown: false }} />
              <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} options={{ headerShown: false }} />
              <Stack.Screen name="InputUser" component={InputUser} options={{ headerShown: false }} />
              <Stack.Screen name="Dlogin" component={Dlogin} options={{ headerShown: false }} />
              <Stack.Screen name="Docprofile" component={Docprofile} options={{ headerShown: false }} />
              <Stack.Screen name="DocProfileUpdate" component={DocProfileUpdate} options={{ headerShown: false }} />
              <Stack.Screen name="DoctorList" component={DoctorList} options={{ headerShown: false }} />
              <Stack.Screen name="MainPrescription" component={MainPrescription} options={{ headerShown: false }} />
              <Stack.Screen name="PrescriptionScreen" component={PrescriptionScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SkinPredict" component={SkinPredict} options={{ headerShown: false }} />
              <Stack.Screen name="Ambulance" component={Ambulance} options={{ headerShown: false }} />
              <Stack.Screen name="PrescriptionWrite" component={PrescriptionWrite} options={{ headerShown: false }} />
              <Stack.Screen name="Alarm" component={Alarm} options={{ headerShown: false }} />
              <Stack.Screen name="UploadImage" component={UploadImage} options={{ headerShown: false }} />


              
              
              
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
