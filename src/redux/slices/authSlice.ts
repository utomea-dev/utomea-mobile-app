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
  signupError: "",
  signupLoading: false,
  signinSuccess: false,
  signinError: "",
  signinLoading: false,
  updateUserSuccess: false,
  updateUserError: "",
  updateUserLoading: false,
};

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (data: object, { dispatch }) => {
    try {
      const body = data;

      const response = await makeRequest(signupUrl(), "POST", body, {});
      await AsyncStorage.setItem("utomea_user", JSON.stringify(response.data));

      return response.data;
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
      const response = await makeRequest(updateUserUrl(), "PUT", body, {});

      if (response.status === 200) {
        let user = (await AsyncStorage.getItem("utomea_user")) || "Unknown";
        user = JSON.parse(user);
        user.user.privacy_policy_accepted = true;
        await AsyncStorage.setItem("utomea_user", JSON.stringify(user));
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
      state.signupSuccess = false;
      state.signupError = "";
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.signupLoading = false;
      state.signupSuccess = true;
      state.user = action.payload;
      state.signupError = "";
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.signupLoading = false;
      state.signupSuccess = false;
      state.signupError = action.error.message || "";
    });

    builder.addCase(signinUser.pending, (state) => {
      state.signinLoading = true;
      state.signinSuccess = false;
      state.signinError = "";
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
      state.signinError = action.error.message || "";
    });

    builder.addCase(updateUser.pending, (state) => {
      state.updateUserLoading = true;
      state.updateUserError = "";
      state.updateUserSuccess = false;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.updateUserLoading = false;
      state.updateUserSuccess = true;
      state.updateUserError = "";
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.updateUserLoading = false;
      state.updateUserSuccess = false;
      state.updateUserError = action.error.message || "";
    });
  },
});

export default authSLice.reducer;
export const { updateUserForm } = authSLice.actions;
