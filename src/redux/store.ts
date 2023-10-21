import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { commonSlice } from "./commonSlice";

const store = configureStore({
  reducer: { user: userSlice.reducer, common: commonSlice.reducer },
});

export default store;
