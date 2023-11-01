import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Alert,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import GeneralHeader from "../../components/Header/GeneralHeader";
import Options from "./Components/Options";
import Menu from "../../assets/icons/Menu.png";
import Excluded from "./Components/Excluded";
import BackDropMenu from "../../components/BackDropMenu/BackDropMenu";

const ExcludedLocation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <GeneralHeader title={`Excluded Locations`} />
      <View>
        <Text style={styles.paragraph}>
          New Events are not created for any of the listed locations here. To
          start creating events for any of these locations, you may delete them
          from the Excluded Locations list.
        </Text>
        <Excluded
          title={"5331 Rexford Court"}
          subtitle={"Montgomery AL 36116"}
        />
        <Excluded
          title={"5331 Rexford Court"}
          subtitle={"Montgomery AL 36116"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  paragraph: {
    fontSize: 14,
    marginTop: 15,
    lineHeight: 20,
    color: "#ADADAD",
    fontWeight: "400",
    marginBottom: 10,
  },
});

export default ExcludedLocation;
