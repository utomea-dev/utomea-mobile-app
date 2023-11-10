import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Alert, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../../components/Button/Button";
import CustomInput from "../../components/Input/Input";
import Logo from "../../assets/images/logo.svg";
import { StackActions } from "@react-navigation/native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const clear = () => {
    setEmail("");
    setValidationError("");
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    if (!email) {
      setValidationError("Email cannot be empty");
      return;
    }

    if (!isEmailValid(email)) {
      setValidationError("Please enter a valid email address");
      return;
    }

    setValidationError("");

    try {
      setOtpLoading(true);
      const response = await axios.post(
        "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/auth/forgot-password",
        {
          email: email.toLowerCase(),
        }
      );

      console.log("emailllll-------", email.toLowerCase());

      if (response.status === 200) {
        setOtpLoading(false);
        AsyncStorage.setItem("EMAIL_FOR_OTP", email.toLowerCase());
        navigation.dispatch(StackActions.replace("CheckEmail"));
      } else if (response.status === 404) {
        setValidationError("Email ID does not exist");
        setOtpLoading(false);
      } else {
        console.error("Password reset request failed.");
      }
    } catch (error) {
      console.error("Error sending password reset request:", error);
      setValidationError("Email id does not Exist");
      setOtpLoading(false);
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.paragraph}>
          No worries, we'll send you the OTP for Resetting Password.
        </Text>
        <CustomInput
          label="Email"
          placeholder="Enter your email"
          placeholderTextColor="grey"
          validationError={validationError}
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          inputStyle={{ paddingVertical: 10 }}
          containerStyle={{ marginTop: 32 }}
          disabled={otpLoading}
        />
        <View style={styles.flex}>
          <CustomButton
            disabled={otpLoading}
            isLoading={otpLoading}
            title="Reset Password"
            onPress={handleResetPassword}
            containerStyle={{ marginTop: 32, marginBottom: 24 }}
          />
          <TouchableOpacity
            disabled={otpLoading}
            onPress={() => {
              navigation.goBack();
              clear();
            }}
          >
            <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    marginBottom: 4,
    fontSize: 20,
    lineHeight: 28,
    color: "#FFFFFF",
    fontWeight: "400",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: "#ADADAD",
    textAlign: "center",
  },
  errorText: {
    fontSize: 12,
    color: "#FC7A1B",
    textAlign: "left",
  },
});

export default ForgotPassword;
