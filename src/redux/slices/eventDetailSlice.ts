import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeRequest from "../../api";
import {
  getEventDetailsUrl,
  editEventUrl,
  deleteEventUrl,
  uploadEventPhotosUrl,
  deletePhotosUrl,
} from "../../api/urls";

import { handleError } from "../errorHandler";
import {
  setDateString,
  setTimeString,
  syncImages,
  uploadImage,
} from "./homeSlice";
import { convertISOStringToTime } from "../../utils/helpers";

const initialState = {
  eventDetail: null,
  eventDetailLoading: false,
  eventDetailError: "",
  date: "",

  editEventSuccess: false,
  verifyEventSuccess: false,
  editEventLoading: false,
  editEventError: "",

  deletePhotosLoading: false,
  deletePhotosSuccess: false,
  deletePhotosError: "",

  deleteEventLoading: false,
  deleteEventSuccess: false,
  deleteEventError: "",
};

export const getEventDetails = createAsyncThunk(
  "events/getEventDetails",
  async (data, { dispatch, getState }) => {
    try {
      const { id } = data;
      const response = await makeRequest(getEventDetailsUrl(id), {});
      console.log("detail event====", response.data);
      const eventDetails = response.data.data;
      dispatch(
        setDateString({
          key: "startDateString",
          value: eventDetails?.begin_timestamp.split("T")[0],
        })
      );
      dispatch(
        setDateString({
          key: "endDateString",
          value: eventDetails?.end_timestamp.split("T")[0],
        })
      );
      dispatch(
        setTimeString({
          key: "startTimeString",
          value: convertISOStringToTime(eventDetails?.begin_timestamp),
        })
      );
      dispatch(
        setTimeString({
          key: "endTimeString",
          value: convertISOStringToTime(eventDetails?.end_timestamp),
        })
      );
      return eventDetails;
    } catch (error) {
      handleError(error);
    }
  }
);

export const editEvent = createAsyncThunk(
  "events/editEvent",
  async (data, { getState, dispatch }) => {
    try {
      const { id, body, photos, navigation, goBack } = data;
      body.images_count = photos.length;
      const response = await makeRequest(editEventUrl(id), "PUT", body, {});

      if (photos.length) {
        dispatch(syncImages({ id, photos }));
      } else {
        if (goBack) {
          navigation.goBack();
          dispatch(getEventDetails({ id }));
        }
      }

      return { message: response.data.message, verify: body.verified };
    } catch (error) {
      handleError(error);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (data, { getState, dispatch }) => {
    try {
      const { id } = data;
      const response = await makeRequest(deleteEventUrl(id), "DELETE", {}, {});

      return { message: response.data.message };
    } catch (error) {
      handleError(error);
    }
  }
);

export const deletePhotos = createAsyncThunk(
  "events/deletePhotos",
  async (data, { getState, dispatch }) => {
    try {
      const { body } = data;
      const { id } = getState().eventDetail.eventDetail;

      const response = await makeRequest(deletePhotosUrl(), "DELETE", body, {});

      dispatch(getEventDetails({ id }));

      return { message: response.data.message };
    } catch (error) {
      handleError(error);
    }
  }
);

const eventDetailSlice = createSlice({
  name: "eventDetail",
  initialState,
  reducers: {
    resetEventDetails: (state) => {
      state.eventDetail = null;
      state.date = "";
    },
    resetEventDetailsLoaders: (state) => {
      state.eventDetailLoading = false;
      state.eventDetailError = "";

      state.editEventSuccess = false;
      state.verifyEventSuccess = false;
      state.editEventLoading = false;
      state.editEventError = "";

      state.deletePhotosLoading = false;
      state.deletePhotosSuccess = false;
      state.deletePhotosError = "";

      state.deleteEventLoading = false;
      state.deleteEventSuccess = false;
      state.deleteEventError = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEventDetails.pending, (state, action) => {
      state.eventDetailLoading = true;
      state.eventDetailError = "";
      state.eventDetail = null;
    });
    builder.addCase(getEventDetails.fulfilled, (state, action) => {
      state.eventDetailLoading = false;
      state.eventDetailError = "";
      state.eventDetail = action.payload || null;
    });
    builder.addCase(getEventDetails.rejected, (state, action) => {
      state.eventDetailLoading = false;
      state.eventDetailError = action.error.message || "Some error occured";
    });

    builder.addCase(editEvent.pending, (state, action) => {
      state.editEventLoading = true;
      state.editEventError = "";
      state.editEventSuccess = false;
      state.verifyEventSuccess = false;
    });
    builder.addCase(editEvent.fulfilled, (state, action) => {
      state.editEventLoading = false;
      state.editEventError = "";
      state.verifyEventSuccess = action.payload?.verify === true ? true : false;
      state.editEventSuccess = true;
    });
    builder.addCase(editEvent.rejected, (state, action) => {
      state.editEventLoading = false;
      state.verifyEventSuccess = false;
      state.editEventSuccess = false;
      state.editEventError = action.error.message || "Some error occured";
    });

    builder.addCase(deletePhotos.pending, (state, action) => {
      state.deletePhotosLoading = true;
      state.deletePhotosError = "";
      state.deletePhotosSuccess = false;
    });
    builder.addCase(deletePhotos.fulfilled, (state, action) => {
      state.deletePhotosLoading = false;
      state.deletePhotosError = "";
      state.deletePhotosSuccess = true;
    });
    builder.addCase(deletePhotos.rejected, (state, action) => {
      state.deletePhotosLoading = false;
      state.deletePhotosSuccess = false;
      state.deletePhotosError = action.error.message || "Some error occured";
    });

    builder.addCase(deleteEvent.pending, (state, action) => {
      state.deleteEventLoading = true;
      state.deleteEventError = "";
      state.deleteEventSuccess = false;
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.deleteEventLoading = false;
      state.deleteEventError = "";
      state.deleteEventSuccess = true;
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.deleteEventLoading = false;
      state.deleteEventSuccess = false;
      state.deleteEventError = action.error.message || "Some error occured";
    });
  },
});

export default eventDetailSlice.reducer;
export const { resetEventDetails, resetEventDetailsLoaders } =
  eventDetailSlice.actions;
