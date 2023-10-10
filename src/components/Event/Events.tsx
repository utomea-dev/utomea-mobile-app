import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import EventCard from "./EventCard";

const Events = ({ date = "", cards }) => {
  return (
    <View style={styles.container}>
      {date && <Text style={styles.date}>{date}</Text>}
      {cards.map((card, i) => (
        <EventCard key={i + 1} data={card} />
      ))}
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 16,
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
