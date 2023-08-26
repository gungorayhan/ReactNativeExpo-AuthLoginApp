import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import { apiSlice } from "../app/api";
const store = configureStore({
    reducer:{
        auth:authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch
export default store;