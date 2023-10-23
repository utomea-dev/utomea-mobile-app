import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import EventCard from "./EventCard";

const Events = ({ date = "", cards, isLast = false, loading = "false" }) => {
  return (
    <View style={[styles.container, { marginBottom: isLast ? 180 : 16 }]}>
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
