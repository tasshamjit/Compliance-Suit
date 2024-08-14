"use client";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit' ;
import { BaseAuthRequest, LoginResponse } from '@/types/userType';
import api from '@/services/axios';
import { UserState } from '@/types/userType';

const initialState : UserState ={
    is_authenticated:false,
    user:null,
    loading:false,
    error:null,
}


export const loginUser = createAsyncThunk<LoginResponse, BaseAuthRequest>(
    'user/loginUser',
    async (userCredentials: BaseAuthRequest) => {
      try {
        const response = await api.post('/login', userCredentials);
        return response.data;
      } catch (error:unknown) {
        if (error instanceof Error){
            throw new Error(error.message || 'Login failed');
        }
      }
    });


  export const registerUser = createAsyncThunk(
    'user/registerUser' ,
    async (userCredentials : BaseAuthRequest) => {
        try {
            const response  = await api.post('/register', userCredentials);
            return response.data
        } catch (error:unknown){
            if (error instanceof Error){
                throw new Error(error.message || 'Registration failed');
            }
        }
    });

  export const userSlice = createSlice({
    name:'user',
    initialState,

    reducers: {

        logout(state){            
            state.user = null ;
            state.is_authenticated = false ;
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;

        })
        .addCase(loginUser.fulfilled, (state,action: PayloadAction<LoginResponse>) => {
            state.loading = false;
            state.is_authenticated = true;
        })
        .addCase(loginUser.rejected, (state, action ) =>{
            state.loading = false;
            state.error = action.error.message || 'Log in failed'
        })

    }
})

export default userSlice.reducer