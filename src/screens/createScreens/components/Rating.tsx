import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import Label from "../../../components/Label/Label";

const MyRating = ({ rating = 0, setRating }) => {
  const ratingCompleted = (e) => {
    console.log("e=====", e);
    setRating(e);
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <Label label="Rating" />
      <AirbnbRating
        count={5}
        defaultRating={rating}
        size={30}
        showRating={false}
        selectedColor="#58DAC3"
        unSelectedColor="#ADADAD"
        onFinishRating={ratingCompleted}
        ratingContainerStyle={{
          marginTop: 6,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      />
    </View>
  );
};

export default MyRating;

const styles = StyleSheet.create({});
