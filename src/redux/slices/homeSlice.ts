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
import {
  daysInMonth,
  deepCloneArray,
  showNotification,
} from "../../utils/helpers";
import { handleError } from "../errorHandler";
import { mergeAll } from "../helpers";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDate = new Date().getDate();

const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const ampm = hours >= 12 ? "pm" : "am";
const formattedHours = hours % 12 || 12;
const formattedMinutes = String(minutes).padStart(2, "0");

const initialState = {
  events: null,
  eventsLoading: false,
  eventsError: "",
  eventsLoadingInner: false,
  unverifiedCount: 0,
  totalCount: 1,
  isNewUser: false,
  startDateString: "",
  endDateString: "",
  startTimeString: `${formattedHours}-${formattedMinutes}-${ampm}`,
  endTimeString: `${formattedHours}-${formattedMinutes}-${ampm}`,
  date: "",
  verified: "",
  limit: 10,
  skip: 0,
  startTime: {
    hours: formattedHours,
    minutes: formattedMinutes,
    ampm: ampm,
  },
  endTime: {
    hours: formattedHours,
    minutes: formattedMinutes,
    ampm: ampm,
  },
  startDate: {
    year: currentYear.toString(),
    month:
      currentMonth < 10
        ? "0" + currentMonth.toString()
        : currentMonth.toString(),
    date:
      currentDate < 10 ? "0" + currentDate.toString() : currentDate.toString(),
  },
  endDate: {
    year: currentYear.toString(),
    month:
      currentMonth < 10
        ? "0" + currentMonth.toString()
        : currentMonth.toString(),
    date:
      currentDate < 10 ? "0" + currentDate.toString() : currentDate.toString(),
  },
  infiniteLoading: false,

  createEventSuccess: false,
  createEventLoading: false,
  createEventError: "",

  uploadImageSuccess: false,
  uploadImageLoading: false,
  uploadImageError: "",
};

export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (data, { getState }) => {
    try {
      console.log("RUNING GET EVENTS++++++++++++++++++++++++++++");
      const { limit, skip, verified, date } = getState().home;
      const response = await makeRequest(
        getEventsUrl({ limit, skip, verified, date }),
        {}
      );
      const { totalCount, unverifiedCount, isNewUser } = response.data;
      return {
        events: response.data.data,
        totalCount,
        unverifiedCount,
        isNewUser,
      };
    } catch (error) {
      handleError(error);
    }
  }
);

