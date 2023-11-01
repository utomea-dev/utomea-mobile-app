import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import EventImage from "./EventImage";

import Location from "../../assets/icons/location.svg";
import Tag from "../../assets/icons/tag.svg";
import { formatDate } from "../../utils/helpers";
import { useNavigation } from "@react-navigation/native";

const EventCard = ({ data, filtered = false }) => {
  const navigation = useNavigation();

  const gotoEventDetail = () => {
    const { id } = data;
    if (filtered) {
      navigation.navigate("Home", {
        screen: "EventDetail",
        params: { id, previousScreen: "search" },
      });
      return;
    }
    navigation.navigate("EventDetail", { id });
  };

  return (
    <TouchableOpacity style={[styles.container]} onPress={gotoEventDetail}>
      {/* Event image */}
      <View style={styles.imageContainer}>
        <EventImage
          isVerified={data.verified}
          imageUrl={
            data.hero_image || (data.photos.length > 0 && data.photos[0].url)
          }
        />
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
        {data.tags?.length > 0 && (
          <View style={styles.flex}>
            <Tag />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.eventAddress}
            >
              {data.tags?.slice(0, 3).join(", ")}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
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
