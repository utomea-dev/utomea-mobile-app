import { Platform, ToastAndroid } from "react-native";

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { MONTHS } from "../constants/constants";

export const trimAndNormalizeSpaces = (str) => {
  return str.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
};

export const formatTime = (epochTime: number) => {
  const formattedTime = new Date(epochTime).toISOString();
  return formattedTime;
};

export const formatDate = (date = "", short = false) => {
  const splitDate = date.split("-");
  const monthString = MONTHS[splitDate[1]][short ? "short" : "long"];
  return `${monthString} ${splitDate[2]}, ${splitDate[0]}`;
};

export const daysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const isDateRangeValid = (startDate, endDate) => {
  const jsDate1 = new Date(startDate);
  const jsDate2 = new Date(endDate);

  if (jsDate1 > jsDate2) {
    return false;
  }
  return true;
};

export const deepCloneArray = (arr) => {
  if (Array.isArray(arr)) {
    return arr.map((item) => deepCloneArray(item));
  } else {
    return arr;
  }
};

export const formatISOToDateString = (dateString: string) => {
  const date = new Date(dateString);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDateTime = date.toLocaleString(undefined, options);

  return formattedDateTime;
};

export const calculateDuration = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const durationInMilliseconds = endDate - startDate;
  // Calculate days, hours, and minutes
  const days = Math.floor(durationInMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (durationInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (days === 0 && hours === 0 && minutes === 0) {
    return "0 min";
  }

  // Format the duration
  let duration = "";
  if (days > 0) {
    duration += `${days} day${days > 1 ? "s" : ""}`;
  }
  if (hours > 0) {
    duration += `${duration.length > 0 ? ", " : ""}${hours} hr${
      hours > 1 ? "s" : ""
    }`;
  }
  if (minutes > 0 && days === 0) {
    duration += `${duration.length > 0 ? ", " : ""}${minutes} min`;
  }

  return duration;
};

export const convertToAMPM = (timestamp) => {
  const date = new Date(timestamp);

  // Get hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM
  const ampm = hours >= 12 ? "pm" : "am";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Format the time in AM/PM
  const timeInAMPM = `${formattedHours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`;

  return timeInAMPM;
};

export const showNotification = ({ message }) => {
  return null;
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === "ios") {
    PushNotificationIOS.presentLocalNotification({
      alertTitle: "Debug log",
      alertBody: message,
    });
  }
};
