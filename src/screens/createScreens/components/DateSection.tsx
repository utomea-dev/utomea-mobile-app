import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Label from "../../../components/Label/Label";
import CustomButton from "../../../components/Button/Button";

import Edit from "../../../assets/icons/edit.svg";

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
            <Text style={{ color: "#FFFFFF" }}>{date}</Text>
            <Edit />
          </View>
        }
        buttonStyle={{ paddingVertical: 6, backgroundColor: "#222222" }}
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
});
