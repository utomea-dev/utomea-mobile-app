import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

import LeftArrow from "../../assets/icons/left_arrow.svg";

const GeneralHeader = ({ title = "", CTA = () => {} }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const onBack = () => {
    if (route.params?.previousScreen === "search") {
      navigation.navigate("Search");
      return;
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <LeftArrow />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {CTA && <CTA />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingBottom: 16,
    paddingVertical: 12,
    borderBottomColor: "#3B3B3B",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default GeneralHeader;
