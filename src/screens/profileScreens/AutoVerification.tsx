import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Switch } from "react-native";
import GeneralHeader from "../../components/Header/GeneralHeader";
import RenderToggleOption from "./Components/ToggleOption";

function AutoVerification({ navigation }) {
  return (
    <View style={styles.container}>
      <GeneralHeader title={`Auto-Verification`} />
      <RenderToggleOption
        title="The newly created events will automatically get verified without your manual input."
        onToggle={(isEnabled) => {
          console.log("Toggle state:", isEnabled);
        }}
        titleColor="#ADADAD" // Custom text color
        titleSize={13} // Custom font size
        titleWeight={400}
      />
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
export default AutoVerification;
