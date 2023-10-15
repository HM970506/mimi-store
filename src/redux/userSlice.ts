import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { currentUser: { name: "" } },

  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    reset: (state) => {
      state.currentUser = { name: "" };
    },
  },
});

export const userAction = userSlice.actions;
