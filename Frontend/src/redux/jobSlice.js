import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    selectedJob: null,
    allAdminJobs: [],
    allAppliedJobs: [],
    searchQuery: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setsearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export default jobSlice.reducer;
export const {
  setAllJobs,
  setSelectedJob,
  setAllAdminJobs,
  setAllAppliedJobs,
  setsearchQuery,
} = jobSlice.actions;
