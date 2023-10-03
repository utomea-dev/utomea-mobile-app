import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeRequest from "../../api";
import {
  createEventUrl,
  getEventsUrl,
  updateEventUrl,
  uploadEventPhotosUrl,
} from "../../api/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { showNotification } from "../../utils/helpers";
import { handleError } from "../errorHandler";

const initialState = {
  events: [],
  eventsLoading: false,
  unverifiedCount: 0,
  totalCount: 0,
  eventsError: "",
  date: "",
  verified: "",
  limit: 10,
  skip: 0,

  infiniteLoading: false,
};

export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (data, { getState }) => {
    try {
      const { limit, events, skip, verified, date } = getState().home;
      // console.log("limit, skip, veri, date---", limit, skip, verified, date);
      const response = await makeRequest(
        getEventsUrl({ limit, skip, verified, date }),
        {}
      );
      const { totalCount, unverifiedCount } = response.data;
      const newEvents = response.data.data;
      let merged = [];

      if (events.length) {
        console.log("succes if===");
        const lastEvent = events.pop();
        const lastEventDate = lastEvent[0].end_timestamp.split("T")[0];
        const newEventDate = newEvents[0][0].end_timestamp.split("T")[0];
        if (lastEventDate === newEventDate) {
          newEvents[0].push(...lastEvent);
        } else {
          events.push(lastEvent);
        }
        merged = [...events, ...newEvents];
      } else merged = newEvents;

      return { merged, totalCount, unverifiedCount };
    } catch (error) {
      handleError(error);
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    resetHome: (state) => {
      state.events = [];
      state.eventsLoading = false;
      state.eventsError = "";
      state.totalCount = 0;
      state.unverifiedCount = 0;
      state.date = "";
      state.verified = "";
      state.limit = 10;
      state.skip = 0;
      state.infiniteLoading = false;
    },
    setHomeFilter: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEvents.pending, (state) => {
      state.eventsLoading = true;
      state.eventsError = "";
      state.events = [];
    });
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.eventsLoading = false;
      state.eventsError = "";
      state.events = action.payload?.merged || [];
      state.totalCount = action.payload?.totalCount;
      state.unverifiedCount = action.payload?.unverifiedCount;
    });
    builder.addCase(getEvents.rejected, (state, action) => {
      state.eventsLoading = false;
      state.eventsError = action.error.message || "Some error occured";
    });
  },
});

export default homeSlice.reducer;
export const { resetHome, setHomeFilter } = homeSlice.actions;
