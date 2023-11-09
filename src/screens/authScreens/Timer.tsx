import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

const Timer = ({ setCanResend, time = 59, setTime }) => {
  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {};
  }, [time]);

  return time > 0 && <Text style={{ color: "#ADADAD" }}>in {time} sec</Text>;
};

export default Timer;

const styles = StyleSheet.create({});
