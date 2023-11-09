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
