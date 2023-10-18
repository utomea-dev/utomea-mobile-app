import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const CustomInput = ({
  label = "",
  secure = false,
  validationError = "",
  onChangeText = (e) => {},
  inputStyle = {},
  containerStyle = {},
  value = "",
  multiline = false,
  ...rest
}) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label && <Text style={[styles.label]}>{label}</Text>}
      <TextInput
        multiline={multiline}
        onChangeText={onChangeText}
        style={[
          styles.input,
          { borderColor: validationError?.length ? "#FC7A1B" : "#3B3B3B" },
          inputStyle,
        ]}
        value={value}
        {...rest}
      />
      {validationError?.length > 0 && (
        <Text style={[styles.validationError]}>{validationError}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {},
  input: {
    height: 45,
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
  validationError: {
    marginTop: 6,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "400",
    color: "#FC7A1B",
  },
});

export default CustomInput;
