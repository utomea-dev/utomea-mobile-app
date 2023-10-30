import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "../../../components/Button/Button";

const FilterTabs = ({
  tabs = [],
  activeTab = "Date Range",
  setActiveTab = (a) => {},
}) => {
  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={{ marginVertical: 16, gap: 2 }}>
      {tabs.map((tab) => (
        <CustomButton
          key={tab}
          onPress={() => handleTabPress(tab)}
          title={tab}
          buttonStyle={
            tab === activeTab
              ? styles.activeButtonStyle
              : styles.inactiveButtonStyle
          }
          textStyle={
            tab === activeTab
              ? styles.activeTextStyle
              : styles.inactiveTextStyle
          }
        />
      ))}
    </View>
  );
};

export default FilterTabs;

const styles = StyleSheet.create({
  inactiveButtonStyle: {
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  inactiveTextStyle: {
    color: "#ADADAD",
    textAlign: "left",
  },
  activeButtonStyle: {
    backgroundColor: "#F2F2F2",
    justifyContent: "flex-start",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  activeTextStyle: {
    color: "#0E0E0E",
    textAlign: "left",
  },
});
