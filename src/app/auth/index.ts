import { apiSlice } from "../api"
import { ILogin, IAuthToken } from "../../models/auth"

import { addToken, logOut } from "../../features/auth/authSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<IAuthToken, ILogin>({
            query: (body: ILogin) => ({
                url: '/user/login',
                method: 'POST',
                body,
            }),
            async onQueryStarted(args, {dispatch,queryFulfilled}) {
               try {
                const {data} = await queryFulfilled
                dispatch(addToken(data))
                if(data.refreshToken){
                    await AsyncStorage.setItem('refreshToken',data.refreshToken)
                } 
                
            } catch (error) {
                console.log(error)
               } 
            },
        }),
        refresh: builder.mutation<Pick<IAuthToken, "accessToken">, string>({
            query: (refresh) => ({
                url: '/user/refresh',
                method: 'POST',
                body: { "refresh": refresh }
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(addToken(data))
                } catch (error) {
                    dispatch(logOut())
                }
            }
        }),
        // logout:builder.query<void,unknown>({
        //     query:()=>({
        //         url:'/user/logout',
        //         method:'GET'
        //     }),
        //     async onQueryStarted({dispatch}){

        //         await AsyncStorage.clear();
        //         dispatch(logOut())

        //     }
        // })
    })
})

export const {
    useLoginMutation,
    useRefreshMutation,
    // useLogoutQuery
} = authApiSlice