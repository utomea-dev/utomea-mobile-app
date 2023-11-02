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
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

import { updateUser } from "../../redux/slices/authSlice";
import GeneralHeader from "../../components/Header/GeneralHeader";

const entryTime = [30, 60, 90];

const EntryTime = ({ navigation }) => {
  const dispatch = useDispatch();

  const updateUserData = useSelector((state) => state.auth.updateUserForm);
  const { updateUserSuccess, updateUserLoading } = useSelector(
    (state) => state.auth
  );

  const [active, setActive] = useState(30);

  useEffect(() => {
    const fetchUserAutoEntryTime = async () => {
      try {
        const userAutoEntryTime = await AsyncStorage.getItem(
          "utomea_user_auto_entry_time"
        );
        if (
          userAutoEntryTime &&
          entryTime.includes(parseInt(userAutoEntryTime))
        ) {
          setActive(parseInt(userAutoEntryTime));
        }
      } catch (error) {
        console.error("Error fetching user's auto entry time:", error);
      }
    };

    fetchUserAutoEntryTime();
  }, []);
  const handleSave = async () => {
    const body = { auto_entry_time: active };
    console.log("Dispatching updateUser action with data: ", entryTime, active);
    dispatch(updateUser({ body }));

    try {
      await AsyncStorage.setItem(
        "utomea_user_auto_entry_time",
        active.toString()
      );
    } catch (error) {
      console.error("Error storing user's auto entry time:", error);
    }
  };

  const handlePress = (entry) => {
    setActive(entry);
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
      <GeneralHeader title={`Set Auto-entry Time`} />
      <View>
        <Text style={styles.paragraph}>
          We will scan the photos clicked by you at a selected interval and
          create an event if you change locations. Please select the interval as
          per your preference.
        </Text>
      </View>
      <View style={styles.buttonContainer}>{renderTimerButton()}</View>
      <View style={{ marginTop: 20 }}>
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
    marginTop: 20,
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
});

export default EntryTime;
