import React from 'react'
import { View,StyleSheet,Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Home from "../../screens/Home"

const Stack = createNativeStackNavigator();
function index() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  )
}

export default index