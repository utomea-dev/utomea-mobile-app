import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CustomButton from "../../components/Button/Button";
import CustomInput from "../../components/Input/Input";
import Logo from "../../assets/images/logo.svg";
import { StackActions } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralHeader from "../../components/Header/GeneralHeader";
import { color } from "react-native-elements/dist/helpers";

const UpdatePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const clear = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword) {
      setCurrentPasswordError("Current Password cannot be empty.");
      return;
    } else {
      setCurrentPasswordError("");
    }

    if (!newPassword) {
      setNewPasswordError("New Password cannot be empty.");
      return;
    } else {
      setNewPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password cannot be empty.");
      return;
    } else {
      setConfirmPasswordError("");
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(
        "New password and confirm password do not match."
      );
      return;
    } else {
      setConfirmPasswordError("");
    }
    if (newPassword === currentPassword) {
      setCurrentPasswordError(
        "New Password and Current Password Can't be same"
      );
      return;
    } else {
      setCurrentPasswordError("");
    }

    setLoading(true);

    try {
      const details = await AsyncStorage.getItem("utomea_user");
      const userData = JSON.parse(details);
      const { token } = userData;

      const apiUrl =
        "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/auth/change-password";

      const response = await axios.post(
        apiUrl,
        {
          password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("responseeeeeeee-----", response.data.message);
      if (response.data.message === "Password has been changed successfully") {
        Alert.alert("Password Has been Updated Successfully");
        navigation.dispatch(StackActions.replace("Profile/manageProfile"));
        clear();
      }
    } catch (error) {
      if (error.response.status === 401) {
        setCurrentPasswordError("Current Password is incorrect.");
      } else {
        setConfirmPasswordError("Error updating password. Please try again.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GeneralHeader title="Manage Password" />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "column",
            gap: 20,
          }}
        >
          <CustomInput
            label="Current Password"
            placeholder="Enter your current password"
            secureTextEntry
            validationError={currentPasswordError}
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
            inputStyle={{ paddingVertical: 10 }}
          />
          <CustomInput
            label="New Password"
            placeholder="Enter your new password"
            secureTextEntry
            validationError={newPasswordError}
            value={newPassword}
            placeholderStyle={{}}
            onChangeText={(text) => setNewPassword(text)}
            inputStyle={{ paddingVertical: 10 }}
          />
          <CustomInput
            label="Confirm Password"
            placeholder="Confirm your new password"
            secureTextEntry
            validationError={confirmPasswordError}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            inputStyle={{ paddingVertical: 10 }}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              navigation.goBack();
              clear();
            }}
            style={{ flex: 1 }}
          >
            <CustomButton
              title="Cancel"
              onPress={() => {
                clear();
                navigation.navigate("Profile/manageProfile");
              }}
              buttonStyle={{ backgroundColor: "#222222" }}
              textStyle={{ color: "#FFFFFF" }}
            />
          </TouchableOpacity>
          <CustomButton
            disabled={loading}
            isLoading={loading}
            title="Update"
            onPress={handleUpdatePassword}
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

export default UpdatePassword;
