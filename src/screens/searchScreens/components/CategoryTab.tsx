import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import CheckBox from "react-native-check-box";

const CategoryTab = ({
  categories = [{ id: 0, name: "" }],
  selectedCategories = [],
  setSelectedCategories = (e) => {},
}) => {
  const onClick = (ctg = {}) => {
    if (selectedCategories.some((item) => item.id === ctg.id)) {
      const filteredCategories = selectedCategories.filter(
        (c) => c.id !== ctg.id
      );
      setSelectedCategories(() => filteredCategories);
    } else {
      setSelectedCategories((ctgs) => [...ctgs, ctg]);
    }
  };

  const isChecked = (ctg = {}) => {
    return selectedCategories.some((item) => item.id === ctg.id);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {categories.map((cat) => (
        <View key={cat.id} style={styles.checkBox}>
          <CheckBox
            onClick={() => onClick(cat)}
            isChecked={isChecked(cat)}
            rightText={cat.name}
            rightTextStyle={{ color: "#FFFFFF" }}
            checkBoxColor="#E6E6E6"
            checkedCheckBoxColor="#58DAC3"
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default CategoryTab;

const styles = StyleSheet.create({
  container: {},
  checkBox: {
    marginBottom: 20,
  },
});
