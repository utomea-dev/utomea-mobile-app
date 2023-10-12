import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Label = ({ label = "", labelStyle = {} }) => {
  return <Text style={[styles.label, labelStyle]}>{label}</Text>;
};

export default Label;

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    lineHeight: 16,
    color: "#FFFFFF",
  },
});
