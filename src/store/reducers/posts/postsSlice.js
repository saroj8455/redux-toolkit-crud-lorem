import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const postUrl = 'http://localhost:3000/posts';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { getState, rejectWithValue }) => {
    // console.log(getState());
    try {
      const { data } = await axios.get(postUrl);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Unable to fetch posts');
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ newPost }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(postUrl, newPost);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Unable to create post');
    }
  }
);
const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // retrive posts
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.loading = false;
      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || 'Unable to fetch posts.';
      })
      // create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.currentPost = payload;
        state.loading = false;
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || 'Unable to create posts.';
      });
  },
});

export default postsSlice;
