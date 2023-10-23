import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React from "react";

const OverlayLoader = () => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.loaderContainer}>
      <View
        style={[
          styles.loader,
          { top: screenHeight / 2.2, left: screenWidth / 2.05 },
        ]}
      >
        <ActivityIndicator size={"large"} />
      </View>
    </View>
  );
};

export default OverlayLoader;

const styles = StyleSheet.create({
  loaderContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    // position: "absolute",
  },
  loader: {
    position: "absolute",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 9999,
    height: 80,
    width: 80,
    backgroundColor: "rgba(50, 68, 68, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});
