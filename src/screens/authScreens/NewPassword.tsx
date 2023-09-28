import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Alert, Text, StyleSheet, Image } from "react-native";
import CustomButton from "../../components/Button/Button";
import CustomInput from "../../components/Input/Input";

import { resetPassword } from "../../redux/slices/authSlice";

import Logo from "../../assets/images/logo.svg";

const NewPassword = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { token } = route.params;
  console.log("token in route params ==========", token);
  const { resetPasswordLoading, resetPasswordSuccess, resetPasswordError } =
    useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSave = async () => {
    if (!password || !confirm) {
      setValidationError(() => "Fields cannot be empty");
      return;
    }
    if (password !== confirm) {
      setValidationError(() => "Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setValidationError(() => "Password should be atleast 6 characters long");
      return;
    }

    setValidationError("");

    dispatch(resetPassword({ password, confirm_password: confirm, token }));
  };

  useEffect(() => {
    setValidationError(resetPasswordError);
  }, [resetPasswordError]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      navigation.navigate("Signin");
    }
  }, [resetPasswordSuccess]);

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <Text style={styles.title}>Set your new password</Text>
        <CustomInput
          label="Password"
          placeholder="Enter your password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          containerStyle={{ marginBottom: 20 }}
        />
        <CustomInput
          label="Confirm Password"
          placeholder="Re-enter your password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          value={confirm}
          onChangeText={(text) => setConfirm(text)}
        />
        {validationError && (
          <View style={{ marginTop: 5 }}>
            <Text style={styles.errorText}>{validationError}</Text>
          </View>
        )}
      </View>
      <View style={styles.flex}>
        <CustomButton
          disabled={resetPasswordLoading}
          isLoading={resetPasswordLoading}
          title="Save"
          onPress={handleSave}
          containerStyle={{ width: "100%" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    width: "100%",
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
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
  errorText: {
    fontSize: 12,
    color: "red",
    textAlign: "center",
  },
});

export default NewPassword;
