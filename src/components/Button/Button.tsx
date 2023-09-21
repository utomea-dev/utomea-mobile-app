import React from "react";
import { View, Button, TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({
  title = "",
  onPress = () => {},
  disabled = false,
  buttonStyle = {},
  textStyle = {},
  containerStyle = {},
  Icon,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.button, buttonStyle, disabled && styles.disabled]}
        onPress={onPress}
        {...rest}
      >
        {Icon && <Icon />}
        <Text style={[styles.text, textStyle, disabled && styles.textDisabled]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#58DAC3",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 50,
    gap: 12,
  },
  disabled: {
    backgroundColor: "#616161",
    padding: "6px 16px",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  text: {
    color: "#0E0E0E",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  textDisabled: {
    color: "#ADADAD",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
});

export default CustomButton;
