import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

let scrollY = 0;

const hourData = Array.from({ length: 12 }, (_, i) => ({
  label: `${1 + i}`,
  value: `${1 + i}`,
}));

const minuteData = Array.from({ length: 60 }, (_, i) => ({
  label: `${i < 10 ? "0" : ""}${i}`,
  value: `${i < 10 ? "0" : ""}${i}`,
}));

const ampmData = [
  { label: "AM", value: "am" },
  { label: "PM", value: "pm" },
];

const TimePicker = ({
  hour = "00",
  minute = "00",
  ampm = "AM",
  setTime = () => {},
  blockStyle = {},
  containerStyle = {},
  textStyle = {},
  snap = 120,
}) => {
  const dispatch = useDispatch();
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const ampmsRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const hourIndex = hourData.findIndex((y) => y.value === hour);
      console.log("Index and stuff-----", hourIndex, hour, typeof hour);
      hoursRef.current?.scrollToIndex({ index: hourIndex, animate: false });
    }, 50);
    setTimeout(() => {
      const minuteIndex = minuteData.findIndex((m) => m.value === minute);
      minutesRef.current?.scrollToIndex({ index: minuteIndex });
    }, 100);
    setTimeout(() => {
      const ampmIndex = ampmData.findIndex((d) => d.value === ampm);
      ampmsRef.current?.scrollToIndex({ index: ampmIndex });
    }, 150);
  }, []);

  const handleHourChange = () => {
    const index = Math.floor(scrollY / snap);
    console.log("trigger - hour???", scrollY, index);
    dispatch(setTime({ key: "hours", value: hourData[index]?.value }));
  };

  const handleMinuteChange = () => {
    const index = Math.floor(scrollY / snap);
    console.log("trigger - minute???", scrollY, index);
    dispatch(setTime({ key: "minutes", value: minuteData[index]?.value }));
  };

  const handleAmpmChange = () => {
    const index = Math.floor(scrollY / snap);
    console.log("trigger - ampm???", scrollY, index);
    dispatch(setTime({ key: "ampm", value: ampmData[index]?.value }));
  };

  const getItemLayout = (data, index) => {
    return {
      length: snap,
      offset: snap * index,
      index,
    };
  };

  const RenderHours = () => {
    return (
      <View style={styles.block}>
        <FlatList
          ref={hoursRef}
          data={hourData}
          keyExtractor={(item) => item.label.toString()}
          initialNumToRender={10}
          getItemLayout={getItemLayout}
          showsVerticalScrollIndicator={false}
          snapToAlignment="start"
          snapToInterval={snap}
          onMomentumScrollEnd={handleHourChange}
          onScroll={({ nativeEvent }) => {
            scrollY = nativeEvent.contentOffset.y;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={[styles.blockContent, blockStyle]}>
                <Text style={[styles.text, textStyle]}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  const RenderMinutes = () => {
    return (
      <View
        style={[
          styles.block,
          {
            borderColor: "#3B3B3B",
            borderLeftWidth: 1,
            borderRightWidth: 1,
          },
        ]}
      >
        <FlatList
          ref={minutesRef}
          data={minuteData}
          keyExtractor={(item) => item.label.toString()}
          initialNumToRender={12}
          initialScrollIndex={1}
          getItemLayout={getItemLayout}
          snapToAlignment="start"
          snapToInterval={snap}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={handleMinuteChange}
          onScroll={({ nativeEvent }) => {
            scrollY = nativeEvent.contentOffset.y;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={[styles.blockContent, blockStyle]}>
                <Text style={[styles.text, textStyle]}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  const RenderAmpms = () => {
    return (
      <View style={styles.block}>
        <FlatList
          ref={ampmsRef}
          data={ampmData}
          keyExtractor={(item) => item.label.toString()}
          initialNumToRender={10}
          initialScrollIndex={1}
          getItemLayout={getItemLayout}
          snapToAlignment="start"
          snapToInterval={snap}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={handleAmpmChange}
          onScroll={({ nativeEvent }) => {
            scrollY = nativeEvent.contentOffset.y;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={[styles.blockContent, blockStyle]}>
                <Text style={[styles.text, textStyle]}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={[styles.timePicker, containerStyle]}>
      {RenderHours()}
      {RenderMinutes()}
      {RenderAmpms()}
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingHorizontal: 16,
    width: "100%",
    height: 300,
    paddingBottom: 40,
    backgroundColor: "rgba(14, 14, 14, 0.9)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    bottom: 0,
  },
  headerContainer: {
    width: "100%",
    borderBottomColor: "#3B3B3B",
    borderBottomWidth: 1,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    marginVertical: 12,
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "center",
  },
  timePicker: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderColor: "#3B3B3B",
    borderWidth: 1,
    backgroundColor: "#222222",
  },
  block: {
    justifyContent: "center",
    alignItems: "stretch",
    flex: 1,
  },
  blockContent: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "400",
    textAlign: "center",
  },
});