export const getMoreEvents = createAsyncThunk(
  "events/getMoreEvents",
  async (data, { getState }) => {
    try {
      const { limit, events, verified, date } = getState().home;
      const { skip } = data;
      const response = await makeRequest(
        getEventsUrl({ limit, skip, verified, date }),
        {}
      );
      const { totalCount, unverifiedCount, isNewUser } = response.data;
      let result = events;
      if (response.data.data.length > 0) {
        result = mergeAll(events, response.data.data);
      }
      return { result, totalCount, unverifiedCount, isNewUser };
    } catch (error) {
      handleError(error);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "events/uploadImage",
  async (data, { getState, dispatch }) => {
    try {
      const images = data.photos;
      const { id } = data;
      const requests = images.map(async (image, index) => {
        const formData = new FormData();
        formData.append("files", {
          uri: image.uri,
          type: "image/jpeg",
          name: image.fileName,
        });

        const response = await axios.post(
          `https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/events/upload/${id}`,
          formData,
          {
            timeout: 30000,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      });
      const response = await Promise.allSettled(requests);
      console.log("IMAGE SUCCESS OR NOT-----", response);
      dispatch(getEvents());
      return { message: "Image upload successful" };
    } catch (error) {
      handleError(error);
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (data, { getState, dispatch }) => {
    try {
      const body = data.body;
      const photos = data.photos;
      const response = await makeRequest(createEventUrl(), "POST", body, {});
      const id = response.data.body.id;

      if (photos.length) {
        dispatch(uploadImage({ id, photos }));
      } else {
        dispatch(getEvents());
      }

      return { message: response.data.message };
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
      state.events = null;
      state.eventsLoading = false;
      state.eventsLoadingInner = false;
      state.eventsError = "";
      state.date = "";
      state.verified = "";
      state.limit = 50;
      state.infiniteLoading = false;
      state.createEventSuccess = false;
      state.createEventLoading = false;
      state.createEventError = "";
      state.uploadImageSuccess = false;
      state.uploadImageLoading = false;
      state.uploadImageError = "";
    },
    resetHomeLoaders: (state) => {
      state.eventsLoading = false;
      state.eventsLoadingInner = false;
      state.eventsError = "";
      state.infiniteLoading = false;
      state.createEventSuccess = false;
      state.createEventLoading = false;
      state.createEventError = "";
      state.uploadImageSuccess = false;
      state.uploadImageLoading = false;
      state.uploadImageError = "";
    },
    resetDate: (state) => {
      const now2 = new Date();
      const hours2 = now2.getHours();
      const minutes2 = now2.getMinutes();
      const ampm2 = hours2 >= 12 ? "pm" : "am";
      const formattedHours2 = hours2 % 12 || 12;
      const formattedMinutes2 = String(minutes2).padStart(2, "0");

      state.startDateString = "";
      state.endDateString = "";
      state.startTimeString = `${formattedHours2}-${formattedMinutes2}-${ampm2}`;
      state.endTimeString = `${formattedHours2}-${formattedMinutes2}-${ampm2}`;
      state.startTime = {
        hours: formattedHours2,
        minutes: formattedMinutes2,
        ampm: ampm2,
      };
      state.endTime = {
        hours: formattedHours2,
        minutes: formattedMinutes2,
        ampm: ampm2,
      };
      state.startDate = {
        year: currentYear.toString(),
        month:
          currentMonth < 10
            ? "0" + currentMonth.toString()
            : currentMonth.toString(),
        date:
          currentDate < 10
            ? "0" + currentDate.toString()
            : currentDate.toString(),
      };
      state.endDate = {
        year: currentYear.toString(),
        month:
          currentMonth < 10
            ? "0" + currentMonth.toString()
            : currentMonth.toString(),
        date:
          currentDate < 10
            ? "0" + currentDate.toString()
            : currentDate.toString(),
      };
    },
    setStartTime: (state, action) => {
      state.startTime[action.payload.key] = action.payload.value;
    },
    setEndTime: (state, action) => {
      state.endTime[action.payload.key] = action.payload.value;
    },
    setStartDate: (state, action) => {
      const { year, month, date } = state.startDate;
      state.startDate[action.payload.key] = action.payload.value;

      if (action.payload.key === "month") {
        if (date === daysInMonth(year, month).toString()) {
          state.startDate.date = daysInMonth(
            year,
            action.payload.value
          ).toString();
        }
      } else if (action.payload.key === "year") {
        if (date === daysInMonth(year, month).toString()) {
          state.startDate.date = daysInMonth(
            action.payload.value,
            month
          ).toString();
        }
      }
    },
    setEndDate: (state, action) => {
      const { year, month, date } = state.endDate;
      state.endDate[action.payload.key] = action.payload.value;

      if (action.payload.key === "month") {
        if (date === daysInMonth(year, month).toString()) {
          state.endDate.date = daysInMonth(
            year,
            action.payload.value
          ).toString();
        }
      } else if (action.payload.key === "year") {
        if (date === daysInMonth(year, month).toString()) {
          state.endDate.date = daysInMonth(
            action.payload.value,
            month
          ).toString();
        }
      }
    },
    setTimeString: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    setDateString: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    setHomeFilter: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEvents.pending, (state, action) => {
      action?.meta?.arg?.refetch
        ? (state.eventsLoadingInner = true)
        : (state.eventsLoading = true);
      state.eventsError = "";
      state.events = null;
    });
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.eventsLoading = false;
      state.eventsLoadingInner = false;
      state.eventsError = "";
      state.events = action.payload?.events || null;
      state.totalCount = action.payload?.totalCount;
      state.isNewUser = action.payload?.isNewUser;
      state.unverifiedCount = action.payload?.unverifiedCount;
    });
    builder.addCase(getEvents.rejected, (state, action) => {
      state.eventsLoading = false;
      state.eventsLoadingInner = false;
      state.eventsError = action.error.message || "Some error occured";
    });

    builder.addCase(getMoreEvents.pending, (state, action) => {
      state.infiniteLoading = true;
      state.eventsError = "";
    });
    builder.addCase(getMoreEvents.fulfilled, (state, action) => {
      state.eventsLoading = false;
      state.infiniteLoading = false;
      state.eventsLoadingInner = false;
      state.eventsError = "";
      state.events = action.payload?.result || null;
      state.totalCount = action.payload?.totalCount;
      state.isNewUser = action.payload?.isNewUser;
      state.unverifiedCount = action.payload?.unverifiedCount;
    });
    builder.addCase(getMoreEvents.rejected, (state, action) => {
      state.infiniteLoading = false;
      state.eventsLoading = false;
      state.eventsLoadingInner = false;
      state.eventsError = action.error.message || "Some error occured";
    });

    builder.addCase(createEvent.pending, (state, action) => {
      state.createEventLoading = true;
      state.createEventError = "";
      state.createEventSuccess = false;
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.createEventLoading = false;
      state.createEventError = "";
      state.createEventSuccess = true;
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      state.createEventLoading = false;
      state.createEventSuccess = false;
      state.createEventError = action.error.message || "Some error occured";
    });

    builder.addCase(uploadImage.pending, (state, action) => {
      console.log("INSIDE IMAGE LOADING REDUCER");

      state.uploadImageLoading = true;
      state.uploadImageError = "";
      state.uploadImageSuccess = false;
    });
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      console.log("INSIDE IMAGE SUCCESS REDUCER");
      state.uploadImageLoading = false;
      state.uploadImageError = "";
      state.uploadImageSuccess = true;
    });
    builder.addCase(uploadImage.rejected, (state, action) => {
      console.log("INSIDE IMAGE REJECTED REDUCER");

      state.uploadImageLoading = false;
      state.uploadImageSuccess = false;
      state.uploadImageError = action.error.message || "Some error occured";
    });
  },
});

export default homeSlice.reducer;
export const {
  resetHome,
  resetHomeLoaders,
  setHomeFilter,
  setStartDate,
  setEndDate,
  setStartTime,
  setEndTime,
  resetDate,
  setDateString,
  setTimeString,
} = homeSlice.actions;
