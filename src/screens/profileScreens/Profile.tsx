import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Switch } from "react-native";
import CustomButton from "../../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralHeader from "../../components/Header/GeneralHeader";
import PlusDark from "../../assets/icons/plus_dark.svg";
import { useNavigation } from "@react-navigation/native";
import Options from "./Components/Options";

function Profile({ navigation }) {
  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate("Signin");
  };

  return (
    <View style={styles.container}>
      <GeneralHeader title={`Hi, User`} />
      <Options
        title={"App Preferences"}
        onPress={() => {
          navigation.navigate("Profile/appPreference");
        }}
      />
      <Options
        title={"Profile Settings"}
        onPress={() => {
          navigation.navigate("Profile/appPreference");
        }}
      />
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

  logoutButtonContainer: {
    width: 345,
    marginBottom: 60,
  },

  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
export default Profile;
