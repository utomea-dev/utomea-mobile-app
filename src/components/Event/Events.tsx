import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import EventCard from "./EventCard";
import { MONTHS } from "../../constants/constants";
import { useSelector } from "react-redux";

const Events = ({
  date = "",
  cards,
  displayNotFound = false,
  isLast = false,
  isFirst = false,
  loading = "false",
}) => {
  const { date: calendarDate } = useSelector((state) => state.home);

  const renderNotFoundSection = () => {
    return (
      <View>
        <Text style={{ color: "#FFFFFF" }}>{`${
          MONTHS[calendarDate?.split("-")[1]]?.long
        } ${calendarDate?.split("-")[2]}, ${
          calendarDate?.split("-")[0]
        }`}</Text>
        <Text
          style={{
            color: "#FC7A1B",
            marginVertical: 6,
            marginBottom: 20,
          }}
        >
          No events found for the selected date
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { marginBottom: isLast ? 260 : 16 }]}>
      {displayNotFound && isFirst && renderNotFoundSection()}
      {date && <Text style={styles.date}>{date}</Text>}
      {cards.map((card, i) => (
        <EventCard key={i + 1} data={card} />
      ))}
      {isLast && loading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginVertical: 40,
          }}
        >
          <ActivityIndicator color="58DAC3" size="large" />
        </View>
      )}
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 16,
  },
  date: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: "#FFFFFF",
    marginBottom: -8,
  },
});
