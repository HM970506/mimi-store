import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: { loading: false },

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const commonAction = commonSlice.actions;
