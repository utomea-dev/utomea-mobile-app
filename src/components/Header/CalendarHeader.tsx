import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

import DatePicker from "./DatePicker";
import {
  resetDate,
  setEndDate,
  setHomeFilter,
} from "../../redux/slices/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { MONTHS } from "../../constants/constants";

import Calendar from "../../assets/icons/calendar.svg";
import Close from "../../assets/icons/close.svg";
import CustomButton from "../Button/Button";

const CalendarHeader = () => {
  const dispatch = useDispatch();

  const { year, month, date } = useSelector((state) => state.home.endDate);
  const [isFlyInVisible, setIsFlyInVisible] = useState(false);

  const handlePress = (entry) => {
    showFlyIn();
  };

  const hideFlyIn = () => {
    setIsFlyInVisible(false);
  };

  const showFlyIn = () => {
    setIsFlyInVisible(true);
  };

  const handleContinue = () => {
    dispatch(setHomeFilter({ key: "date", value: `${year}-${month}-${date}` }));
    hideFlyIn();
  };

  const handleClearFilter = () => {
    dispatch(resetDate());
    dispatch(setHomeFilter({ key: "date", value: "" }));
    hideFlyIn();
  };

  const renderFlyIn = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFlyInVisible}
        onRequestClose={hideFlyIn}
      >
        <View style={styles.dateContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.flex}>
              <Text style={styles.dateTitle}>Jump to Date</Text>
              <Close onPress={hideFlyIn} />
            </View>
          </View>

          <View style={{ marginVertical: 24 }}>
            <DatePicker
              year={year}
              month={month}
              date={date}
              setDate={setEndDate}
            />
          </View>

          <CustomButton
            title="Continue"
            onPress={handleContinue}
            buttonStyle={{ paddingVertical: 8 }}
          />
          <CustomButton
            title="Clear filter"
            onPress={handleClearFilter}
            buttonStyle={{ paddingVertical: 8, backgroundColor: "#222222" }}
            containerStyle={{ marginVertical: 8 }}
            textStyle={{ color: "#FFFFFF" }}
          />
        </View>
      </Modal>
    );
  };
  return (
    <View style={styles.container}>
      {renderFlyIn()}
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
        <Text
          style={styles.title}
        >{`${MONTHS[month].long} ${date}, ${year}`}</Text>
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
  dateContainer: {
    position: "absolute",
    paddingHorizontal: 16,
    width: "100%",
    height: 310,
    paddingBottom: 40,
    backgroundColor: "rgba(14, 14, 14, 0.9)",
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
  dateTitle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    marginVertical: 12,
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default CalendarHeader;
