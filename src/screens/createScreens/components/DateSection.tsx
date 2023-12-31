import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import Label from "../../../components/Label/Label";
import CustomButton from "../../../components/Button/Button";

import CalendarIcon from "../../../assets/icons/calendar_small.svg";

const DateSection = ({ onPress = () => {}, date }) => {
  return (
    <View style={[styles.sectionTitle, { marginVertical: 20 }]}>
      <Label label={"Date"} labelStyle={{ marginRight: 10 }} />
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
            <Text style={styles.fontStyle}>{date}</Text>
            <CalendarIcon />
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

export default DateSection;

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
