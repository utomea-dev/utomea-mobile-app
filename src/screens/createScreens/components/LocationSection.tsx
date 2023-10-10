import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Label from "../../../components/Label/Label";
import CustomButton from "../../../components/Button/Button";

import Geolocation from "../../../assets/icons/geolocation.svg";

const LocationSection = ({ onPress = () => {}, location }) => {
  return (
    <View style={[styles.sectionTitle, { marginVertical: 20 }]}>
      <Label label={"Location"} labelStyle={{ marginRight: 10, flex: 0.5 }} />
      <CustomButton
        onPress={onPress}
        title={
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text
              style={{ color: "#FFFFFF" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {location ? location : "Select on the Map"}
            </Text>
            <Geolocation />
          </View>
        }
        buttonStyle={{
          paddingVertical: 7.5,
          paddingHorizontal: 4,
          backgroundColor: "#222222",
        }}
        containerStyle={location ? { flex: 0.6 } : {}}
      />
    </View>
  );
};

export default LocationSection;

const styles = StyleSheet.create({
  sectionTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
});
