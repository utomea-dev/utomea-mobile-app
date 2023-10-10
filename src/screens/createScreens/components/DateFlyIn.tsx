import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";
import Close from "../../../assets/icons/close.svg";
import CustomButton from "../../../components/Button/Button";
import DatePicker from "../../../components/Header/DatePicker";
import { useSelector } from "react-redux";
import { setEndDate, setStartDate } from "../../../redux/slices/homeSlice";
import Label from "../../../components/Label/Label";

const DateFlyIn = ({ onClose }) => {
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
    onClose();
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
    backgroundColor: "rgba(14, 14, 14, 0.9)",
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
});
