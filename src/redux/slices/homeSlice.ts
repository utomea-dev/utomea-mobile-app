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
import { deepCloneArray, showNotification } from "../../utils/helpers";
import { handleError } from "../errorHandler";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDate = new Date().getDate();

const initialState = {
  events: null,
  eventsLoading: false,
  eventsError: "",
  eventsLoadingInner: false,
  unverifiedCount: 0,
  totalCount: 0,
  date: "",
  verified: "",
  limit: 50,
  skip: 0,
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
      const { limit, events, skip, verified, date } = getState().home;
      const response = await makeRequest(
        getEventsUrl({ limit, skip, verified, date }),
        {}
      );
      const { totalCount, unverifiedCount } = response.data;
      const newEvents = response.data.data;
      let merged = [];

      if (events && events.length) {
        const eventsClone = [...events];
        const lastEvent = eventsClone.pop();
        const lastEventDate = lastEvent[0].end_timestamp
          .split("T")[0]
          .split(" ")[0];
        const newEventDate = newEvents[0][0].end_timestamp
          .split("T")[0]
          .split(" ")[0];
        if (lastEventDate === newEventDate) {
          newEvents[0].unshift(...lastEvent);
        } else {
          eventsClone.push(lastEvent);
        }

        merged = [...eventsClone, ...newEvents];
      } else merged = newEvents;
      return { merged, totalCount, unverifiedCount };
    } catch (error) {
      handleError(error);
    }
  }
);

const eventsHaveSameDate = (event1, event2) => {
  const date1 = event1[0].end_timestamp.split("T")[0].split(" ")[0];
  const date2 = event2[0].end_timestamp.split("T")[0].split(" ")[0];

  console.log("DATE COMPARE IN SLICE---------", date1, date2, date1 === date2);
  return date1 === date2;
};

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
      const { totalCount, unverifiedCount } = response.data;
      const newEvents = deepCloneArray(response.data.data);
      let merged = [];

      if (events && events.length) {
        const eventsClone = deepCloneArray(events);

        const lastEvent = eventsClone[eventsClone.length - 1];
        const firstNewEvent = newEvents[0];

        if (eventsHaveSameDate(lastEvent, firstNewEvent)) {
          merged = [
            ...eventsClone.slice(0, -1),
            [...lastEvent, ...firstNewEvent],
            ...newEvents.slice(1),
          ];
        } else {
          merged = [...eventsClone, ...newEvents];
        }
      } else {
        console.log("ELSE IS RUNNING I FECTHING MORE%%%%%%%%%%%%%%%%%");
        merged = newEvents;
      }
      return { merged, totalCount, unverifiedCount };
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
      state.createEventSuccess = false;
      state.createEventLoading = false;
      state.createEventError = "";
      state.uploadImageSuccess = false;
      state.uploadImageLoading = false;
      state.uploadImageError = "";
    },
    resetDate: (state) => {
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
    setStartDate: (state, action) => {
      state.startDate[action.payload.key] = action.payload.value;
    },
    setEndDate: (state, action) => {
      state.endDate[action.payload.key] = action.payload.value;
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
      state.events = action.payload?.merged || null;
      state.totalCount = action.payload?.totalCount;
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
      state.events = action.payload?.merged || null;
      state.totalCount = action.payload?.totalCount;
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
export const { resetHome, setHomeFilter, setEndDate, setStartDate, resetDate } =
  homeSlice.actions;
