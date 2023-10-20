import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Label from "../../../components/Label/Label";
import CustomButton from "../../../components/Button/Button";

const Category = ({
  categories = [{ id: 0, name: "" }],
  selectedCategory = null,
  onPress = (e) => {},
}) => {
  return (
    <View style={{ marginVertical: 20 }}>
      <Label label="Category" />
      <View style={styles.categoryContainer}>
        {categories.map((ctg) => (
          <CustomButton
            key={ctg.id}
            onPress={() => onPress(ctg.id)}
            title={ctg.name}
            buttonStyle={
              styles[selectedCategory === ctg.id ? "active" : "buttonStyle"]
            }
            textStyle={{
              color: selectedCategory === ctg.id ? "#FFFFFF" : "#ADADAD",
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryContainer: {
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
  active: {
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#58DAC3",
    backgroundColor: "#07AA8C",
  },
});
