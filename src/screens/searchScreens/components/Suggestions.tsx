import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
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
    Keyboard.dismiss();
    setSelected(i);
    dispatch(setSearchString(str));

    setTimeout(() => {
      dispatch(clearSuggestions());
      setSelected(null);
    }, 200);
  };

  if (loading) {
    return (
      <View
        style={{
          paddingVertical: 30,
          backgroundColor: "rgba(14, 14, 14, 0.95)",
        }}
      >
        <ActivityIndicator size={"small"} />
      </View>
    );
  }
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      {suggestions && suggestions.length > 0 ? (
        suggestions.map((sugg, i) => (
          <View
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
            <TouchableOpacity
              style={{
                zIndex: 999,
                paddingVertical: 12,
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => handlePress(sugg, i)}
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
          </View>
        ))
      ) : (
        <View
          style={{
            borderBottomColor: "#3B3B3B",
            backgroundColor: "rgba(14, 14, 14, 0.95)",
          }}
        >
          <Text
            style={{
              zIndex: 999,
              color: "#FFFFFF",
              backgroundColor: "rgba(14, 14, 14, 0.95)",
              marginVertical: 12,
            }}
          >
            No suggestions found
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Suggestions;

const styles = StyleSheet.create({
  container: {
    zIndex: 998,
    width: "100%",
    maxHeight: 300,
    borderBottomColor: "#3B3B3B",
    borderBottomWidth: 1,
  },
  button: {
    zIndex: 999,
    flexDirection: "row",
    borderRadius: 8,
    paddingHorizontal: 14,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
