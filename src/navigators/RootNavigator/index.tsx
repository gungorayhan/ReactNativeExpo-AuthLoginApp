import React, { useState, useEffect, useCallback } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRefreshMutation } from '../../app/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font"
import Entypo from '@expo/vector-icons/Entypo';
//navigators
import AuthStack from "../AuthStackNavigator"
import HomeStack from "../HomeStackNavigator"
import SplashStack from "../SplashNavigator"
import { useAppSelector,useAppDispatch } from '../../hooks/soreHooks'
import { logOut } from '../../features/auth/authSlice';
import {View} from "react-native"
//SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
function Index() {
  const dispatch = useAppDispatch()
  const authToken = useAppSelector((state) => state.auth?.accessToken)
  const [persist, setPersist] = useState<boolean>(false)
  const [refresh, { isLoading, isSuccess, isError, isUninitialized }] = useRefreshMutation()

 

  const font = async () => {
    await Font.loadAsync(Entypo.font)
  }
  const splashHide = async () => {
    await SplashScreen.hideAsync()

  }

  let content = <SplashStack />

  useEffect(() => {
    async function getRefreshToken() {
      //console.log(persist +   "çıkış yapıldı")
      try {
        const value = await AsyncStorage.getItem("refreshToken")

        if (value !== null) {
          refresh(value)
          //console.log("value" + value)
          setPersist(false)
        }
        else {
          //console.log("setpersist true")
          setPersist(true)
        }
      } catch (error) {
        console.error(error)
      }
    }
    setTimeout(()=>{
      if (!authToken) getRefreshToken()
    },1500)
    

  //console.log(persist +"-"+ !authToken)
  }, [authToken])


 
  if (persist && !authToken) {
    content = <AuthStack />
  }
  else if (isLoading) {
   // console.log("loading")
    content = <SplashStack />
  }
  else if (isError) {
    content = <AuthStack />
    dispatch(logOut())
    //console.log("error")
  }
  else if (isSuccess && authToken) {
    //console.log("issuccess authToken")
    content = <HomeStack />
  }
  else if (authToken && isUninitialized) {
    //console.log(authToken + "authtoken - isun")
    content = <HomeStack />
  }
  


  return (
    <NavigationContainer>
      {content}
    </NavigationContainer>
  )
}

export default Index
