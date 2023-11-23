import React, { useState } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import Close from "../../../assets/icons/close.svg";
import CustomButton from "../../../components/Button/Button";
import DatePicker from "../../../components/Header/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateString,
  setEndDate,
  setStartDate,
} from "../../../redux/slices/homeSlice";
import Label from "../../../components/Label/Label";
import { isDateRangeValid } from "../../../utils/helpers";

const DateFlyIn = ({ onClose = () => {}, closeOnly = () => {} }) => {
  const dispatch = useDispatch();

  const {
    year: startYear,
    month: startMonth,
    date: startDay,
  } = useSelector((state) => state.home.startDate);
  const {
    year: endYear,
    month: endMonth,
    date: endDay,
  } = useSelector((state) => state.home.endDate);

  const [dateRangeError, setDateRangeError] = useState("");

  const handleContinue = () => {
    const currentDate = new Date()
      .toLocaleDateString()
      .split("/")
      .reverse()
      .join("-");
    const startDate = `${startYear}-${startMonth}-${startDay}`;
    const endDate = `${endYear}-${endMonth}-${endDay}`;
    const isDateValid = isDateRangeValid(startDate, endDate);
    const isNotFutureDate = isDateRangeValid(endDate, currentDate);
    if (!isNotFutureDate) {
      setDateRangeError("Cannot choose a future date");
      return;
    }
    if (!isDateValid) {
      setDateRangeError("Please choose a valid date range");
      return;
    }

    dispatch(
      setDateString({
        key: "startDateString",
        value: `${startYear}-${startMonth}-${startDay}`,
      })
    );
    dispatch(
      setDateString({
        key: "endDateString",
        value: `${endYear}-${endMonth}-${endDay}`,
      })
    );
    setDateRangeError("");
    closeOnly();
  };

  return (
    <View style={styles.dateContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.flex}>
          <Text style={styles.dateTitle}>Select date range</Text>
          <Close onPress={onClose} />
        </View>
      </View>

      <View style={{ marginTop: 24 }}>
        <Label labelStyle={{ marginBottom: 8 }} label="Start Date" />
        <DatePicker
          year={startYear}
          month={startMonth}
          date={startDay}
          setDate={setStartDate}
        />
      </View>

      <View style={{ marginVertical: 24 }}>
        <Label labelStyle={{ marginBottom: 8 }} label="End Date" />
        <DatePicker
          year={endYear}
          month={endMonth}
          date={endDay}
          setDate={setEndDate}
        />
      </View>

      <CustomButton
        title="Continue"
        onPress={handleContinue}
        buttonStyle={{ paddingVertical: 8 }}
      />
      {dateRangeError && (
        <View style={{ marginTop: 5 }}>
          <Text style={styles.errorText}>{dateRangeError}</Text>
        </View>
      )}
    </View>
  );
};

export default DateFlyIn;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    borderBottomColor: "#3B3B3B",
    borderBottomWidth: 1,
  },
  dateContainer: {
    position: "absolute",
    paddingHorizontal: 16,
    width: "100%",
    paddingBottom: 40,
    backgroundColor: "rgba(14, 14, 14, 0.95)",
    borderWidth: 0.7,
    borderColor: "#333333",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    bottom: 0,
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
  errorText: {
    fontSize: 12,
    color: "#FC7A1B",
    textAlign: "left",
  },
});
