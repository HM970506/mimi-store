import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { name: "" },

  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
    reset: (state) => {
      state = { name: "" };
    },
  },
});

export const userAction = userSlice.actions;
