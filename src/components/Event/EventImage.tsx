import React from "react";
import { StyleSheet, View, Image } from "react-native";

import Verified from "../../assets/icons/verified.svg";
import thumbnail from "../../assets/images/thumbnail.png";

const EventImage = ({
  isVerified = false,
  imageUrl = "",
  imageStyles = {},
}) => {
  return (
    <View style={styles.container}>
      {isVerified && <Verified style={styles.icon} />}
      <Image
        style={[styles.image, imageStyles]}
        source={imageUrl ? { uri: imageUrl } : thumbnail}
      />
    </View>
  );
};

export default EventImage;

const styles = StyleSheet.create({
  container: {},
  icon: {
    zIndex: 99,
    position: "absolute",
    top: 0,
    left: 0,
    margin: 4,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
  },
});
