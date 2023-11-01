import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Rightback from "../../../assets/icons/right-back.png";

function Options({
  title,
  subtitle, // Supporting text
  onPress,
  iconSource,
  imageSource,
  titleStyle, // Custom style for the title
  subtitleStyle, // Custom style for the subtitle
  containerStyle, // Custom style for the whole option container
  arrowStyle, // Custom style for the arrow
}) {
  return (
    <TouchableOpacity
      style={[styles.option, containerStyle]} // Apply custom container style
      onPress={onPress}
    >
      {iconSource ? (
        <View style={styles.iconContainer}>
          <Image
            source={iconSource}
            style={{
              width: 20,
              height: 22,
              marginLeft: -12,
              top: 1,
              resizeMode: "contain",
            }}
          />
        </View>
      ) : null}
      <View style={styles.textContainer}>
        <Text style={[styles.optionText, titleStyle]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitleText, subtitleStyle]}>{subtitle}</Text>
        )}
      </View>
      <View style={[styles.arrowContainer, arrowStyle]}>
        <Image
          source={Rightback}
          style={{
            width: 30,
            height: 26,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
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
  arrowContainer: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Options;
