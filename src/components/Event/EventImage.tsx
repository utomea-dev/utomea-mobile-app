import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";

import Verified from "../../assets/icons/verified.svg";
import thumbnail from "../../assets/images/thumbnail.png";

const EventImage = ({
  isVerified = false,
  imageUrl = "",
  imageStyles = {},
}) => {
  const [blur, setBlur] = useState(20);
  const placeholderUrl =
    "https://utomea-events.s3.us-east-2.amazonaws.com/thumbnail.png";
  return (
    <View style={styles.container}>
      {isVerified && <Verified style={styles.icon} />}
      <Image
        blurRadius={blur}
        onLoadEnd={() => setBlur(0)}
        style={[styles.image, imageStyles]}
        source={{ uri: imageUrl ? imageUrl : placeholderUrl }}
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
