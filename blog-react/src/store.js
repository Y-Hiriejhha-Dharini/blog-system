import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './features/auth/AuthSlice'; 
import PostReducer from './features/post/PostSlice';

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        post: PostReducer
    }
});

export default store;
