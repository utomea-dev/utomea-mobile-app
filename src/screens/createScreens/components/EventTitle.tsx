import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomInput from "../../../components/Input/Input";

const EventTitle = ({ title = "", onChangeText = () => {} }) => {
  const handleChange = (str) => {
    onChangeText(str);
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <CustomInput
        onChangeText={(text) => handleChange(text)}
        value={title}
        label="Event Title"
        placeholder="Choose a suitable name for this event"
        placeholderTextColor="grey"
      />
    </View>
  );
};

export default EventTitle;

const styles = StyleSheet.create({});
