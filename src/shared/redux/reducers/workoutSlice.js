import { createSlice } from '@reduxjs/toolkit';

const initState = [];

export const workoutSlice = createSlice({
  name: 'workouts',
  initialState: initState,
  reducers: {
    setWorkouts: (state, action) => {
      let tempObj = { ...state, ...action.payload };
      return tempObj;
    },
  },
});

export const { setWorkouts } = workoutSlice.actions;

export default workoutSlice.reducer;
