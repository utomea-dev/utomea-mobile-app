import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Calendar from "../../assets/icons/calendar.svg";

const CalendarHeader = () => {
  const handlePress = (entry) => {};

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 6,
        }}
        onPress={handlePress}
      >
        <Calendar />
        <Text style={styles.title}>September 7, 2023</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: 16,
    borderBottomColor: "#3B3B3B",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    color: "#FFFFFF",
    fontWeight: "400",
    textAlign: "left",
  },
});

export default CalendarHeader;
