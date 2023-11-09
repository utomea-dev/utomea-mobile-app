import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Alert,
  Text,
  StyleSheet,
  BackHandler,
  Platform,
  ToastAndroid,
  Keyboard,
} from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import CustomButton from "../../components/Button/Button";
import CustomInput from "../../components/Input/Input";
import Logo from "../../assets/images/logo.svg";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  reset,
  sendVerificationEmail,
  verifyOtp,
} from "../../redux/slices/authSlice";
import Timer from "./Timer";

const VerifyEmail = ({ navigation }) => {
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(59);
  const [validationError, setValidationError] = useState("");
  const [canResend, setCanResend] = useState(false);
  const { verifyLoading, verifySuccess, verifyError, user } = useSelector(
    (state) => state.auth
  );

  const clear = () => {
    setOtp("");
    setValidationError("");
  };

  const handleTextChange = (text) => {
    // Use regular expression to allow only numbers and prevent other characters
    const numericValue = text.replace(/[^0-9]/g, "");
    setOtp(numericValue);
  };

  const isOtpValid = (otp) => {
    const isValid = otp.length === 6;
    return isValid;
  };

  const handleVerify = async () => {
    if (!otp) {
      setValidationError(() => "Please enter your OTP");
      return;
    }

    if (!isOtpValid(otp)) {
      setValidationError("Please enter a valid otp");
      return;
    }

    setValidationError("");
    Keyboard.dismiss();

    dispatch(verifyOtp({ email: user.user?.email, otp }));
  };

  const resendOtp = () => {
    Keyboard.dismiss();
    if (canResend) {
      setCanResend(false);
      setTime(59);
      if (Platform.OS === "android") {
        ToastAndroid.show("Email sent", ToastAndroid.SHORT);
      } else if (Platform.OS === "ios") {
        PushNotificationIOS.presentLocalNotification({
          alertBody: "Email sent",
        });
      }
      dispatch(sendVerificationEmail({ email: user?.user?.email }));
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        navigation.dispatch(StackActions.replace("Signin"));
        AsyncStorage.clear();
        dispatch(reset());
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
      dispatch(reset());
      // AsyncStorage.clear();
    };
  }, [navigation]);

  useEffect(() => {
    setValidationError(verifyError);
  }, [verifyError]);

  useEffect(() => {
    if (verifySuccess) {
      navigation.dispatch(StackActions.replace("UserDetails"));
    }
  }, [verifySuccess]);

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <Text style={styles.title}>Verify Email</Text>
        <Text style={styles.paragraph}>
          A One Time Password has been sent on your entered email address.
          Please enter the OTP to verify your email address.
        </Text>
        <CustomInput
          label="Enter OTP"
          placeholder="Enter the OTP received on your email"
          placeholderTextColor="grey"
          keyboardType="numeric"
          validationError={validationError}
          value={otp}
          onChangeText={handleTextChange}
          inputStyle={{ paddingVertical: 10 }}
          containerStyle={{ marginVertical: 20 }}
        />

        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: "#ADADAD", textAlign: "center" }}>
            Didn't receive the OTP?{" "}
            <Text
              style={{ color: "#FFFFFF", textDecorationLine: "underline" }}
              onPress={resendOtp}
            >
              Resend OTP
            </Text>{" "}
            <Timer time={time} setTime={setTime} setCanResend={setCanResend} />
          </Text>
        </View>

        <View style={styles.flex}>
          <CustomButton
            disabled={verifyLoading}
            title="Cancel"
            onPress={() => {
              // navigation.navigate("Signin");
              navigation.goBack();
              clear();
              AsyncStorage.clear();
              dispatch(reset());
            }}
            containerStyle={{ flex: 1 }}
            buttonStyle={{ backgroundColor: "#222222" }}
            textStyle={{ color: "#FFFFFF" }}
          />
          <CustomButton
            disabled={verifyLoading}
            isLoading={verifyLoading}
            title="Verify"
            onPress={handleVerify}
            containerStyle={{ flex: 1 }}
          />
        </View>
      </View>
    </View>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  logoContainer: {
    marginBottom: 48,
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
    lineHeight: 28,
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: "#ADADAD",
    textAlign: "left",
  },
  errorText: {
    fontSize: 12,
    color: "#FC7A1B",
    textAlign: "left",
  },
});
