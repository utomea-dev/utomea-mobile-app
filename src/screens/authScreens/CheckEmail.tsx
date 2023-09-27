import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Email from "../../assets/images/email.svg";

import { forgotPassword, reset } from "../../redux/slices/authSlice";

const CheckEmail = ({ navigation }) => {
  const dispatch = useDispatch();

  const { email } = useSelector((state) => state.auth);

  const handleCancel = () => {
    dispatch(reset());
    navigation.navigate("Signin");
  };

  const handleSendAgain = () => {
    dispatch(forgotPassword({ email }));
    // navigation.navigate("NewPassword");
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={styles.emailContainer}>
          <Email />
        </View>
        <Text style={styles.title}>Check your email</Text>
        <Text style={styles.paragraph}>
          We sent a password reset link to {email}
        </Text>

        <View style={{ marginVertical: 32 }}>
          <Text style={styles.paragraph}>
            Didn't receive the email?{" "}
            <Text
              onPress={handleSendAgain}
              style={{ color: "#FFFFFF", fontWeight: "500" }}
            >
              Send Again
            </Text>
          </Text>
        </View>

        <TouchableOpacity onPress={handleCancel}>
          <Text style={{ color: "#FFFFFF", textAlign: "center" }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  emailContainer: {
    marginTop: 48,
    marginBottom: 32,
    justifyContent: "center",
    alignItems: "center",
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
    color: "red",
    textAlign: "center",
  },
});

export default CheckEmail;
