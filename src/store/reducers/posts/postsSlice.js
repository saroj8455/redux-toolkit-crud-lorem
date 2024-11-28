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

export const getByPostId = createAsyncThunk(
  'get/posts/Id',
  async (postId, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${postUrl}/${postId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Unable to fetch post');
    }
  }
);
export const deleteByPostId = createAsyncThunk(
  'delete/posts/Id',
  async (postId, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${postUrl}/${postId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Unable to delete post');
    }
  }
);

export const updatePost = createAsyncThunk(
  'update/post/Id',
  async ({ postId, newPost }, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${postUrl}/${postId}`, newPost);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Unable to update post');
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
      })
      // getByPostId
      .addCase(getByPostId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getByPostId.fulfilled, (state, { payload }) => {
        state.currentPost = payload;
        state.loading = false;
      })
      .addCase(getByPostId.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || 'Unable to create posts.';
      })
      // update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.currentPost = payload;
        state.loading = false;
      })
      .addCase(updatePost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || 'Unable to update post.';
      })
      // delete post
      .addCase(deleteByPostId.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteByPostId.fulfilled, (state, { payload }) => {
        state.currentPost = payload;
        state.loading = false;
      })
      .addCase(deleteByPostId.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || 'Unable to delete post.';
      });
  },
});

export default postsSlice;
