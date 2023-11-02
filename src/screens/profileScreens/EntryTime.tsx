import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Alert,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

import { updateUser } from "../../redux/slices/authSlice";
import GeneralHeader from "../../components/Header/GeneralHeader";
import axios from "axios";

const entryTime = [30, 60, 90];

const EntryTime = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const updateUserData = useSelector((state) => state.auth.updateUserForm);
  const { updateUserSuccess, updateUserLoading } = useSelector(
    (state) => state.auth
  );

  const [active, setActive] = useState(30);

  useEffect(() => {
    const fetchUserAutoEntryTime = async () => {
      setLoading(true);
      try {
        // Get the user's token from AsyncStorage
        const details = await AsyncStorage.getItem("utomea_user");
        const userData = JSON.parse(details);
        const { token } = userData;
        console.log("tokeeennnnnnnnnnnn--", token);

        const response = await axios.get(
          "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/user-details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { auto_entry_time } = response.data.data;

        console.log("auto_entry_time ----", auto_entry_time);

        // Check if auto_entry_time is valid and in entryTime array
        if (auto_entry_time && entryTime.includes(parseInt(auto_entry_time))) {
          setActive(parseInt(auto_entry_time));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user's auto entry time:", error);
      }
    };

    fetchUserAutoEntryTime();
  }, []);
  const handleSave = async () => {
    const entryTime = { auto_entry_time: active };

    dispatch(updateUser({ body: entryTime }));

    try {
    } catch (error) {
      console.error("Error storing user's auto entry time:", error);
    }
    Alert.alert(`Auto Entry time Has Succefully changed `);
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
      {loading ? (
        <ActivityIndicator
          style={{
            marginTop: 20,
          }}
          size="large"
          color="#07AA8C"
        />
      ) : (
        <>
          <View style={styles.buttonContainer}>{renderTimerButton()}</View>
          <View style={{ marginTop: 20 }}>
            <CustomButton
              title="Save"
              isLoading={updateUserLoading}
              disabled={updateUserLoading}
              onPress={handleSave}
            />
          </View>
        </>
      )}
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
