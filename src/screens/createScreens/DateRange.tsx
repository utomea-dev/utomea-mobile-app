import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";
import Close from "../../../assets/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import GeneralHeader from "../../components/Header/GeneralHeader";
import Label from "../../components/Label/Label";
import DatePicker from "../../components/Header/DatePicker";
import {
  resetHome,
  setEndDate,
  setStartDate,
} from "../../redux/slices/homeSlice";
import CustomButton from "../../components/Button/Button";
import { useFocusEffect } from "@react-navigation/native";

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

  const handleContinue = () => {
    // onClose();
    navigation.navigate("Create/create");
  };

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
});
