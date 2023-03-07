import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPostsAsync = createAsyncThunk(
  'posts/getPostsAsync',
  async (token) => {
    const res = await axios.get('/userposts', {
      headers: { "auth-token": token },
    });
    return res.data.posts;
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(getPostsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default postsSlice.reducer;
