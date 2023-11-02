import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import Label from "../../../components/Label/Label";
import CustomButton from "../../../components/Button/Button";

import Geolocation from "../../../assets/icons/geolocation.svg";

const LocationSection = ({
  onPress = () => {},
  location = "",
  validationError = "",
  disabled = false,
}) => {
  return (
    <View style={{ marginVertical: 20 }}>
      <View style={[styles.sectionTitle]}>
        <Label label={"Location"} labelStyle={{ marginRight: 10, flex: 0.5 }} />
        <CustomButton
          disabled={disabled}
          onPress={onPress}
          title={
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
                gap: 8,
              }}
            >
              <Text
                style={styles.fontStyle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {location ? location : "Select on the Map"}
              </Text>
              <Geolocation />
            </View>
          }
          buttonStyle={{
            paddingVertical: 6,
            paddingHorizontal: 10,
            backgroundColor: "#222222",
          }}
          containerStyle={{ maxWidth: "60%" }}
        />
      </View>
      {validationError && (
        <View style={{ marginTop: 5 }}>
          <Text style={styles.errorText}>{validationError}</Text>
        </View>
      )}
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
  fontStyle: {
    top: Platform.OS === "android" ? 0 : 2,
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 16,
  },
  errorText: {
    fontSize: 12,
    color: "#FC7A1B",
    textAlign: "left",
  },
});
