import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const CustomInput = ({
  label = "",
  secure = false,
  onChangeText = () => {},
  inputStyle = {},
  containerStyle = {},
  value = "",
  ...rest
}) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label && <Text style={[styles.label]}>{label}</Text>}
      <TextInput
        onChangeText={onChangeText}
        style={[styles.input, inputStyle]}
        value={value}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {},
  input: {
    backgroundColor: "#222222",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderColor: "#3B3B3B",
    borderRadius: 8,
    borderWidth: 1,
    color: "#FFFFFF",
  },
  label: {
    marginBottom: 6,
    fontSize: 12,
    lineHeight: 16,
    color: "#FFFFFF",
  },
});

export default CustomInput;
