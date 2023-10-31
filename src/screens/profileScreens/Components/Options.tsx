import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Rightback from "../../../assets/icons/right-back.png";

function Options({ title, onPress, iconSource }) {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      {iconSource ? ( // Check if iconSource is provided
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
      {/* Hide the iconContainer if iconSource is not provided */}
      <View style={styles.textContainer}>
        <Text style={styles.optionText}>{title}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Image
          source={Rightback}
          style={{
            width: 30,
            height: 20,
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
    marginRight: 12, // Adjust the spacing between icon and title
  },
  textContainer: {
    flex: 1, // Take up available space, pushing the arrow to the right
  },
  optionText: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 20,
    fontWeight: "500",
  },
  arrowContainer: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Options;
