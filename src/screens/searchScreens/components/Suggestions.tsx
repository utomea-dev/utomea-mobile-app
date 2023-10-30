import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../../../components/Button/Button";
import CheckIcon from "../../../assets/icons/check.svg";
import { useDispatch } from "react-redux";
import {
  clearSuggestions,
  setSearchString,
} from "../../../redux/slices/searchSlice";

const Suggestions = ({ suggestions = [], loading = false }) => {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const handlePress = (str, i) => {
    console.log("clicked----", str, i);
    setSelected(i);
    dispatch(setSearchString(str));

    setTimeout(() => {
      dispatch(clearSuggestions());
      setSelected(null);
    }, 500);
  };

  if (loading) {
    return (
      <View
        style={{
          paddingVertical: 80,
          backgroundColor: "rgba(14, 14, 14, 0.95)",
        }}
      >
        <ActivityIndicator size={"small"} />
      </View>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {suggestions && suggestions.length > 0 ? (
        suggestions.map((sugg, i) => (
          <TouchableOpacity
            onPress={() => handlePress(sugg, i)}
            key={i}
            style={[
              styles.button,
              {
                borderRadius: selected === i ? 8 : 0,
                backgroundColor:
                  selected === i ? "#07AA8C" : "rgba(14, 14, 14, 0.95)",
              },
            ]}
          >
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ color: "#FFFFFF" }}
            >
              {sugg}
            </Text>
            {selected === i && <CheckIcon />}
          </TouchableOpacity>
        ))
      ) : (
        <Text
          style={{
            color: "#FFFFFF",
            backgroundColor: "rgba(14, 14, 14, 0.95)",
            marginVertical: 12,
            paddingBottom: 24,
          }}
        >
          No suggestions found
        </Text>
      )}
    </ScrollView>
  );
};

export default Suggestions;

const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    width: "100%",
    maxHeight: 300,
  },
  button: {
    flexDirection: "row",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
