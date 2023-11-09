import React, { useState } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import Close from "../../../assets/icons/close.svg";
import CustomButton from "../../../components/Button/Button";
import DatePicker from "../../../components/Header/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndTime,
  setStartTime,
  setTimeString,
} from "../../../redux/slices/homeSlice";
import Label from "../../../components/Label/Label";
import { isDateRangeValid, isTimeValid } from "../../../utils/helpers";
import TimePicker from "../../../components/Header/TimePicker";

const TimeFlyIn = ({ onClose = () => {}, closeOnly = () => {} }) => {
  const dispatch = useDispatch();

  const {
    hours: startHour,
    minutes: startMinute,
    ampm: startAmpm,
  } = useSelector((state) => state.home.startTime);
  const {
    hours: endHour,
    minutes: endMinute,
    ampm: endAmpm,
  } = useSelector((state) => state.home.endTime);

  const { startDateString, endDateString, startTimeString, endTimeString } =
    useSelector((state) => state.home);

  const [dateRangeError, setDateRangeError] = useState("");

  const handleContinue = () => {
    if (startDateString === endDateString) {
      if (
        !isTimeValid(
          `${endHour}-${endMinute}-${endAmpm}`,
          `${startHour}-${startMinute}-${startAmpm}`
        )
      ) {
        setDateRangeError("Please choose a valid time range");
        return;
      }
    }
    if (!true) {
      setDateRangeError("Please choose a valid date range");
      return;
    }

    dispatch(
      setTimeString({
        key: "startTimeString",
        value: `${startHour}-${startMinute}-${startAmpm}`,
      })
    );
    dispatch(
      setTimeString({
        key: "endTimeString",
        value: `${endHour}-${endMinute}-${endAmpm}`,
      })
    );
    setDateRangeError("");
    closeOnly();
  };

  return (
    <View style={styles.dateContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.flex}>
          <Text style={styles.dateTitle}>Select Time range</Text>
          <Close onPress={onClose} />
        </View>
      </View>

      <View style={{ marginTop: 24 }}>
        <Label labelStyle={{ marginBottom: 8 }} label="Start Time" />
        <TimePicker
          hour={startHour.toString()}
          minute={startMinute.toString()}
          ampm={startAmpm}
          setTime={setStartTime}
        />
      </View>

      <View style={{ marginVertical: 24 }}>
        <Label labelStyle={{ marginBottom: 8 }} label="End Time" />
        <TimePicker
          hour={endHour.toString()}
          minute={endMinute.toString()}
          ampm={endAmpm}
          setTime={setEndTime}
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

export default TimeFlyIn;

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
  errorText: {
    fontSize: 12,
    color: "#FC7A1B",
    textAlign: "left",
  },
});
