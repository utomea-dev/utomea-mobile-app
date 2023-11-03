import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../../../components/Button/Button";
import CustomInput from "../../../components/Input/Input";

import RightArrow from "../../../assets/icons/right_arrow.svg";
import CloseSmall from "../../../assets/icons/close_small.svg";

const Tags = ({
  tags = [],
  onRemove = (e) => {},
  onAdd = (e) => {},
  validationError = "",
}) => {
  const [input, setInput] = useState("");

  const handleAddTag = (str) => {
    const tagsStr = str.split(",");
    const tags = tagsStr.map((t) => {
      const cleaned = t
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return cleaned;
    });
    setInput("");
    tags.forEach((t) => {
      onAdd(t);
    });
  };

  return (
    <View style={{ marginVertical: 20 }}>
      {/* tag input */}
      <View
        style={[
          styles.inputContainer,
          { alignItems: validationError ? "center" : "flex-end" },
        ]}
      >
        <CustomInput
          label="Tags"
          value={input}
          numberOfLines={1}
          onChangeText={(text) => setInput(text)}
          validationError={validationError}
          customPlaceholder="Type a custom tag to describe this event"
          placeholderTextColor="grey"
          containerStyle={{ flex: 1 }}
          returnKeyType="done"
          onSubmitEditing={() => handleAddTag(input)}
        />
        <TouchableOpacity
          style={{ marginBottom: validationError ? 0 : 2 }}
          onPress={() => handleAddTag(input)}
        >
          <RightArrow />
        </TouchableOpacity>
      </View>

      {/* tag chips */}
      <View style={styles.tagsContainer}>
        {tags.map((tag) => (
          <CustomButton
            key={tag}
            title={
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    top: Platform.OS === "android" ? 0 : 2,
                    color: "#ADADAD",
                    fontSize: 12,
                    lineHeight: 16,
                  }}
                >
                  {tag}
                </Text>
                <TouchableOpacity onPress={() => onRemove(tag)}>
                  <CloseSmall />
                </TouchableOpacity>
              </View>
            }
            buttonStyle={styles.buttonStyle}
          />
        ))}
      </View>
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  tagsContainer: {
    marginTop: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  buttonStyle: {
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#3B3B3B",
    backgroundColor: "#0E0E0E99",
  },
});
