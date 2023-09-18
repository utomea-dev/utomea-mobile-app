import { combineReducers } from "@reduxjs/toolkit";

import eventsSlice from "./slices/eventsSlice";
import themeSlice from "./slices/themeSlice";

const createReducer = () =>
  combineReducers({
    events: eventsSlice,
    theme: themeSlice,
  });

export default createReducer;
