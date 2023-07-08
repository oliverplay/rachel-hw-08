// Operations: User authentication and authorization operations

import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

// Token management
const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = '';
    },
};

// Registration operation
const register = createAsyncThunk('auth/register',
    async (credentials, thunkAPI) => {
        try {
            const { data } = await axios.post('/users/signup', credentials);
            Notify.success("You're registered ;)");
            token.set(data.token); // Set the token in Axios headers
            return data;
        } catch (error) {
            Notify.failure('Something went wrong on register');
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Login operation
const logIn = createAsyncThunk('auth/login',
    async (credentials, thunkAPI) => {
        try {
            const { data } = await axios.post('/users/login', credentials);
            Notify.success("You're logged in ;)");
            token.set(data.token); // Set the token in Axios headers
            return data;
        } catch (error) {
            Notify.failure('Something went wrong on login');
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Logout operation
const logOut = createAsyncThunk('auth/logout',
    async (_, thunkAPI) => {
        try {
            await axios.post('users/logout');
            Notify.success("You're logged out. Have a good day ;)");
            token.unset(); // Clear the token from Axios headers
        } catch (error) {
            Notify.failure('Something went wrong on logout');
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Fetch current user operation
const fetchCurrentUser = createAsyncThunk('auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;

        if (persistedToken === null) {
            console.log('No token from fetchCurrentUser');
            return thunkAPI.rejectWithValue();
        }

        token.set(persistedToken); // Set the token in Axios headers
        try {
            const { data } = await axios.get('/users/current');
            return data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Object containing all authentication operations
const authOperations = {
    register,
    logIn,
    logOut,
    fetchCurrentUser,
};

export default authOperations;
