import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import CalendarHeader from "../../components/Header/CalendarHeader";
import CustomButton from "../../components/Button/Button";

import AsyncStorage from "@react-native-async-storage/async-storage";
import EmptyFeed from "./EmptyFeed";
import Events from "../../components/Event/Events";
import {
  getEvents,
  resetHome,
  setHomeFilter,
} from "../../redux/slices/homeSlice";
import { formatDate } from "../../utils/helpers";

const HomeFeed = ({ navigation }) => {
  const dispatch = useDispatch();

  const { verified, events, eventsLoading, eventsError, infiniteLoading } =
    useSelector((state) => state.home);

  const handleTabPress = () => {
    dispatch(
      setHomeFilter({ key: "verified", value: verified === "" ? false : "" })
    );
  };

  useEffect(() => {
    dispatch(getEvents());
  }, [verified]);

  const renderTabs = () => {
    return (
      <View style={styles.tabs}>
        {verified === "" ? (
          <CustomButton
            title="All Events"
            containerStyle={{ flex: 1 }}
            buttonStyle={styles.tabButton}
            textStyle={{ color: "#58DAC3" }}
          />
        ) : (
          <TouchableOpacity onPress={handleTabPress} style={styles.rowFlex}>
            <Text style={{ color: "#ADADAD" }}>All Events</Text>
          </TouchableOpacity>
        )}

        {verified === false ? (
          <CustomButton
            title="Unverified Events"
            containerStyle={{ flex: 1 }}
            buttonStyle={styles.tabButton}
            textStyle={{ color: "#58DAC3" }}
          />
        ) : (
          <TouchableOpacity onPress={handleTabPress} style={styles.rowFlex}>
            <Text style={{ color: "#ADADAD" }}>Unverified Events</Text>
            <Text style={styles.notification}>99</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const renderFlatlist = () => {
    if (eventsLoading) {
      return (
        <View
          style={{
            flex: 0.9,
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

    if (eventsError)
      return <Text style={{ color: "#FFFFFF" }}>{eventsError}</Text>;

    return events.length ? (
      <FlatList
        data={events}
        keyExtractor={(item) => item[0].id.toString()}
        renderItem={({ item }) => {
          const endDate = item[0].end_timestamp.split("T")[0];
          return <Events cards={item} date={formatDate(endDate)} />;
        }}
        onEndReachedThreshold={1}
        onEndReached={({ distanceFromEnd }) => {
          console.log("on end reached ", distanceFromEnd);
        }}
      />
    ) : (
      <Text style={{ color: "#FFFFFF" }}>Sorry, no Events to show</Text>
    );
  };

  return (
    <View style={styles.container}>
      <CalendarHeader />
      <EmptyFeed navigation={navigation} />

      {/* {renderTabs()} */}
      {/* {renderFlatlist()} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  rowFlex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingVertical: 8,
    gap: 6,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  tabButton: {
    backgroundColor: "#222222",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#3B3B3B",
    borderRadius: 100,
  },
  notification: {
    backgroundColor: "#E6010F",
    color: "#F2F2F2",
    borderRadius: 20,
    height: 16,
    paddingTop: 2,
    aspectRatio: 1,
    fontSize: 9,
    lineHeight: 12,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: -2,
  },
});

export default HomeFeed;
