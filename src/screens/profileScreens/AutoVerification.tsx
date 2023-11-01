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
import axios from "axios";

function AutoVerification({ navigation }) {
  const [isAutoVerificationEnabled, setIsAutoVerificationEnabled] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAutoVerificationSetting = async () => {
      try {
        const details = await AsyncStorage.getItem("utomea_user");
        const data = JSON.parse(details);
        const { token } = data;
        const apiUrl =
          "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/user-details";

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data.data;

        setIsAutoVerificationEnabled(userData.auto_verification);
      } catch (error) {
        console.error("Error fetching auto-verification setting:", error);
      }
    };

    fetchAutoVerificationSetting();
  }, []);

  const handleToggle = async (isEnabled) => {
    setIsAutoVerificationEnabled(isEnabled);
    setIsLoading(true);

    try {
      const details = await AsyncStorage.getItem("utomea_user");
      const userData = JSON.parse(details);
      const { token } = userData;

      const apiUrl =
        "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/user-details";
      const requestBody = { auto_verification: isEnabled };

      const response = await axios.put(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(false);

      console.log("API response:", response.data);

      Alert.alert("Success", "Auto-verification setting updated successfully.");
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating auto-verification setting:", error);

      Alert.alert(
        "Error",
        "Failed to update auto-verification setting. Please try again."
      );
    }
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
