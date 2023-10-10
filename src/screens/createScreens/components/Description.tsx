import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomInput from "../../../components/Input/Input";

const Description = ({ description = "", setDescription = () => {} }) => {
  return (
    <View style={{ marginVertical: 20 }}>
      <CustomInput
        label="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Describe the event in few words..."
        placeholderTextColor="grey"
        multiline
        numberOfLines={3}
        inputStyle={{
          lineHeight: 20,
          paddingVertical: 10,
          fontSize: 14,
          height: 80,
          textAlignVertical: "top",
        }}
      />
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({});
