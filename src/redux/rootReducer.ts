import { combineReducers } from "@reduxjs/toolkit";

import eventsSlice from "./slices/eventsSlice";
import themeSlice from "./slices/themeSlice";
import authSlice from "./slices/authSlice";
import homeSlice from "./slices/homeSlice";
import eventDetailSlice from "./slices/eventDetailSlice";

const createReducer = () =>
  combineReducers({
    events: eventsSlice,
    eventDetail: eventDetailSlice,
    theme: themeSlice,
    auth: authSlice,
    home: homeSlice,
  });

export default createReducer;
