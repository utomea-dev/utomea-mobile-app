import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeRequest from "../../api";

import { signupUrl, signinUrl, updateUserUrl } from "../../api/urls";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleError } from "../errorHandler";

const initialState = {
  updateUserForm: {
    name: "",
    privacy_policy_accepted: true,
    auto_entry_time: 30,
  },
  user: {},
  signupSuccess: false,
  signupError: false,
  signupLoading: false,
  signinSuccess: false,
  signinError: "",
  signinLoading: false,
  updateUserSuccess: false,
  updateUserError: false,
  updateUserLoading: false,
};

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (data: object, { dispatch }) => {
    try {
      const body = data;

      const response = await makeRequest(signupUrl(), "POST", body, {});
      await AsyncStorage.setItem("utomea_user", JSON.stringify("userData"));

      return response.status;
    } catch (error) {
      handleError(error);
    }
  }
);

export const signinUser = createAsyncThunk(
  "user/signinUser",
  async (data: object, { dispatch }) => {
    try {
      const body = data;
      const response = await makeRequest(signinUrl(), "POST", body, {});
      await AsyncStorage.setItem("utomea_user", JSON.stringify(response.data));
      console.log("response ---- ", response.data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: object, { dispatch }) => {
    try {
      const body = data.body;

      const response = await makeRequest(updateUserUrl(), "POST", body, {});

      if (response.status === 200) {
        console.log("resss====", response);
      }

      return response.status;
    } catch (error) {
      handleError(error);
    }
  }
);

const authSLice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateUserForm: (state, action) => {
      state.updateUserForm[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.signupLoading = true;
    });
    builder.addCase(signupUser.fulfilled, (state) => {
      state.signupLoading = false;
      state.signupSuccess = true;
      state.signupError = false;
    });
    builder.addCase(signupUser.rejected, (state) => {
      state.signupLoading = false;
      state.signupSuccess = false;
      state.signupError = true;
    });

    builder.addCase(signinUser.pending, (state) => {
      state.signinLoading = true;
    });
    builder.addCase(signinUser.fulfilled, (state, action) => {
      state.signinLoading = false;
      state.signinSuccess = true;
      state.user = action.payload;
      state.signinError = "";
    });
    builder.addCase(signinUser.rejected, (state, action) => {
      state.signinLoading = false;
      state.signinSuccess = false;
      state.signinError = action.error.message;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.updateUserLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.updateUserLoading = false;
      state.updateUserSuccess = true;
      state.updateUserError = false;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.updateUserLoading = false;
      state.updateUserSuccess = false;
      state.updateUserError = true;
    });
  },
});

export default authSLice.reducer;
export const { updateUserForm } = authSLice.actions;
