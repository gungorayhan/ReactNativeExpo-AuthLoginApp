import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screen
import Login from "../../screens/Auth/Login"

const Stack = createNativeStackNavigator();
function index() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} 
          options={{
          headerTitle:'FABRITECH'
          }}
        />
    </Stack.Navigator>
  )
}

export default index