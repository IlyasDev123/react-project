import { createSlice } from '@reduxjs/toolkit';

const initState = [];

export const categorySlice = createSlice({
  name: 'categories',
  initialState: initState,
  reducers: {
    setCategories: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
