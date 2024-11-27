import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLorems = createAsyncThunk(
  'getLorems',
  async (object, { getState, rejectWithValue }) => {
    console.log(getState());

    try {
      const { data } = await axios.get(
        'https://baconipsum.com/api/?type=meat-and-filler'
      );
      return data;
    } catch (error) {
      rejectWithValue(error.response);
    }
  }
);

const loremSlice = createSlice({
  name: 'lorem',
  initialState: {
    loading: false,
    data: [],
    message: '',
    isSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLorems.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getLorems.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.isSuccess = true;
      }),
      builder.addCase(getLorems.rejected, (state, { payload }) => {
        state.loading = false;
        state.isSuccess = false;
        state.message = 'failed.';
      });
  },
});

export default loremSlice;
