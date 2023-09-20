import { combineReducers } from "@reduxjs/toolkit";

import eventsSlice from "./slices/eventsSlice";
import themeSlice from "./slices/themeSlice";
import authSlice from "./slices/authSlice";

const createReducer = () =>
  combineReducers({
    events: eventsSlice,
    theme: themeSlice,
    auth: authSlice,
  });

export default createReducer;
