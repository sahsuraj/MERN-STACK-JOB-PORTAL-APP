import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
  name: "apis",
  initialState: {
    data: null,
    loading: false,
    error: null,
    allRecords: []
  },
  reducers: {
    fetchApi: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchApiSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchApiFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchApiAll: (state, action) => {
      state.loading = false;
      state.allRecords = action.payload;
    }
  }
});

export const { fetchApi, fetchApiSuccess, fetchApiFailure, fetchApiAll } =
  apiSlice.actions;

export default apiSlice.reducer;
