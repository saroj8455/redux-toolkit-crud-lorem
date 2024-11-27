import { configureStore } from '@reduxjs/toolkit';
import loremSlice from './store/reducers/lorem/loremSlice';

export const store = configureStore({
  reducer: {
    lorem: loremSlice.reducer,
  },
});
