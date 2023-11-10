import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CustomButton from "../../components/Button/Button";
import CustomInput from "../../components/Input/Input";
import Logo from "../../assets/images/logo.svg";
import { StackActions } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralHeader from "../../components/Header/GeneralHeader";

const NewPassword = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!password) {
      setPasswordError("Password cannot be empty.");
      return;
    } else {
      setPasswordError("");
    }

    if (password.length <= 5) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password cannot be empty.");
      return;
    } else {
      setConfirmPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Password and Confirm Password do not match.");
      return;
    } else {
      setConfirmPasswordError("");
    }

    setLoading(true);

    try {
      const emailForOTP = await AsyncStorage.getItem("EMAIL_FOR_OTP");
      const otp = await AsyncStorage.getItem("OTP_FOR_VERIFICATION");

      if (!emailForOTP || !otp) {
        console.error("Email or OTP not found in AsyncStorage");
        return;
      }

      const apiUrl =
        "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/auth/reset-password";

      const response = await axios.post(apiUrl, {
        email: emailForOTP.toLowerCase(),
        otp,
        password: password,
        confirm_password: confirmPassword,
      });

      if (response.data.message === "Password has been reset successfully") {
        navigation.navigate("Signin");
        AsyncStorage.clear();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setPasswordError("Invalid OTP or Email.");
      } else {
        setConfirmPasswordError("Error resetting password. Please try again.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View
          style={{
            flexDirection: "column",
            gap: 20,
          }}
        >
          <CustomInput
            label="Enter New Password"
            placeholder="Enter New Password"
            secureTextEntry
            validationError={passwordError}
            value={password}
            onChangeText={(text) => setPassword(text)}
            inputStyle={{ paddingVertical: 10 }}
            disabled={loading}
          />
          <CustomInput
            label="Confirm New Password"
            placeholder="Confirm New Password"
            secureTextEntry
            validationError={confirmPasswordError}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            inputStyle={{ paddingVertical: 10 }}
            disabled={loading}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity disabled={loading} style={{ flex: 1 }}>
            <CustomButton
              title="Cancel"
              onPress={() => {
                navigation.navigate("Signin");
                AsyncStorage.clear();
              }}
              buttonStyle={{ backgroundColor: "#222222" }}
              textStyle={{ color: "#FFFFFF" }}
            />
          </TouchableOpacity>
          <CustomButton
            disabled={loading}
            isLoading={loading}
            title="Reset"
            onPress={handleResetPassword}
            containerStyle={{ flex: 1 }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    width: "105%",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  buttonsContainer: {
    marginTop: 30,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    gap: 20,
  },
  title: {
    marginBottom: 4,
    fontSize: 20,
    lineHeight: 28,
    color: "#FFFFFF",
    fontWeight: "400",
    textAlign: "center",
  },
  logoContainer: {
    marginBottom: 48,
    flexDirection: "row",
    justifyContent: "center",
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

export default NewPassword;
