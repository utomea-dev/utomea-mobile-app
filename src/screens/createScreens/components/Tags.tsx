import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../../components/Button/Button";
import CustomInput from "../../../components/Input/Input";

import RightArrow from "../../../assets/icons/right_arrow.svg";
import CloseSmall from "../../../assets/icons/close_small.svg";

const Tags = ({ tags = [], onRemove = (e) => {}, onAdd = (e) => {} }) => {
  const [input, setInput] = useState("");

  const handlePress = (str) => {
    const capitalised = str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const cleaned = capitalised.trim().replace(/\s+/g, " ");
    onAdd(cleaned);
    setInput("");
  };

  return (
    <View style={{ marginVertical: 20 }}>
      {/* tag input */}
      <View style={styles.inputContainer}>
        <CustomInput
          label="Tags"
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Type a custom tag to describe this event"
          placeholderTextColor="grey"
          containerStyle={{ flex: 1 }}
        />
        <TouchableOpacity
          style={{ marginBottom: 3 }}
          onPress={() => handlePress(input)}
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
                <Text style={{ color: "#ADADAD" }}>{tag}</Text>
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
    alignItems: "flex-end",
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
