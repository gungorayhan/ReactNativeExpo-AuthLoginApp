import React, { useState, useEffect } from 'react'
import { ScrollView, KeyboardAvoidingView, Button, Image,View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet } from "react-native"
import * as yup from "yup"
import { useFormik, Formik } from "formik"
import { ILogin } from '../../../models/auth'
import { useLoginMutation } from '../../../app/auth'
import { useAppDispatch } from '../../../hooks/soreHooks'
import { useNavigation } from '@react-navigation/native'

import { Toast } from 'toastify-react-native'

//yup
const schema = yup.object().shape({
    email: yup.string().required("Mail Giriniz!"),
    password: yup.string().required("Şifre Giriniz!")
})

const { width, height } = Dimensions.get("window")
function Index() {
    
    const dispatch = useAppDispatch()
    const navigation = useNavigation()

    const [login, { isLoading, isError, isSuccess, error }] = useLoginMutation()


    if (isLoading) {
        Toast.info("Giriş Yapılıyor...")
    }
    if (isSuccess) {
        console.log("yükleme tamamlnadı")
        Toast.success('Giriş Başarılı.')
    }
    if (isError) {

        //console.log(error)
        Toast.error("Giriş Başarısız!");
    }


    return (
        <KeyboardAvoidingView style={style.container}>
             <Image source={require('../../../../assets/splash.png')}
             style={{height:height*0.30,width:width,marginTop:height*0.02}}/>
            <View >

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={schema}
                    onSubmit={(values: ILogin) => {
                        login(values)
                    }}>
                    {
                        ({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                            <>

                                <View style={style.form}>
                                    <View style={{ margin: 10 }}>
                                        <TextInput
                                            style={style.textInput}
                                            name="email"
                                            placeholder="Email Address"
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            keyboardType="email-address"
                                        />
                                        {errors.email &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingLeft: 10 }}>{errors.email}</Text>
                                        }
                                    </View>
                                    <View style={{ margin: 10 }}>
                                        <TextInput
                                            style={style.textInput}
                                            name="password"
                                            placeholder="Password"
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            //value={values.password}
                                            secureTextEntry
                                        />
                                        {errors.password &&
                                            <Text style={{ fontSize: 10, color: 'red', paddingLeft: 10 }}>{errors.password}</Text>
                                        }
                                    </View>
                                    <TouchableOpacity
                                        style={[style.button,{backgroundColor:isValid?'gray':'lightgrey',}]}
                                        onPress={handleSubmit}
                                        disabled={!isValid}
                                    >
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Login</Text>
                                    </TouchableOpacity>
                                </View>

                            </>
                        )
                    }
                </Formik>

            </View>
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
    },
    form: {
        padding: 10
    },
    subTittle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'gray',

    }
    ,
    textInput: {
        padding: 10,
        width: '100%',
        height: 50,
        borderRadius: 50,
        backgroundColor: '#fff',

    },
    button: {
        borderRadius: 50,
        marginLeft: width * 0.1,
        width: width * 0.8,
        height: height * 0.08,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "gray",
        alignItems: "center"
    }
})

export default Index