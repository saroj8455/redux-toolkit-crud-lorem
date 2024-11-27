import { configureStore } from '@reduxjs/toolkit';
import loremSlice from './store/reducers/lorem/loremSlice';
import postsSlice from './store/reducers/posts/postsSlice';

export const store = configureStore({
  reducer: {
    lorem: loremSlice.reducer,
    posts: postsSlice.reducer,
  },
});
