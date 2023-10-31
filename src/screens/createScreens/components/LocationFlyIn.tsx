import React from "react";
import { StyleSheet, Text, View, Input, ActivityIndicator } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import CustomButton from "../../../components/Button/Button";
import CustomInput from "../../../components/Input/Input";

import Close from "../../../assets/icons/close.svg";
import Check from "../../../assets/icons/check.svg";

import { MAPS_API_KEY } from "@env";

const GOOGLE_PLACES_API_KEY = MAPS_API_KEY;

const LocationFlyIn = ({ onClose, setLocation, setLatitude, setLongitude }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.flex}>
          <Text style={styles.title}>Enter a Location</Text>
          <Close onPress={onClose} />
        </View>
      </View>

      <View style={{ marginVertical: 24 }}>
        <GooglePlacesAutocomplete
          styles={styles.locationStyles}
          placeholder="Search for a location"
          suppressDefaultStyles
          fetchDetails
          disableScroll={false}
          isRowScrollable={true}
          timeout={10000}
          debounce={1000}
          minLength={3}
          listUnderlayColor="#07AA8C"
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
          }}
          onPress={(data, details) => {
            const l = details.geometry.location;
            setLatitude(l.lat);
            setLongitude(l.lng);
            setLocation(data.description);
            onClose();
          }}
        />
      </View>
    </View>
  );
};

export default LocationFlyIn;

const styles = StyleSheet.create({
  locationStyles: {
    textInputContainer: {
      backgroundColor: "#222222",
      borderRadius: 8,
      marginBottom: 8,
      borderColor: "#3B3B3B",
      borderWidth: 1,
    },
    textInput: {
      height: 44,
      paddingVertical: 0,
      paddingHorizontal: 14,
      margin: 0,
      color: "#F2F2F2",
      fontSize: 14,
    },
    row: {
      paddingVertical: 10,
      borderRadius: 8,
    },
    description: {
      color: "#FFFFFF",
      paddingHorizontal: 14,
    },
  },
  container: {
    position: "absolute",
    paddingHorizontal: 16,
    width: "100%",
    height: "70%",
    paddingBottom: 40,
    backgroundColor: "rgba(14, 14, 14, 0.95)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    bottom: 0,
  },
  headerContainer: {
    width: "100%",
    borderBottomColor: "#3B3B3B",
    borderBottomWidth: 1,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    marginVertical: 12,
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "center",
  },
});
