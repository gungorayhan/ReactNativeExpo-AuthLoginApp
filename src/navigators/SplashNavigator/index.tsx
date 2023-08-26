import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Splash from "../../screens/Splash"
const Stack =createNativeStackNavigator()

function index() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Splash' component={Splash} 
        options={{
          headerShown:false
          }}/>
      </Stack.Navigator>
  )
}

export default index