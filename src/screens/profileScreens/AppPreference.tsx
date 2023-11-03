import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import CustomButton from "../../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralHeader from "../../components/Header/GeneralHeader";
import Clock from "../../assets/icons/Clock.png";
import Location from "../../assets/icons/Location.png";
import Checkmark from "../../assets/icons/Checkmark.png";
import Shield from "../../assets/icons/Shield.png";
import AppNotification from "../../assets/icons/AppNotification.png";
import { Linking, Platform } from "react-native";
import Rightback from "../../assets/icons/right-back.png";

import { useNavigation } from "@react-navigation/native";
import Options from "./Components/Options";
import RenderToggleOption from "./Components/ToggleOption";

function AppPreference({ navigation }) {
  const [appNotificationsEnabled, setAppNotificationsEnabled] = useState(false);

  const handleAppNotificationsToggle = () => {
    if (Platform.OS === "ios") {
      Linking.openSettings(); // Open the app's settings
    } else {
    }
  };
  return (
    <View style={styles.container}>
      <GeneralHeader title={`App Preferences `} />
      <Options
        title={"Set Auto-entry Time"}
        onPress={() => {
          navigation.navigate("Profile/entryTime");
        }}
        iconSource={Clock}
        imageSource={Rightback}
      />
      <Options
        title={"Excluded Locations"}
        onPress={() => {
          navigation.navigate("Profile/excludedLocation");
        }}
        iconSource={Location}
        imageSource={Rightback}
      />
      <Options
        title={"Privacy Policy"}
        onPress={() => {
          navigation.navigate("Profile/privacyPolicy");
        }}
        iconSource={Shield}
        imageSource={Rightback}
      />
      <Options
        title={"Auto-Verification"}
        onPress={() => {
          navigation.navigate("Profile/autoVerification");
        }}
        iconSource={Checkmark}
        imageSource={Rightback}
      />
      <RenderToggleOption
        iconSource={AppNotification}
        title="App Notifications"
        onToggle={handleAppNotificationsToggle}
      />
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
