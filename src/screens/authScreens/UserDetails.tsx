import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Alert, Text, StyleSheet, BackHandler } from "react-native";
import CustomButton from "../../components/Button/Button";
import CustomInput from "../../components/Input/Input";
import { trimAndNormalizeSpaces } from "../../utils/helpers";

import { updateUserForm } from "../../redux/slices/authSlice";

import Logo from "../../assets/images/logo.svg";

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

    if (trimmedName.length < 3 || trimmedName.length > 30) {
      setValidationError(
        () => "Username should be in range of 3-30 characters long"
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
      <CustomButton title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
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
