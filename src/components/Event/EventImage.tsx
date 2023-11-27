import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";

import Verified from "../../assets/icons/verified.svg";
import thumbnail from "../../assets/images/thumbnail.png";

const EventImage = ({
  isVerified = false,
  imageUrl = "",
  imageStyles = {},
  size = 600,
}) => {
  const placeholderUrl =
    "https://utomea-events.s3.us-east-2.amazonaws.com/thumbnail.png";
  const splitter = "cloudfront.net";
  let newUrl = "";
  if (imageUrl) {
    const urlParts = imageUrl?.split(splitter);
    newUrl = imageUrl?.includes(splitter)
      ? urlParts.join(`${splitter}/fit-in/${size}x${size}`)
      : imageUrl;
  }

  return (
    <View style={styles.container}>
      {isVerified && <Verified style={styles.icon} />}
      <Image
        style={[styles.image, imageStyles]}
        source={{ uri: imageUrl ? newUrl : placeholderUrl }}
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
