import { createSlice } from '@reduxjs/toolkit';

const initState = [];

export const insightCategorySlice = createSlice({
  name: 'categoriesInsight',
  initialState: initState,
  reducers: {
    setInsightCategories: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setInsightCategories } = insightCategorySlice.actions;

export default insightCategorySlice.reducer;
