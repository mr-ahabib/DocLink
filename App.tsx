import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from './components/Home'
import Login from './components/Login'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
<Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default App