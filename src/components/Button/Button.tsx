import React from "react";
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const CustomButton = ({
  title = "",
  onPress = () => {},
  disabled = false,
  buttonStyle = {},
  textStyle = {},
  containerStyle = {},
  isLoading = false,
  Icon,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        disabled={disabled}
        style={[styles.button, disabled && styles.disabled, buttonStyle]}
        onPress={onPress}
        {...rest}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <View style={styles.flex}>
            {Icon && <Icon />}
            <Text
              style={[styles.text, disabled && styles.textDisabled, textStyle]}
            >
              {title}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    gap: 12,
  },
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
