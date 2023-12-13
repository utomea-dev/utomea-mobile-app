import React, { useState } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GeneralHeader from "../../components/Header/GeneralHeader";
import Label from "../../components/Label/Label";
import DatePicker from "../../components/Header/DatePicker";
import {
  resetDate,
  resetHome,
  setDateString,
  setEndDate,
  setStartDate,
} from "../../redux/slices/homeSlice";
import CustomButton from "../../components/Button/Button";
import { useFocusEffect } from "@react-navigation/native";
import { isDateRangeValid } from "../../utils/helpers";

const DateRange = ({ navigation }) => {
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
    navigation.navigate("Create/create");
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     dispatch(resetHome());
  //     dispatch(resetDate());
  //   }, [dispatch])
  // );

  return (
    <View style={styles.dateContainer}>
      <GeneralHeader title="Create an Event" />

      <View style={styles.heading}>
        <Text style={styles.title}>Select Date Range</Text>
        <Text style={styles.paragraph}>
          Please select the start and end date on which this event took place
        </Text>
      </View>

      <View>
        <Label labelStyle={{ marginBottom: 16 }} label="Start Date" />
        <DatePicker
          year={startYear}
          month={startMonth}
          date={startDay}
          setDate={setStartDate}
        />
      </View>

      <View style={{ marginVertical: 24 }}>
        <Label labelStyle={{ marginBottom: 16 }} label="End Date" />
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

export default DateRange;

const styles = StyleSheet.create({
  heading: {
    marginVertical: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  headerContainer: {
    width: "100%",
    borderBottomColor: "#3B3B3B",
    borderBottomWidth: 1,
  },
  dateContainer: {
    width: "100%",
    height: "100%",
  },
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: "#ADADAD",
    textAlign: "center",
  },
  errorText: {
    fontSize: 12,
    color: "#FC7A1B",
    textAlign: "left",
  },
});
