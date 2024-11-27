import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const postUrl = 'http://localhost:3000/posts';

export const getPosts = createAsyncThunk(
  'getPosts',
  async (object, { getState, rejectWithValue }) => {
    console.log(getState());
    try {
      const { data } = await axios.get(postUrl);
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

export const createPost = createAsyncThunk(
  'createPost',
  async ({ newPost }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(postUrl, newPost);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    post: null,
    loading: false,
    message: '',
    isSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // retrive posts
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.loading = false;
        state.isSuccess = true;
      }),
      builder.addCase(getPosts.rejected, (state) => {
        state.loading = false;
        state.message = 'Unable to fetch posts.';
      }),
      // create post
      builder.addCase(createPost.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(createPost.fulfilled, (state, { payload }) => {
        state.post = payload;
        state.loading = false;
        state.isSuccess = true;
      }),
      builder.addCase(createPost.rejected, (state) => {
        state.loading = false;
        state.message = 'Unable to create posts.';
      });
  },
});

export default postsSlice;
