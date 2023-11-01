import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeRequest from "../../api";
import { excludeLocationUrl } from "../../api/urls";

import { handleError } from "../errorHandler";

const initialState = {
  data: null,

  excludeLocationLoading: false,
  excludeLocationError: "",
  excludeLocationSuccess: false,
};

export const excludeLocation = createAsyncThunk(
  "events/excludeLocation",
  async (data, { getState, dispatch }) => {
    try {
      const body = data;
      const response = await makeRequest(
        excludeLocationUrl(),
        "POST",
        body,
        {}
      );
      console.log("search   ressss-----------", response.data);
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
);

const eventDetailSlice = createSlice({
  name: "exclude",
  initialState,
  reducers: {
    resetExclude: (state) => {
      state.data = null;
    },
    resetExcludeLoaders: (state) => {
      state.excludeLocationLoading = false;
      state.excludeLocationError = "";
      state.excludeLocationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(excludeLocation.pending, (state, action) => {
      state.excludeLocationLoading = true;
      state.excludeLocationError = "";
      state.excludeLocationSuccess = false;
      state.data = null;
    });
    builder.addCase(excludeLocation.fulfilled, (state, action) => {
      state.excludeLocationLoading = false;
      state.excludeLocationError = "";
      state.excludeLocationSuccess = true;
      state.data = action.payload || null;
    });
    builder.addCase(excludeLocation.rejected, (state, action) => {
      state.excludeLocationLoading = false;
      state.excludeLocationSuccess = false;
      state.excludeLocationError = action.error.message || "Some error occured";
    });
  },
});

export default eventDetailSlice.reducer;
export const { resetExclude, resetExcludeLoaders } = eventDetailSlice.actions;
