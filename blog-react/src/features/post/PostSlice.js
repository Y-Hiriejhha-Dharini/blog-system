import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

    const initialState = {
                post: { data: [], links: [] },
                error: null,
                loading: false
                }

export const fetchPost = createAsyncThunk(
    'posts/fetchProduct',
    async ({ page = 1, search = '' }, { rejectWithValue }) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/posts?page=${page}&search=${search}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Post Data Error");
      }
    }
  );
  

const PostSlice = createSlice({
    name:"Post",
    initialState,
    extraReducers: (builder)=>{
        builder
            .addCase(fetchPost.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchPost.fulfilled, (state, action) =>{
                state.loading = false;
                state.post = action.payload;
            })
            .addCase(fetchPost.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default PostSlice.reducer;