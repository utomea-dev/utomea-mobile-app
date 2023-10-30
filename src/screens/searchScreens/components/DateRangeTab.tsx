import React, { useState } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../../components/Label/Label";
import DatePicker from "../../../components/Header/DatePicker";
import {
  setDateString,
  setEndDate,
  setStartDate,
} from "../../../redux/slices/homeSlice";

import Close from "../../../assets/icons/close.svg";

import { isDateRangeValid } from "../../../utils/helpers";

const DateRangeTab = ({ startDate, endDate }) => {
  const dispatch = useDispatch();

  const { year: startYear, month: startMonth, date: startDay } = startDate;
  const { year: endYear, month: endMonth, date: endDay } = endDate;

  const [dateRangeError, setDateRangeError] = useState("");

  return (
    <View style={styles.dateContainer}>
      <View>
        <Label labelStyle={{ marginBottom: 8 }} label="Start Date" />
        <DatePicker
          year={startYear}
          month={startMonth}
          date={startDay}
          setDate={setStartDate}
          containerStyle={{ borderRadius: 12, height: 80 }}
          blockStyle={{ height: 80 }}
          textStyle={{ fontSize: 16 }}
          snap={80}
        />
      </View>

      <View style={{ marginVertical: 24 }}>
        <Label labelStyle={{ marginBottom: 8 }} label="End Date" />
        <DatePicker
          year={endYear}
          month={endMonth}
          date={endDay}
          setDate={setEndDate}
          containerStyle={{ borderRadius: 12, height: 80 }}
          blockStyle={{ height: 80 }}
          textStyle={{ fontSize: 16, lineHeight: 20 }}
          snap={80}
        />
      </View>

      {dateRangeError && (
        <View style={{ marginTop: 5 }}>
          <Text style={styles.errorText}>{dateRangeError}</Text>
        </View>
      )}
    </View>
  );
};

export default DateRangeTab;

const styles = StyleSheet.create({
  dateContainer: {},
  errorText: {
    fontSize: 12,
    color: "#FC7A1B",
    textAlign: "left",
  },
});
