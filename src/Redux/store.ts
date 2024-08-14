"use client";
import { configureStore } from '@reduxjs/toolkit';
import  userReducer  from '../Redux/slices/userSlice'

export const store = configureStore ({
    reducer:{
        user:userReducer
    },

});

export type RootState = ReturnType<typeof store.getState>;
export type Appdispatch = typeof store.dispatch;