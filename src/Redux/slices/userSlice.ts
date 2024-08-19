"use client";
import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit' ;
import { BaseAuthRequest, LoginResponse, RegisterResponse } from '@/types/userType';
import api from '@/services/axios';
import { UserState } from '@/types/userType';
import { RootState } from '../store';

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
    async (userCredentials : BaseAuthRequest,{ rejectWithValue }) => {
        try {
            console.log("User registration is happening here..")
            const response  = await api.post('/api/user/register', userCredentials);
            if (response.status == 200){
                return{success:true}
            }
            return response.data
        } catch (error){
            // if (error instanceof Error){
            //     throw new Error(error.message || 'Registration failed');
            // }
            return rejectWithValue({success:false})
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

        
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            
        })
        .addCase(registerUser.fulfilled, (state,action: PayloadAction<RegisterResponse>) => {
            state.loading = false;
        })
        .addCase(registerUser.rejected, (state, action ) =>{
            state.loading = false;
            state.error = action.error.message || 'registration in failed'
        })
    }
})

export const selectLoading = (state: RootState) => state.user.loading; 

export default userSlice.reducer