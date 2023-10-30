import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import CustomButton from "../../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralHeader from "../../components/Header/GeneralHeader";
import PlusDark from "../../assets/icons/plus_dark.svg";
import { useNavigation } from "@react-navigation/native";

function AppPreference({ navigation }) {
  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate("Signin");
  };
  const renderOption = (title, onPress) => {
    return (
      <TouchableOpacity style={styles.option} onPress={onPress}>
        <Text style={styles.optionText}>{title}</Text>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>➜</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <GeneralHeader title={`App Preferences `} />
      {/* Your profile content here */}
      {renderOption("Set Auto-entry Time", () => {
        // Handle navigation to Option 1 page here
        navigation.navigate("Profile/appPreference");
      })}
      {renderOption("Excluded Locations", () => {
        // Handle navigation to Option 1 page here
        navigation.navigate("Option1");
      })}
      {renderOption("Privacy Policy", () => {
        // Handle navigation to Option 1 page here
        navigation.navigate("Option1");
      })}
      {renderOption("Auto-Verification", () => {
        // Handle navigation to Option 1 page here
        navigation.navigate("Option1");
      })}
      {renderOption("App Notifications", () => {
        // Handle navigation to Option 1 page here
        navigation.navigate("Option1");
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0, // Adjust this value as needed to control the header's position,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#222222",
  },
  optionText: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 20,
    fontWeight: "500",
  },
  arrowContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    fontSize: 20,
    color: "white",
  },
});
export default AppPreference;
