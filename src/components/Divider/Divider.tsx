import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Divider = ({ dividerStyle = {} }) => {
  return <View style={[styles.divider, dividerStyle]} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    borderBottomColor: "#222222",
    borderBottomWidth: 1,
  },
});
