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

export const checkPastDate = (startDate) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const jsDate1 = new Date(startDate);
  const jsDate2 = new Date(currentDate);

  if (jsDate1 < jsDate2) {
    return true;
  }
  return false;
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

export const isFutureTime = (inputTime) => {
  // Split the input time into hours, minutes, and AM/PM
  const [inputHours, inputMinutes, period] = inputTime.split("-");

  // Convert hours to 24-hour format
  let hours = parseInt(inputHours, 10);
  if (period.toLowerCase() === "pm" && hours !== 12) {
    hours += 12;
  } else if (period.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  // Create a Date object for the current time
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  // Compare the times
  if (
    hours > currentHours ||
    (hours === currentHours && parseInt(inputMinutes, 10) > currentMinutes)
  ) {
    return true;
  }

  return false;
};

export const calculateDuration = (startDateString, endDateString) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  // Calculate the duration in milliseconds
  const durationMillis = endDate - startDate;

  // Convert milliseconds to seconds
  const durationSeconds = durationMillis / 1000;

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);

  // Format the duration
  let formattedDuration = "";

  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    formattedDuration = `${days} day${
      days > 1 ? "s" : ""
    }, ${remainingHours} hr${remainingHours > 1 ? "s" : ""} ${minutes} min${
      minutes > 1 ? "s" : ""
    }`;
  } else if (hours >= 1) {
    formattedDuration = `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min${
      minutes > 1 ? "s" : ""
    }`;
  } else if (minutes >= 1) {
    formattedDuration = `${minutes} min${minutes > 1 ? "s" : ""}`;
  } else {
    formattedDuration = "Less than 1 min";
  }

  return formattedDuration;
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

export const isTimeValid = (time1, time2) => {
  const parseTime = (time) => {
    const [hours, minutes, ampm] = time.split("-");

    let totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    if (ampm.toLowerCase() === "pm") {
      totalMinutes += 12 * 60;
    }

    return totalMinutes;
  };

  const minutes1 = parseTime(time1);
  const minutes2 = parseTime(time2);

  return minutes1 >= minutes2;
};

export const convertTimeToISOString = (time) => {
  const [hours, minutes, ampm] = time.split("-");

  let isoHours = parseInt(hours, 10);
  const isoMinutes = parseInt(minutes, 10);

  if (ampm.toLowerCase() === "pm" && isoHours !== 12) {
    isoHours += 12;
  } else if (ampm.toLowerCase() === "am" && isoHours === 12) {
    isoHours = 0;
  }

  const isoTime = `${isoHours.toString().padStart(2, "0")}:${isoMinutes
    .toString()
    .padStart(2, "0")}:00.000Z`;

  return isoTime;
};

export const convertISOStringToTime = (isoTime) => {
  const date = new Date(isoTime);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const ampm = hours >= 12 ? "pm" : "am";

  const formattedHours = hours % 12 || 12;

  const time = `${formattedHours}-${minutes
    .toString()
    .padStart(2, "0")}-${ampm}`;

  return time;
};

export const convertISOStringToTime2 = (isoTime) => {
  const date = new Date(isoTime);

  // Get hours, minutes, and seconds from the Date object
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Determine whether it's AM or PM
  const ampm = hours >= 12 ? "pm" : "am";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12; // Use modulo and fallback to 12 if 0

  // Format the time as "hh:mm am/pm"
  const time = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;

  return time;
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
