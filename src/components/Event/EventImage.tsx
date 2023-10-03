import React from "react";
import { StyleSheet, View, Image } from "react-native";

import Verified from "../../assets/icons/verified.svg";

const EventImage = ({ isVerified = false }) => {
  return (
    <View style={styles.container}>
      {isVerified && <Verified style={styles.icon} />}
      <Image
        style={styles.image}
        source={{
          uri: "https://img.freepik.com/free-photo/woman-lookint-ships-sea_23-2148330634.jpg?q=10&h=200",
        }}
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
