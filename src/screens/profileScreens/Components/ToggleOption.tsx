import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
} from "react-native";

const RenderToggleOption = ({
  title,
  onToggle,
  titleColor,
  titleSize,
  titleWeight,
  iconSource,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    onToggle(!isEnabled);
  };

  return (
    <TouchableOpacity style={styles.option} onPress={toggleSwitch}>
      <View style={styles.optionContent}>
        {iconSource && (
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
        )}
        <Text
          style={[
            styles.optionText,
            {
              color: titleColor || "#FFFFFF",
              fontSize: titleSize || 17,
              fontWeight: titleWeight || "normal",
            },
          ]}
        >
          {title}
        </Text>
      </View>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "#222222",
    flexDirection: "row", // Set flexDirection to row
    justifyContent: "space-between", // Align content at both ends
    alignItems: "center",
  },
  iconContainer: {
    marginLeft: 8,
  },
  optionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
  },
});

export default RenderToggleOption;
