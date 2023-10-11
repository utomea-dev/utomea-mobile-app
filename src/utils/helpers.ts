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

export const showNotification = ({ message }) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === "ios") {
    PushNotificationIOS.presentLocalNotification({
      alertTitle: "Debug log",
      alertBody: message,
    });
  }
};
