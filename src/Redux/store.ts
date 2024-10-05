"use client";
import { configureStore } from '@reduxjs/toolkit';
import  userReducer,{setAuthenticated}  from '../Redux/slices/userSlice'

export const store = configureStore ({
    reducer:{
        user:userReducer
    },

});


const accessToken = localStorage.getItem('access')

if (accessToken){
    store.dispatch(setAuthenticated(true))
}
else{
    store.dispatch(setAuthenticated(false))
}

export type RootState = ReturnType<typeof store.getState>;
export type Appdispatch = typeof store.dispatch;