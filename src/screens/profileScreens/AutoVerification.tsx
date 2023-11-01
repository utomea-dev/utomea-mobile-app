import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch,
  ActivityIndicator,
  Alert,
} from "react-native";
import GeneralHeader from "../../components/Header/GeneralHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; // Import Axios for making API calls

function AutoVerification({ navigation }) {
  const [isAutoVerificationEnabled, setIsAutoVerificationEnabled] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize the default setting in AsyncStorage if not already set
    const initAutoVerificationSetting = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const autoVerificationSetting = await AsyncStorage.getItem(
          "auto_verification"
        );

        if (autoVerificationSetting === null) {
          // If the setting is not in AsyncStorage, set it to false (disabled)
          await AsyncStorage.setItem("auto_verification", "false");
        } else {
          // If the setting is in AsyncStorage, update the state accordingly
          setIsAutoVerificationEnabled(autoVerificationSetting === "true");
        }
      } catch (error) {
        console.error("Error initializing auto-verification setting:", error);
      }
    };

    initAutoVerificationSetting();
  }, []);

  const handleToggle = async (isEnabled) => {
    // Update the local state
    setIsAutoVerificationEnabled(isEnabled);
    setIsLoading(true);

    try {
      const details = await AsyncStorage.getItem("utomea_user"); // Retrieve the bearer token
      const userData = JSON.parse(details);
      const { token } = userData;
      console.log("tokennnnn", token);
      // Simulate an API request to update the auto-verification setting
      const apiUrl =
        "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/user-details";
      const requestBody = { auto_verification: isEnabled };

      // Make a PUT request to update the setting
      const response = await axios.put(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(false);

      // Handle the API response
      console.log("API response:", response.data);

      // Display an alert on API success
      Alert.alert("Success", "Auto-verification setting updated successfully.");
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating auto-verification setting:", error);

      // Display an alert on API failure
      Alert.alert(
        "Error",
        "Failed to update auto-verification setting. Please try again."
      );
    }

    // Update the setting in AsyncStorage
    await AsyncStorage.setItem("auto_verification", isEnabled.toString());
  };

  return (
    <View style={styles.container}>
      <GeneralHeader title={`Auto-Verification`} />
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>
          The newly created events will automatically get verified without your
          manual input.
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color="#07AA8C" />
        ) : (
          <Switch
            value={isAutoVerificationEnabled}
            onValueChange={handleToggle}
            trackColor={{ false: "#767577", true: "#07AA8C" }}
            thumbColor={isAutoVerificationEnabled ? "#fff" : "#fff"}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#222222",
  },
  toggleText: {
    marginRight: 8,
    fontSize: 15,
    color: "#ADADAD",
    flex: 1,
  },
});

export default AutoVerification;
