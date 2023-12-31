import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import makeRequest from "../../api";

import {
  socialLoginSignupUrl,
  signupUrl,
  verifyOtpUrl,
  sendVerificationEmailUrl,
  signinUrl,
  updateUserUrl,
  forgotPasswordUrl,
  resetPasswordUrl,
} from "../../api/urls";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleError } from "../errorHandler";

const initialState = {
  network: {},
  updateUserForm: {
    name: "",
    privacy_policy_accepted: true,
    auto_entry_time: 30,
  },
  user: {},
  email: "",

  socialSuccess: false,
  socialError: "",
  socialLoading: false,

  signupSuccess: false,
  signupError: "",
  signupLoading: false,

  verifySuccess: false,
  verifyError: "",
  verifyLoading: false,

  signinSuccess: false,
  signinError: "",
  signinLoading: false,

  updateUserSuccess: false,
  updateUserError: "",
  updateUserLoading: false,

  forgotPasswordSuccess: false,
  forgotPasswordError: "",
  forgotPasswordLoading: false,

  resetPasswordSuccess: false,
  resetPasswordError: "",
  resetPasswordLoading: false,
};

export const socialLoginSignup = createAsyncThunk(
  "user/socialLoginSignup",
  async (data: object, { dispatch }) => {
    try {
      const body = data;

      const response = await makeRequest(
        socialLoginSignupUrl(),
        "POST",
        body,
        {}
      );
      await AsyncStorage.setItem("utomea_user", JSON.stringify(response.data));
      console.log("user resonse -------", response.data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (data: object, { dispatch }) => {
    try {
      const body = data;

      const response = await makeRequest(signupUrl(), "POST", body, {});

      const body2 = { email: data.email };
      const response2 = await makeRequest(
        sendVerificationEmailUrl(),
        "POST",
        body2,
        {}
      );
      if (response2.status === 200) {
        await AsyncStorage.setItem(
          "utomea_user",
          JSON.stringify(response.data)
        );
      }
      // dispatch(sendVerificationEmail(body2));

      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
);

export const sendVerificationEmail = createAsyncThunk(
  "user/sendVerificationEmail",
  async (data: object, { dispatch }) => {
    try {
      const body = { email: data.email };
      const response = await makeRequest(
        sendVerificationEmailUrl(),
        "POST",
        body,
        {}
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (data: object, { dispatch }) => {
    try {
      const body = data;

      const response = await makeRequest(verifyOtpUrl(), "POST", body, {});
      if (response.status === 200) {
        const storageUser = await AsyncStorage.getItem("utomea_user");
        const parsed = JSON.parse(storageUser);
        let cloneUser = { ...parsed };
        cloneUser = {
          ...cloneUser,
          user: { ...cloneUser.user, is_verified: true },
        };
        await AsyncStorage.setItem("utomea_user", JSON.stringify(cloneUser));
      }
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
      if (response.data.user.is_verified === false) {
        const body2 = { email: data.email };
        const response2 = await makeRequest(
          sendVerificationEmailUrl(),
          "POST",
          body2,
          {}
        );
      }
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
        user.user.auto_entry_time = body.auto_entry_time;
        await AsyncStorage.setItem("utomea_user", JSON.stringify(user));
      }

      return response.status;
    } catch (error) {
      handleError(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (data: object, { dispatch }) => {
    try {
      const body = data;
      const email = data.email;
      const response = await makeRequest(forgotPasswordUrl(), "POST", body, {});
      return { email, data: response.data };
    } catch (error) {
      handleError(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data: object, { dispatch }) => {
    try {
      const { password, confirm_password } = data;
      const body = { password, confirm_password };
      const token = data.token;
      const response = await makeRequest(
        resetPasswordUrl(token),
        "POST",
        body,
        {}
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
);

const authSLice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNetworkInfo: (state, action) => {
      state.network = action.payload;
    },
    updateUserForm: (state, action) => {
      state.updateUserForm[action.payload.key] = action.payload.value;
    },
    reset: (state) => {
      // state.updateUserForm = {
      //   name: "",
      //   privacy_policy_accepted: true,
      //   auto_entry_time: 30,
      // };
      state.user = {};
      state.email = "";
      state.socialSuccess = false;
      state.socialError = "";
      state.socialLoading = false;
      state.signupSuccess = false;
      state.signupError = "";
      state.signupLoading = false;
      state.verifySuccess = false;
      state.verifyError = "";
      state.verifyLoading = false;
      state.signinSuccess = false;
      state.signinError = "";
      state.signinLoading = false;
      state.updateUserSuccess = false;
      state.updateUserError = "";
      state.updateUserLoading = false;
      state.forgotPasswordSuccess = false;
      state.forgotPasswordError = "";
      state.forgotPasswordLoading = false;
      state.resetPasswordSuccess = false;
      state.resetPasswordError = "";
      state.resetPasswordLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(socialLoginSignup.pending, (state) => {
      state.socialLoading = true;
      state.socialSuccess = false;
      state.socialError = "";
    });
    builder.addCase(socialLoginSignup.fulfilled, (state, action) => {
      state.socialLoading = false;
      state.socialSuccess = true;
      state.user = action.payload;
      state.socialError = "";
    });
    builder.addCase(socialLoginSignup.rejected, (state, action) => {
      state.socialLoading = false;
      state.socialSuccess = false;
      state.socialError = action.error.message || "";
    });

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

    builder.addCase(verifyOtp.pending, (state) => {
      state.verifyLoading = true;
      state.verifySuccess = false;
      state.verifyError = "";
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.verifyLoading = false;
      state.verifySuccess = true;
      state.verifyError = "";
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.verifyLoading = false;
      state.verifySuccess = false;
      state.verifyError = action.error.message || "";
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

    builder.addCase(forgotPassword.pending, (state) => {
      state.forgotPasswordLoading = true;
      state.forgotPasswordError = "";
      state.forgotPasswordSuccess = false;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.forgotPasswordLoading = false;
      state.email = action.payload.email || "";
      state.forgotPasswordSuccess = true;
      state.forgotPasswordError = "";
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.forgotPasswordLoading = false;
      state.forgotPasswordSuccess = false;
      state.forgotPasswordError = action.error.message || "";
    });

    builder.addCase(resetPassword.pending, (state) => {
      state.resetPasswordLoading = true;
      state.resetPasswordError = "";
      state.resetPasswordSuccess = false;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.resetPasswordLoading = false;
      state.resetPasswordSuccess = true;
      state.resetPasswordError = "";
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.resetPasswordLoading = false;
      state.resetPasswordSuccess = false;
      state.resetPasswordError = action.error.message || "";
    });
  },
});

export default authSLice.reducer;
export const { setNetworkInfo, updateUserForm, reset } = authSLice.actions;
