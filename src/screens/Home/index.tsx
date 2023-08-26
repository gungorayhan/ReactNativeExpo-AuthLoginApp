import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from "react-native"
import { logOut } from '../../features/auth/authSlice'
import { useAppDispatch } from '../../hooks/soreHooks'
import AsyncStorage from "@react-native-async-storage/async-storage"
function Index() {
    const dispatch= useAppDispatch()

    const cikis=async()=>{
        dispatch(logOut())
    }
    return (
        <View>
            <Text>Home Screen</Text>
            <TouchableOpacity
                onPress={()=>cikis()}
            ><Text>Çıkış Yap</Text></TouchableOpacity>
        </View>
    )
}

export default Index