import { createSlice } from "@reduxjs/toolkit";
4;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
//export the actions
export const { setLoading } = authSlice.actions;
// export the reducer
export default authSlice.reducer;
//export the authSlice if needed
export const authSliceReducer = authSlice.reducer;
