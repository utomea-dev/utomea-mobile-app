import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import CustomButton from "../../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralHeader from "../../components/Header/GeneralHeader";
import PlusDark from "../../assets/icons/plus_dark.svg";
import { useNavigation } from "@react-navigation/native";

function Profile({ navigation }) {
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
      <GeneralHeader title={`hi `} />
      {/* Your profile content here */}
      {renderOption("App Preferences", () => {
        // Handle navigation to Option 1 page here
        navigation.navigate("Profile/appPreference");
      })}
      {renderOption("Profile Settings", () => {
        // Handle navigation to Option 1 page here
        navigation.navigate("Option1");
      })}
      <View style={styles.bottom}>
        <View style={styles.logoutButtonContainer}>
          <CustomButton
            title="Logout"
            onPress={handleLogout}
            buttonStyle={{
              paddingVertical: 18,
              backgroundColor: "#222222",
              color: "white",
            }}
            textStyle={{ fontSize: 16, lineHeight: 24, color: "white" }}
            Icon={PlusDark} // Replace YourIconComponent with your logout icon
            iconPosition="right" // Place the icon after the text
          />
        </View>
      </View>
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
  logoutButtonContainer: {
    width: 345,
    marginBottom: 60,
  },
  optionText: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 20,
    fontWeight: "500",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
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
export default Profile;
