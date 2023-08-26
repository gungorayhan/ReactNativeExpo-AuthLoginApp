import React from 'react'
import { View, Text, ActivityIndicator, ImageBackground, Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")
const Index = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
      <ImageBackground source={require('../../../assets/splash.png')}
        style={{ height: height * 0.30, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} />
      </ImageBackground>
    </View>
  )
}

export default Index