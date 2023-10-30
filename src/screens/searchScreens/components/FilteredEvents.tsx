import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../../../components/Event/EventCard";

const FilteredEvents = () => {
  const {
    data: events,
    searchEventsLoading,
    searchEventsError,
  } = useSelector((state) => state.search);

  const renderFlatlist = () => {
    if (searchEventsLoading) {
      return (
        <View
          style={{
            marginVertical: 150,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>
            <ActivityIndicator color="#58DAC3" size="large" />;
          </Text>
        </View>
      );
    }

    if (searchEventsError) {
      return <Text style={{ color: "#FFFFFF" }}>{searchEventsError}</Text>;
    }

    return (
      events &&
      events.length && (
        <View style={styles.eventsContainer}>
          {events.map((item, i) => (
            <View key={i + 1} style={{ marginBottom: 16 }}>
              <EventCard filtered data={item} />
            </View>
          ))}
          <View
            style={{
              marginBottom: 70,
            }}
          ></View>
        </View>
      )
    );
  };
  return <View>{renderFlatlist()}</View>;
};

export default FilteredEvents;

const styles = StyleSheet.create({
  eventsContainer: {},
});
