import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Alert,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../components/Button/Button";

import { updateUser } from "../../redux/slices/authSlice";

import Logo from "../../assets/images/logo.svg";

const entryTime = [30, 60, 90];

const AutoEntryTime = ({ navigation }) => {
  const dispatch = useDispatch();

  const updateUserData = useSelector((state) => state.auth.updateUserForm);
  const { updateUserSuccess, updateUserLoading } = useSelector(
    (state) => state.auth
  );

  const [active, setActive] = useState(30);

  const handleSave = async () => {
    updateUserData.auto_entry_time = active;
    dispatch(updateUser({ body: updateUserData }));
  };

  const handlePress = (entry) => {
    setActive(() => entry);
  };

  useEffect(() => {
    if (updateUserSuccess) {
      navigation.navigate("MainTabs", { prevScreen: "AutoEntryTime" });
    }
  }, [updateUserSuccess]);

  const renderTimerButton = () => {
    return entryTime.map((entry) => (
      <TouchableOpacity
        disabled={updateUserLoading}
        key={entry}
        style={entry === active ? styles.buttonActive : styles.button}
        onPress={() => handlePress(entry)}
      >
        <Text
          style={entry === active ? styles.buttonTextActive : styles.buttonText}
        >
          {entry} minutes
        </Text>
      </TouchableOpacity>
    ));
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <Text style={styles.title}>Set Auto-Entry Time</Text>
      <View>
        <Text style={styles.paragraph}>
          We will scan the photos clicked by you at a selected interval and
          create an event if you change locations. Please select the interval as
          per your preference.
        </Text>
      </View>
      <View style={styles.buttonContainer}>{renderTimerButton()}</View>
      <View style={styles.footer}>
        <TouchableOpacity
          disabled={updateUserLoading}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "#FFFFFF" }}>Go Back</Text>
        </TouchableOpacity>
        <CustomButton
          title="Save"
          isLoading={updateUserLoading}
          disabled={updateUserLoading}
          onPress={handleSave}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  logoContainer: {
    marginBottom: 48,
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    marginBottom: 8,
    fontSize: 20,
    lineHeight: 28,
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: "#ADADAD",
    fontWeight: "400",
    marginBottom: 48,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    borderWidth: 1,
    borderColor: "#3B3B3B",
    backgroundColor: "#0E0E0E",
    borderRadius: 16,
    padding: 24,
    width: "100%",
  },
  buttonActive: {
    borderWidth: 1,
    borderColor: "#58DAC3",
    backgroundColor: "#222222",
    borderRadius: 16,
    padding: 24,
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "700",
    color: "#FFFFFF",
  },
  buttonTextActive: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "700",
    color: "#58DAC3",
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
});

export default AutoEntryTime;
