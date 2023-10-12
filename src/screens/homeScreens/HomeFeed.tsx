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
  resetDate,
  resetHome,
  setHomeFilter,
} from "../../redux/slices/homeSlice";
import { formatDate } from "../../utils/helpers";
import { useFocusEffect } from "@react-navigation/native";
import BackgroundLocationService from "../../../Services/LocationBackgroundService";

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
    totalCount,
  } = useSelector((state) => state.home);

  const handleTabPress = () => {
    dispatch(
      setHomeFilter({ key: "verified", value: verified === "" ? false : "" })
    );
  };

  const fetchMore = () => {
    // dispatch(setHomeFilter({ key: "skip", value: 2 }));
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
  }, [verified, date]);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(resetDate());
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
              <Text style={styles.notification}>{unverifiedCount}</Text>
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

    if (eventsError)
      return <Text style={{ color: "#FFFFFF" }}>{eventsError}</Text>;

    return events && events.length ? (
      <FlatList
        data={events}
        keyExtractor={(item) => item[0].id.toString()}
        renderItem={({ item, index }) => {
          const endDate = item[0].end_timestamp.split("T")[0];
          return (
            <Events
              cards={item}
              date={formatDate(endDate)}
              isLast={events?.length === index + 1}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={1}
        onEndReached={({ distanceFromEnd }) => {
          fetchMore();
          console.log("on end reached ", distanceFromEnd);
        }}
      />
    ) : (
      <Text style={{ color: "#FFFFFF" }}>Sorry, no Events to show</Text>
    );
  };

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
      <CalendarHeader />
      {totalCount === 0 ? (
        <EmptyFeed navigation={navigation} />
      ) : (
        <View>
          {renderTabs()}
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
  notification: {
    backgroundColor: "#FC7A1B",
    color: "#F2F2F2",
    borderRadius: 20,
    height: 18,
    paddingTop: 3,
    paddingLeft: 2,
    aspectRatio: 1,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: -2,
  },
});

export default HomeFeed;
