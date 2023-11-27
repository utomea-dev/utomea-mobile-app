import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Progress from "react-native-progress";

import React from "react";
import { useSelector } from "react-redux";

const ProgressLoader = () => {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const { totalImages, uploadedImages } = useSelector((state) => state.home);
  return (
    <View style={styles.loaderContainer}>
      <View
        style={[
          styles.loader,
          { top: screenHeight / 2.2, left: screenWidth / 2.05 },
        ]}
      >
        <Progress.Circle
          size={70}
          color="#58DAC3"
          // progress={0.3}
          progress={totalImages === 0 ? 0 : uploadedImages / totalImages}
          borderWidth={1}
          showsText
          textStyle={{ fontSize: 18, fontWeight: 500 }}
          indeterminateAnimationDuration={2000}
          indeterminate={totalImages === 0}
        />
        {totalImages > 0 && (
          <View>
            <Text style={{ color: "#58DAC3", marginTop: 8 }}>
              Uploading Images
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProgressLoader;

const styles = StyleSheet.create({
  loaderContainer: {
    zIndex: 999,
    // justifyContent: "center",
    // alignItems: "center",
    // position: "absolute",
  },
  loader: {
    position: "absolute",
    transform: [{ translateX: -80 }, { translateY: -50 }],
    zIndex: 9999,
    // height: 90,
    width: 150,
    backgroundColor: "rgba(10,10,10,0.9)",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
    borderRadius: 12,
  },
});
