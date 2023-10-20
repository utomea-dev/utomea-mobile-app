import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const OverlayLoader = () => {
  return (
    <View style={styles.loaderContainer}>
      <View style={styles.loader}>
        <ActivityIndicator size={"large"} />
      </View>
    </View>
  );
};

export default OverlayLoader;

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  loader: {
    height: 90,
    width: 90,
    backgroundColor: "rgba(50, 68, 68, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});
