import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    name: null,
    token: localStorage.getItem("auth_token") || null,
    loading: false,
    error: null
};

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:8000/api/login", userData,{
                headers:{
                    'Content-Type' : 'application/json'
                }
            });
            return response.data; 
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.name = null;
            state.token = null;
            localStorage.removeItem("auth_token");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token; // Set token after login
                localStorage.setItem("auth_token", action.payload.token); // Store token in localStorage
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set error message on rejection
            });
    }
});

export default AuthSlice.reducer;
export const { logout } = AuthSlice.actions;
