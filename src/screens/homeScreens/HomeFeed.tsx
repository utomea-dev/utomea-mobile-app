import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
} from "react-native";

import CalendarHeader from "../../components/Header/CalendarHeader";
import CustomButton from "../../components/Button/Button";

import EmptyFeed from "./EmptyFeed";
import Events from "../../components/Event/Events";
import {
  getEvents,
  getMoreEvents,
  resetDate,
  resetHome,
  setHomeFilter,
} from "../../redux/slices/homeSlice";
import { formatDate } from "../../utils/helpers";
import { useFocusEffect } from "@react-navigation/native";
import BackgroundLocationService from "../../../Services/LocationBackgroundService";
import {
  resetEventDetails,
  resetEventDetailsLoaders,
} from "../../redux/slices/eventDetailSlice";
import { MONTHS } from "../../constants/constants";

const HomeFeed = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    verified,
    events,
    eventsLoading,
    eventsLoadingInner,
    eventsError,
    infiniteLoading,
    unverifiedCount,
    skip,
    date,
    limit,
    totalCount,
    isNewUser,
  } = useSelector((state) => state.home);

  const handleTabPress = () => {
    dispatch(
      setHomeFilter({ key: "verified", value: verified === "" ? false : "" })
    );
  };

  const fetchMore = () => {
    if (
      events &&
      events?.flat().length <
        (verified === false ? unverifiedCount : totalCount) &&
      events?.flat().length >= limit &&
      !eventsLoading &&
      !eventsLoadingInner &&
      !infiniteLoading
    ) {
      dispatch(getMoreEvents({ skip: events?.flat().length }));
      return;
    }
    return;
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  useEffect(() => {
    dispatch(getEvents({ refetch: true }));
    dispatch(resetEventDetailsLoaders());
  }, [verified, date]);

  useEffect(() => {
    dispatch(getEvents());
    dispatch(resetEventDetailsLoaders());
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(resetDate());
      dispatch(resetEventDetails());
      dispatch(resetEventDetailsLoaders());
      dispatch(getEvents({ refetch: true }));
    }, [dispatch])
  );

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
            {!!unverifiedCount && (
              <View style={styles.notificationContainer}>
                <Text style={styles.notification}>{unverifiedCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderFlatlist = () => {
    if (eventsLoadingInner || events === null) {
      return (
        <View
          style={{
            height: "80%",
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

    return events && events.length ? (
      <FlatList
        data={events}
        keyExtractor={(item) =>
          `${item[0].id.toString()}-${Math.ceil(Math.random() * 1000000)}`
        }
        renderItem={({ item, index }) => {
          const endDate = item[0].end_timestamp.split("T")[0];
          return (
            <Events
              cards={item}
              date={formatDate(endDate)}
              loading={infiniteLoading}
              isLast={events?.length === index + 1}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.4}
        onEndReached={({ distanceFromEnd }) => {
          fetchMore();
        }}
      />
    ) : (
      <Text style={{ color: "#FFFFFF" }}>Sorry, no Events to show</Text>
    );
  };

  if (eventsError)
    return <Text style={{ color: "#FFFFFF" }}>{eventsError}</Text>;

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

  return (
    <View style={styles.container}>
      <CalendarHeader isDisabled={totalCount === 0} />
      {isNewUser ? (
        <EmptyFeed navigation={navigation} />
      ) : (
        <View>
          {renderTabs()}
          {events &&
            events.length > 0 &&
            date &&
            date !== events[0][0]?.end_timestamp.split("T")[0] && (
              <View>
                <Text style={{ color: "#FFFFFF" }}>{`${
                  MONTHS[date?.split("-")[1]]?.long
                } ${date?.split("-")[2]}, ${date?.split("-")[0]}`}</Text>
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
            )}
          {renderFlatlist()}
        </View>
      )}
      <BackgroundLocationService />
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
  notificationContainer: {
    height: 18,
    aspectRatio: 1,
    borderRadius: 60,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FC7A1B",
  },
  notification: {
    backgroundColor: "transparent",
    color: "#F2F2F2",
    height: 18,
    aspectRatio: 1,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 5,
  },
});

export default HomeFeed;
