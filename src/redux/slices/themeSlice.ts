import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import theme from "../../config/themeConfig";
const initialState = {
  theme: theme.dark,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = theme.dark;
    },
  },
  extraReducers: (builder) => {},
});

export default themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;
