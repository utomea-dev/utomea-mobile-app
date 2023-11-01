import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Menu from "../../../assets/icons/Menu.png";

function Excluded({
  title,
  subtitle, // Supporting text
  onPress,
  titleStyle, // Custom style for the title
  subtitleStyle, // Custom style for the subtitle
  containerStyle, // Custom style for the whole option container
}) {
  return (
    <View style={styles.option}>
      <View style={styles.textContainer}>
        <Text style={[styles.optionText, titleStyle]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitleText, subtitleStyle]}>{subtitle}</Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.option, containerStyle]} // Apply custom container style
        onPress={onPress}
      >
        <View>
          <Image
            source={Menu}
            style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 17,
    borderBottomWidth: 0.5,
    borderBottomColor: "#222222",
    justifyContent: "space-between",
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 20,
    fontWeight: "500",
  },
  subtitleText: {
    fontSize: 10.5,
    color: "#F2F2F2", // Customize subtitle text color
    lineHeight: 18,
    fontWeight: "400",
  },
});

export default Excluded;
