import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Menu from "../../../assets/icons/Menu.png";

function truncateText(text, maxWords) {
  const words = text.split(" ");
  if (words.length <= maxWords) {
    return text;
  } else {
    const truncatedText = words.slice(0, maxWords).join(" ");
    return truncatedText;
  }
}

function Excluded({
  title,
  subtitle,
  onPress,
  titleStyle,
  subtitleStyle,
  containerStyle,
}) {
  const truncatedTitle = truncateText(title, 5);
  const truncatedSubtitle = truncateText(subtitle, 8);

  return (
    <View style={styles.option}>
      <View style={styles.textContainer}>
        <Text style={[styles.optionText, titleStyle]}>{truncatedTitle}</Text>
        {subtitle && (
          <Text style={[styles.subtitleText, subtitleStyle]}>
            {truncatedSubtitle}
          </Text>
        )}
      </View>
      <TouchableOpacity style={[containerStyle]} onPress={onPress}>
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
    overflow: "hidden",
  },
  subtitleText: {
    fontSize: 10.5,
    color: "#F2F2F2",
    lineHeight: 18,
    fontWeight: "400",
  },
});

export default Excluded;
