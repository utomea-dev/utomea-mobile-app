import React from "react";
import { StyleSheet, Text, View } from "react-native";
import EventImage from "./EventImage";

import Location from "../../assets/icons/location.svg";
import Tag from "../../assets/icons/tag.svg";
import { formatDate } from "../../utils/helpers";

const EventCard = ({ data }) => {
  return (
    <View style={styles.container}>
      {/* Event image */}
      <View style={styles.imageContainer}>
        <EventImage isVerified={data.verified} />
      </View>

      {/* Event description */}
      <View style={styles.descriptionContainer}>
        {/* Event title */}
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.eventTitle}>
          {data.title}
        </Text>

        {/* Event date */}
        <Text style={styles.eventDate}>
          {formatDate(data.end_timestamp.split("T")[0], true)}
        </Text>

        {/* Event address */}
        <View style={[styles.flex, { marginBottom: 8 }]}>
          <Location />
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.eventAddress}
          >
            {data.location}
          </Text>
        </View>

        {/* Event tags */}
        <View style={styles.flex}>
          <Tag />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.eventAddress}
          >
            {data.tags.join(", ")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  imageContainer: {
    flex: 0.4,
  },
  descriptionContainer: {
    flex: 0.6,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 4,
  },
  eventTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  eventDate: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
    color: "#F2F2F2",
    marginTop: 4,
    marginBottom: 16,
  },
  eventAddress: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
    color: "#ADADAD",
  },
});
