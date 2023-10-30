import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeRequest from "../../api";
import { searchUrl, autoSuggestionUrl } from "../../api/urls";

import { handleError } from "../errorHandler";
import { setDateString, uploadImage } from "./homeSlice";

const initialState = {
  data: null,
  suggestions: null,
  dateRange: "",
  searchString: "",
  selectedCtgs: [],
  selectedRtgs: [],
  filterTags: [],

  searchEventsLoading: false,
  searchEventsError: "",

  autoSuggestLoading: false,
  autoSuggestError: "",
};

export const searchEvents = createAsyncThunk(
  "events/searchEvents",
  async (data, { getState, dispatch }) => {
    try {
      const body = data;
      const response = await makeRequest(searchUrl(), "POST", body, {});
      console.log("search   ressss-----------", response.data);
      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
);

export const autoSuggest = createAsyncThunk(
  "events/autoSuggest",
  async (data, { getState, dispatch }) => {
    try {
      const body = data;
      const response = await makeRequest(autoSuggestionUrl(), "POST", body, {});

      return response.data.data;
    } catch (error) {
      handleError(error);
    }
  }
);

const eventDetailSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = null;
    },
    clearSuggestions: (state) => {
      state.suggestions = null;
    },
    resetSearch: (state) => {
      state.data = null;
      state.suggestions = null;
      state.dateRange = "";
      state.selectedCtgs = [];
      state.selectedRtgs = [];
      state.filterTags = [];
    },
    resetSearchLoaders: (state) => {
      state.searchEventsLoading = false;
      state.searchEventsError = "";
      state.autoSuggestLoading = false;
      state.autoSuggestError = "";
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setCtgs: (state, action) => {
      state.selectedCtgs = action.payload;
    },
    setRtgs: (state, action) => {
      state.selectedRtgs = action.payload;
    },
    setFilterTags: (state, action) => {
      state.filterTags = action.payload;
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    },
    removeFilterTag: (state, action) => {
      const afterRemoved = state.filterTags.filter(
        (t) => t.name !== action.payload.name
      );
      state.filterTags = afterRemoved;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchEvents.pending, (state, action) => {
      state.searchEventsLoading = true;
      state.searchEventsError = "";
      state.data = null;
    });
    builder.addCase(searchEvents.fulfilled, (state, action) => {
      state.searchEventsLoading = false;
      state.searchEventsError = "";
      state.data = action.payload || null;
    });
    builder.addCase(searchEvents.rejected, (state, action) => {
      state.searchEventsLoading = false;
      state.searchEventsError = action.error.message || "Some error occured";
    });

    builder.addCase(autoSuggest.pending, (state, action) => {
      state.autoSuggestLoading = true;
      state.autoSuggestError = "";
      state.suggestions = [];
    });
    builder.addCase(autoSuggest.fulfilled, (state, action) => {
      state.autoSuggestLoading = false;
      state.autoSuggestError = "";
      state.suggestions = action.payload || [];
    });
    builder.addCase(autoSuggest.rejected, (state, action) => {
      state.autoSuggestLoading = false;
      state.autoSuggestError = action.error.message || "Some error occured";
    });
  },
});

export default eventDetailSlice.reducer;
export const {
  clearData,
  resetSearch,
  resetSearchLoaders,
  setDateRange,
  setCtgs,
  setRtgs,
  setFilterTags,
  removeFilterTag,
  clearSuggestions,
  setSearchString,
} = eventDetailSlice.actions;
