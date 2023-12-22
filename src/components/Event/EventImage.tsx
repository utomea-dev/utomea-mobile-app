import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";

import Verified from "../../assets/icons/verified.svg";
import SyncIcon from "../../assets/icons/sync.svg";
import thumbnail from "../../assets/images/thumbnail.png";

const EventImage = ({
  isSynced = true,
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

  const renderSyncOverlay = () => {
    return (
      !isSynced && (
        <View style={styles.syncContainer}>
          <SyncIcon />
        </View>
      )
    );
  };

  return (
    <View style={styles.container}>
      {renderSyncOverlay()}
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
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  syncContainer: {
    position: "absolute",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "rgba(66, 66, 66, 0.5)",
    zIndex: 9999,
  },
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
