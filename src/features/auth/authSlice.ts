import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAuthToken } from "../../models/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
AsyncStorage
const initialState: IAuthToken = {
    _id: null,
    firstname: null,
    lastname: null,
    email: null,
    mobile: null,
    accessToken: null,
    refreshToken: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addToken: (state: IAuthToken, action: PayloadAction<Partial<IAuthToken>>) => {
            state.accessToken = action.payload.accessToken ? action.payload.accessToken : null
            state.refreshToken = action.payload?.refreshToken ? action.payload?.refreshToken : null
        },
        logOut: (state) => {
             state.accessToken = null;
             state.refreshToken = null;
            async function clear () {
                await AsyncStorage.clear();
            }
            clear();
        }
    }
})

export default authSlice.reducer

export const { addToken, logOut } = authSlice.actions