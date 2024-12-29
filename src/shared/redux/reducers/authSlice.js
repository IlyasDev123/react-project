import { createSlice } from "@reduxjs/toolkit";

const initState = {
  user: {},
  isLoggedIn: false,
  resetPassword: false,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setAuth: (state, action) => {
      let tempObj = { ...state, ...action.payload };
      return tempObj;
    },
    resetUser: () => initState,
  },
});

export const { setAuth, resetUser } = authSlice.actions;

export default authSlice.reducer;
