// Slice: Redux slice for managing authentication state

import { createSlice } from "@reduxjs/toolkit";
import authOperations from './auth-operations';

// Initial state
const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isFetchingCurrentUser: false,
};

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [authOperations.register.fulfilled](state, action) {
            // Update state when registration is successful
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        [authOperations.logIn.fulfilled](state, action) {
            // Update state when login is successful
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        [authOperations.logOut.fulfilled](state, _) {
            // Update state when logout is successful
            state.user = { name: null, email: null };
            state.isLoggedIn = false;
        },
        [authOperations.fetchCurrentUser.fulfilled](state, action) {
            // Update state when fetching current user is successful
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isFetchingCurrentUser = false;
        },
        [authOperations.fetchCurrentUser.rejected](state, _) {
            // Update state when fetching current user is rejected (error)
            state.isFetchingCurrentUser = false;
        },
    },
});

export default authSlice.reducer;
