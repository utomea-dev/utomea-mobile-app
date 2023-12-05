import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Input, ActivityIndicator } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import CustomButton from "../../../components/Button/Button";
import CustomInput from "../../../components/Input/Input";
// navigator.geolocation = require("@react-native-community/geolocation");
navigator.geolocation = require("react-native-geolocation-service");

import Close from "../../../assets/icons/close.svg";
import DetectLocationIcon from "../../../assets/icons/current_location.svg";

import { MAPS_API_KEY } from "@env";

const GOOGLE_PLACES_API_KEY = MAPS_API_KEY;

const LocationFlyIn = ({
  onClose,
  setLocation,
  setLatitude,
  setLongitude,
  location = "",
}) => {
  const placesRef = useRef();

  useEffect(() => {
    placesRef.current?.focus();
    placesRef.current?.setAddressText(location);
  }, []);

  const handlePlaceSelect = (data, details) => {
    const l = details.geometry.location;
    setLatitude(l.lat);
    setLongitude(l.lng);
    setLocation(details.formatted_address);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.flex}>
          <Text style={styles.title}>Enter a Location</Text>
          <Close onPress={onClose} />
        </View>
      </View>

      <View style={{ marginVertical: 24, marginBottom: 120 }}>
        <GooglePlacesAutocomplete
          ref={placesRef}
          styles={styles.locationStyles}
          placeholder="Search for a location"
          placeholderText={{ color: "grey" }}
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
            key: "AIzaSyB8iCzJlmSC8Ku6pStVH1l-qVjZi65H96k",
            language: "en",
          }}
          listEmptyComponent={
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#FFFFFF" }}>No results were found</Text>
            </View>
          }
          onPress={(data, details) => handlePlaceSelect(data, details)}
          currentLocation={true}
          currentLocationLabel={
            <View
              style={{
                flex: 1,
                // position: "absolute",
                // height: 46,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                width: "115%",
              }}
            >
              <Text style={{ color: "#FFFFFF", marginLeft: 20 }}>
                Detect my Current Location
              </Text>
              <DetectLocationIcon />
            </View>
          }
          keyboardShouldPersistTaps="always"
          keepResultsAfterBlur={true}
          // predefinedPlaces={currentLocation}
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
    loader: {
      // position: "absolute",
      width: "100%",
      height: 60,
      marginVertical: 140,
    },
    predefinedPlacesDescription: {
      //   position: "absolute",
      width: "100%",

      //   color: "#FFFFFF",
      //   fontWeight: 500,
      //   backgroundColor: "transparent",
      //   paddingVertical: 12,
      //   borderRadius: 4,
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
      justifyContent: "center",
      alignItems: "flex-start",
      height: 46,
      marginTop: 1,
      borderRadius: 8,
    },
    description: {
      color: "#FFFFFF",
      paddingHorizontal: 14,
    },
  },

  container: {
    flex: 1,
    position: "absolute",
    paddingHorizontal: 16,
    width: "100%",
    height: "70%",
    paddingBottom: 40,
    backgroundColor: "rgba(14, 14, 14, 0.95)",
    borderWidth: 0.7,
    borderColor: "#333333",
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
