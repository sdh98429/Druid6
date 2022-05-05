import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  file: '',
};

export const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    inputFile: (state, action) => {
      state.file = action.payload;
    },
  },
});

export const { inputFile } = serverSlice.actions;

export default serverSlice.reducer;
