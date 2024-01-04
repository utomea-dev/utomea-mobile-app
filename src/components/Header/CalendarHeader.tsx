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

const CalendarHeader = ({ isDisabled }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().getDate();

  const dispatch = useDispatch();

  const { year, month, date: day } = useSelector((state) => state.home.endDate);
  const { date } = useSelector((state) => state.home);

  const [isFlyInVisible, setIsFlyInVisible] = useState(false);
  const [localDate, setLocalDate] = useState(
    `${currentYear}-${
      currentMonth < 10 ? "0" + currentMonth : currentMonth
    }-${currentDate}`
  );

  const handlePress = (entry) => {
    showFlyIn();
  };

  const hideFlyIn = () => {
    setIsFlyInVisible(false);
    dispatch(resetDate());
  };

  const showFlyIn = () => {
    setIsFlyInVisible(true);
  };

  const handleContinue = () => {
    dispatch(setHomeFilter({ key: "date", value: `${year}-${month}-${day}` }));
    dispatch(resetDate());
    setLocalDate(() => `${year}-${month}-${day}`);
    hideFlyIn();
  };

  const handleClearFilter = () => {
    setLocalDate(
      () =>
        `${currentYear}-${
          currentMonth < 10 ? "0" + currentMonth : currentMonth
        }-${currentDate}`
    );
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
              year={date === "" ? year : date.split("-")[0]}
              month={date === "" ? month : date.split("-")[1]}
              date={date === "" ? day : date.split("-")[2]}
              setDate={setEndDate}
            />
          </View>

          <CustomButton
            title="Continue"
            onPress={handleContinue}
            buttonStyle={{ paddingVertical: 8 }}
          />
          <CustomButton
            title="Clear"
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
        disabled={isDisabled}
        onPress={handlePress}
      >
        <Calendar />
        {date === "" ? (
          <Text style={styles.title}>{`${
            MONTHS[localDate.split("-")[1]]?.long
          } ${localDate.split("-")[2]}, ${localDate.split("-")[0]}`}</Text>
        ) : (
          <Text style={styles.title}>{`${MONTHS[date.split("-")[1]]?.long} ${
            date.split("-")[2]
          }, ${date.split("-")[0]}`}</Text>
        )}
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
