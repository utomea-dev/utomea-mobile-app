import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Alert, Text, StyleSheet, BackHandler } from "react-native";
import CustomButton from "../../components/Button/Button";
import CustomInput from "../../components/Input/Input";
import { trimAndNormalizeSpaces } from "../../utils/helpers";

import { reset, updateUserForm } from "../../redux/slices/authSlice";

import Logo from "../../assets/images/logo.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserDetails = ({ navigation }) => {
  const dispatch = useDispatch();

  const userName = useSelector((state) => state.auth.updateUserForm.name);
  const [name, setName] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSave = async () => {
    const trimmedName = trimAndNormalizeSpaces(name);
    if (!trimmedName) {
      setValidationError(() => "Username cannot be empty");
      return;
    }

    if (trimmedName.length < 4 || trimmedName.length > 25) {
      setValidationError(
        () => "Username should be in range of 4-25 characters long"
      );
      return;
    }

    setValidationError("");

    dispatch(updateUserForm({ key: "name", value: trimmedName }));
    navigation.navigate("AcceptPrivacyPolicy");
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp();
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
    };
  }, [navigation]);

  useEffect(() => {
    setName(userName);
  }, [userName]);

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <Text style={styles.title}>Please enter your details</Text>
        <CustomInput
          label="Name"
          placeholder="Enter your name"
          placeholderTextColor="grey"
          validationError={validationError}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.footer}>
        <CustomButton
          title="Cancel"
          onPress={() => {
            navigation.navigate("Signin");
            AsyncStorage.clear();
            dispatch(reset());
          }}
          buttonStyle={{ backgroundColor: "#222222" }}
          textStyle={{ color: "#FFFFFF" }}
        />
        <CustomButton title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // gap: 12,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(14, 14, 14, 0.9)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 5,
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
  errorText: {
    fontSize: 12,
    color: "#FC7A1B",
    textAlign: "left",
  },
});

export default UserDetails;
