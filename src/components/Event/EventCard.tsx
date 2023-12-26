import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import EventImage from "./EventImage";

import Location from "../../assets/icons/location.svg";
import Duration from "../../assets/icons/clock_grey.svg";
import Tag from "../../assets/icons/tag.svg";
import {
  calculateDuration,
  convertISOStringToTime2,
  convertToAMPM,
  formatDate,
} from "../../utils/helpers";
import { useNavigation } from "@react-navigation/native";
import Divider from "../Divider/Divider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EventCard = ({ data, filtered = false }) => {
  const navigation = useNavigation();
  const { id } = data;

  const [localCache, setLocalCache] = useState({});

  const gotoEventDetail = () => {
    if (filtered) {
      navigation.navigate("Home", {
        screen: "EventDetail",
        params: { id, previousScreen: "search" },
      });
      return;
    }
    navigation.navigate("EventDetail", { id });
  };

  useEffect(() => {
    const getCache = async () => {
      const cache = await AsyncStorage.getItem("cached_images");
      if (cache === null) {
        setLocalCache({});
      } else {
        const parsedCache = JSON.parse(cache);
        setLocalCache(parsedCache);
      }
    };

    getCache();
  }, []);

  return (
    <TouchableOpacity style={[styles.container]} onPress={gotoEventDetail}>
      {/* Event image */}
      <View style={styles.imageContainer}>
        <EventImage
          isVerified={data.verified}
          isSynced={!localCache[id]?.length > 0}
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
        <View style={styles.section}>
          <Text style={styles.eventDate}>
            {formatDate(data.begin_timestamp.split("T")[0], true)}
          </Text>
          <Divider dividerStyle={styles.divider} />
          <Text style={styles.eventDate}>
            {convertISOStringToTime2(data.begin_timestamp)}
          </Text>
        </View>

        <View style={styles.flex}>
          <Duration />
          <Text style={styles.eventAddress}>
            Duration -{" "}
            {calculateDuration(data.begin_timestamp, data.end_timestamp)}
          </Text>
        </View>

        {/* Event address */}
        <View style={[styles.flex]}>
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
    gap: 6,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 4,
  },
  eventTitle: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  section: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 6,
  },
  eventDate: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "400",
    color: "#F2F2F2",
  },
  eventAddress: {
    flex: 1,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "400",
    color: "#ADADAD",
  },
  divider: {
    width: 0,
    borderColor: "#616161",
    borderBottomColor: "#616161",
    borderWidth: 1,
    borderRadius: 10,
  },
});
