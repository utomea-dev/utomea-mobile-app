import { combineReducers } from "@reduxjs/toolkit";

import eventsSlice from "./slices/eventsSlice";
import themeSlice from "./slices/themeSlice";
import authSlice from "./slices/authSlice";
import homeSlice from "./slices/homeSlice";
import eventDetailSlice from "./slices/eventDetailSlice";
import searchSlice from "./slices/searchSlice";
import excludeLocationSlice from "./slices/excludeLocationSlice";

const createReducer = () =>
  combineReducers({
    events: eventsSlice,
    eventDetail: eventDetailSlice,
    theme: themeSlice,
    auth: authSlice,
    home: homeSlice,
    search: searchSlice,
    exclude: excludeLocationSlice,
  });

export default createReducer;
