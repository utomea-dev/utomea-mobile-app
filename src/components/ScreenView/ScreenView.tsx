import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

const ScreenView = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
});

export default ScreenView;
