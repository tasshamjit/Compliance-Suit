"use client";
import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit' ;
import { BaseAuthRequest, LoginResponse, RegisterResponse } from '@/types/userType';
import api from '@/services/axios';
import axios,{ AxiosError } from 'axios';
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
    async (userCredentials: BaseAuthRequest, {rejectWithValue}) => {
      try {
        const response = await api.post('/api/user/login', userCredentials);
        localStorage.setItem('refresh',response.data.refresh_token)
        localStorage.setItem('access',response.data.access_token)
        console.log(response.data)
        return response.data;
      } catch (error:unknown) {
        if (axios.isAxiosError(error)){
            
            if(error.response && error.response.data && error.response.data.detail){
                
                return rejectWithValue(error.response.data.detail)
            } else {
                return rejectWithValue(error.message || 'Log in failed')
            }
        } else if(error instanceof Error) {
            
            return rejectWithValue(error.message || 'Log in failed')
        }

        return rejectWithValue('Log in failed')
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
        } catch (error:any){
            
            if (error.response && error.response.status === 400 && error.response.data.detail == "Email already registered")
            return rejectWithValue({success:false,message:"Email already registered"})
        }
    });

export const getUsers = createAsyncThunk(
    'user/getUsers' ,
    async (_, {rejectWithValue}) => {
        try{
            console.log('users are getting fetched')
            const response = await api.get('/api/user/users/');
            console.log(response.status,'this is the response.status')
            if(response.status === 200){
                console.log('the response is doing great')
                return response
            }

        } catch(error:any){
            return rejectWithValue(error.response?.data?.detail || 'an error occured')
        }
    })

export const blockUser = createAsyncThunk(
    'user/blockUnblock' ,
    async ({user_id,status}:{user_id:number,status:boolean}, {rejectWithValue}) => {
        try{
            const response = await api.patch('/api/user/block-user', null,{
                params: {user_id, status}
            })
            return response
        }
        catch(error:any){
            return rejectWithValue(error.response?.data?.detail || 'an error occured while editing')
        }
    })

  export const userSlice = createSlice({
    name:'user',
    initialState,

    reducers: {

        logout(state){            
            state.user = null ;
            state.is_authenticated = false ;
            state.error = null;
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
        },

        clearError(state){
            console.log('before clearning error2', state.error)
            state.error=null
            console.log('after clearning error2', state.error)
        }
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
            console.log(action)
            if (action.payload){
                state.error = action.payload
            }
        
            console.log(state.error,'this is the error which is happening here');
            // toast(state.error);
        
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
export const {logout} = userSlice.actions;
export const {clearError} = userSlice.actions;