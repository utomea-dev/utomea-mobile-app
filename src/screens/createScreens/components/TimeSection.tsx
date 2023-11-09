import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import Label from "../../../components/Label/Label";
import CustomButton from "../../../components/Button/Button";

import ClockIcon from "../../../assets/icons/clock.svg";

const TimeSection = ({ onPress = () => {}, time }) => {
  return (
    <View style={[styles.sectionTitle, { marginVertical: 20 }]}>
      <Label label={"Time"} labelStyle={{ marginRight: 10 }} />
      <CustomButton
        onPress={onPress}
        title={
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text style={styles.fontStyle}>{time}</Text>
            <ClockIcon />
          </View>
        }
        buttonStyle={{
          paddingVertical: 6,
          paddingHorizontal: 12,
          backgroundColor: "#222222",
        }}
      />
    </View>
  );
};

export default TimeSection;

const styles = StyleSheet.create({
  sectionTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  fontStyle: {
    top: Platform.OS === "android" ? 0 : 2,
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 16,
  },
});
