import { StringToBoolean } from "class-variance-authority/types";

export interface BaseAuthRequest {
    email:string;
    password:string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
}


export interface User {
    id: number;
    email: string;
    token: string;
}

export interface UserState {
    is_authenticated: boolean,
    user: User | null
    loading: boolean,
    error: string | null;
}