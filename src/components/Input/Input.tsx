import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const CustomInput = ({
  label = "",
  secure = false,
  validationError = "",
  customPlaceholder = "",
  onChangeText = (e) => {},
  inputStyle = {},
  placeholderStyle = {},
  containerStyle = {},
  value = "",
  multiline = false,
  ...rest
}) => {
  const inputRef = useRef(null);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.inputContainer, containerStyle]}>
        {label && <Text style={[styles.label]}>{label}</Text>}
        <View>
          <TextInput
            ref={inputRef}
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
          {!value && customPlaceholder && (
            <Text
              onPress={() => inputRef.current.focus()}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.placeholder, placeholderStyle]}
            >
              {customPlaceholder}
            </Text>
          )}
        </View>
        {validationError?.length > 0 && (
          <Text style={[styles.validationError]}>{validationError}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
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
  placeholder: {
    color: "gray",
    position: "absolute",
    top: 14,
    left: 14,
    width: "90%",
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
