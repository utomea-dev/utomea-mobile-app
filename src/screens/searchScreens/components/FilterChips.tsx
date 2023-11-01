import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../../components/Button/Button";

import CloseSmall from "../../../assets/icons/close_small.svg";

const FilterChips = ({ tags = [], onRemove = (e) => {} }) => {
  return (
    <View style={{ marginBottom: 24 }}>
      {/* filter chips */}
      <View style={styles.tagsContainer}>
        {tags.map((tag) => (
          <CustomButton
            key={tag.name}
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
                    color: "#ADADAD",
                    fontSize: 12,
                    lineHeight: 16,
                  }}
                >
                  {tag.name}
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

export default FilterChips;

const styles = StyleSheet.create({
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
