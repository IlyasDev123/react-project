import { createSlice } from "@reduxjs/toolkit";

const initState= {
  isSignIn: false,
};

export const signInSlice = createSlice({
  name: "signIn",
  initialState: initState,
  reducers: {
    setSignInReducer: (state, action) => {
      let tempObj = { ...state, ...action.payload };
      return tempObj;
    },
    resetSignInReducer: () => initState,
  },
});

export const { setSignInReducer, resetSignInReducer } = signInSlice.actions;

export default signInSlice.reducer;
