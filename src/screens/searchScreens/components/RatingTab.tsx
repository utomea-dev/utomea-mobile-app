import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import CheckBox from "react-native-check-box";

const RatingTab = ({
  ratings = [{ id: 0, name: "" }],
  selectedRatings = [],
  setSelectedRatings = (e) => {},
}) => {
  const onClick = (rtg = {}) => {
    if (selectedRatings.some((item) => item.id === rtg.id)) {
      const filteredRatings = selectedRatings.filter((c) => c.id !== rtg.id);
      setSelectedRatings(() => filteredRatings);
    } else {
      setSelectedRatings((rtgs) => [...rtgs, rtg]);
    }
  };

  const isChecked = (rtg = {}) => {
    console.log("cat----", rtg);
    return selectedRatings.some((item) => item.id === rtg.id);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {ratings.map((cat) => (
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

export default RatingTab;

const styles = StyleSheet.create({
  checkBox: {
    marginBottom: 20,
  },
});
