import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { monthData } from "../../constants/constants";
import { daysInMonth } from "../../utils/helpers";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

const currentYear = new Date().getFullYear();
let scrollY = 0;

const yearData = Array.from({ length: currentYear - 1949 }, (_, i) => ({
  label: `${1950 + i}`,
  value: `${1950 + i}`,
})).reverse();

const DatePicker = ({
  year = currentYear.toString(),
  month = "01",
  date = "1",
  setDate = () => {},
}) => {
  const dispatch = useDispatch();

  const yearsRef = useRef(null);
  const monthsRef = useRef(null);
  const datesRef = useRef(null);

  const generateDateData = (year, month) => {
    const maxDays = daysInMonth(year, month);
    return Array.from({ length: maxDays }, (_, i) => ({
      label: `${i + 1}`,
      value: `${i + 1}`,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      const yearIndex = yearData.findIndex((y) => y.value === year);
      yearsRef.current?.scrollToIndex({ index: yearIndex, animate: false });
    }, 50);
    setTimeout(() => {
      const monthIndex = monthData.findIndex((m) => m.value === month);
      monthsRef.current?.scrollToIndex({ index: monthIndex });
    }, 100);
    setTimeout(() => {
      const dateIndex = dateData.findIndex((d) => d.value === date);
      datesRef.current?.scrollToIndex({ index: dateIndex });
    }, 150);
  }, []);

  const [dateData, setDateData] = useState(generateDateData(year, month));

  useEffect(() => {
    setDateData(generateDateData(year, month));
  }, [year, month]);

  const handleYearChange = () => {
    const index = Math.floor(scrollY / 120);
    console.log("trigger - year???", scrollY, index);
    dispatch(setDate({ key: "year", value: yearData[index]?.value }));
  };

  const handleMonthChange = () => {
    const index = Math.floor(scrollY / 120);
    console.log("trigger - month???", scrollY, index);
    dispatch(setDate({ key: "month", value: monthData[index]?.value }));
  };

  const handleDateChange = () => {
    const index = Math.floor(scrollY / 120);
    console.log("trigger - date???", scrollY, index);
    dispatch(setDate({ key: "date", value: dateData[index]?.value }));
  };

  const getItemLayout = (data, index) => {
    return {
      length: styles.blockContent.height,
      offset: styles.blockContent.height * index,
      index,
    };
  };

  const RenderYears = () => {
    return (
      <View style={styles.block}>
        <FlatList
          ref={yearsRef}
          data={yearData}
          keyExtractor={(item) => item.label.toString()}
          initialNumToRender={10}
          getItemLayout={getItemLayout}
          showsVerticalScrollIndicator={false}
          snapToAlignment="start"
          snapToInterval={120}
          onMomentumScrollEnd={handleYearChange}
          onScroll={({ nativeEvent }) => {
            scrollY = nativeEvent.contentOffset.y;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.blockContent}>
                <Text style={styles.text}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  const RenderMonths = () => {
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
          ref={monthsRef}
          data={monthData}
          keyExtractor={(item) => item.label.toString()}
          initialNumToRender={12}
          getItemLayout={getItemLayout}
          snapToAlignment="start"
          snapToInterval={120}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={handleMonthChange}
          onScroll={({ nativeEvent }) => {
            scrollY = nativeEvent.contentOffset.y;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.blockContent}>
                <Text style={styles.text}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  const RenderDates = () => {
    return (
      <View style={styles.block}>
        <FlatList
          ref={datesRef}
          data={dateData}
          keyExtractor={(item) => item.label.toString()}
          initialNumToRender={10}
          getItemLayout={getItemLayout}
          snapToAlignment="start"
          snapToInterval={120}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={handleDateChange}
          onScroll={({ nativeEvent }) => {
            scrollY = nativeEvent.contentOffset.y;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.blockContent}>
                <Text style={styles.text}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.datePicker}>
      {RenderYears()}
      {RenderMonths()}
      {RenderDates()}
    </View>
  );
};

export default DatePicker;

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
  datePicker: {
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
