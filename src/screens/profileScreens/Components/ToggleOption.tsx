import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";

const RenderToggleOption = ({
  title,
  onToggle,
  titleColor,
  titleSize,
  titleWeight,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    onToggle(!isEnabled);
  };

  return (
    <TouchableOpacity style={styles.option} onPress={toggleSwitch}>
      <View style={styles.optionContent}>
        <Text
          style={[
            styles.optionText,
            {
              color: titleColor || "#FFFFFF", // Default text color is white
              fontSize: titleSize || 16, // Default font size is 16
              fontWeight: titleWeight || "normal", // Default font weight is normal
            },
          ]}
        >
          {title}
        </Text>
        <Switch
          style={{
            padding: 1,
          }}
          trackColor={{ false: "#767577", true: "#07AA8C" }}
          thumbColor={isEnabled ? "#fff" : "#fff"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "#222222",
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    flex: 1, // Allow the text to take up available space
    marginRight: 10, // Add some spacing between text and toggle
  },
});

export default RenderToggleOption;
