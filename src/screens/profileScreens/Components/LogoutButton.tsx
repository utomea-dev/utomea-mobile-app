import React from "react";
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import Logout from "../../../assets/icons/Logout(2).png";

const LogoutButton = ({
  title = "",
  onPress = () => {},
  disabled = false,
  buttonStyle = {},
  textStyle = {},
  containerStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.button, disabled && styles.disabled, buttonStyle]}
        onPress={onPress}
      >
        <View style={styles.flex}>
          <Text
            style={[styles.text, disabled && styles.textDisabled, textStyle]}
          >
            {title}
          </Text>
          <Image
            source={Logout}
            style={{ width: 18, top: 3, height: 18, resizeMode: "contain" }}
          />
        </View>
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
    paddingVertical: 2,
    paddingHorizontal: 10,
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

export default LogoutButton;
