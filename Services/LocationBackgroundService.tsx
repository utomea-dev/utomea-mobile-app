import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";
import React, { useState, useEffect } from "react";
import { View, AppState } from "react-native";

import BackgroundGeolocation, {
  Location,
  State,
  Subscription,
} from "react-native-background-geolocation";

import createEvent from "../src/events/eventCreator";
import store from "../src/redux/store";
import { uploadEventPhotos } from "../src/redux/slices/eventsSlice";
import { showNotification } from "../src/utils/helpers";

import EventTimer from "../src/components/EventTimer";
import TestCrash from "../src/components/TestCrash";
// Geocoder.init(MAPS_API_KEY);

const BackgroundLocationService = () => {
  const [appState, setAppState] = React.useState("");
  const [enabled, setEnabled] = React.useState(false);
  const [location, setLocation] = React.useState<Location>();

  // const stopTask = async () => {
  //   await AsyncStorage.setItem('appStatus', 'stopped');
  //   await AsyncStorage.removeItem('eventsForSync');
  //   await AsyncStorage.removeItem('uploadingSlot');
  //   await AsyncStorage.removeItem('currentAddress');
  //   await BackgroundGeolocation.stop();
  // };

  // const addGeofence = () => {
  //   const {longitude, latitude} = location.coords;
  //   BackgroundGeolocation.addGeofence({
  //     identifier: 'Home',
  //     radius: 200,
  //     latitude,
  //     longitude,
  //     notifyOnEntry: true,
  //     notifyOnExit: true,
  //   })
  //     .then(success => {
  //       console.log('[addGeofence] success: ', success);
  //     })
  //     .catch(error => {
  //       console.log('[addGeofence] FAILURE: ', error);
  //     });
  // };

  // const startImageUploading = async () => {
  //   const eventsForSync = await AsyncStorage.getItem("eventsForSync");
  //   const uploadingSlot = await AsyncStorage.getItem("uploadingSlot");
  //   console.log(
  //     "EVENTS IN STORAGE & SLOT+==========",
  //     eventsForSync,
  //     uploadingSlot
  //   );
  //   if (
  //     eventsForSync !== null &&
  //     AppState.currentState === "active" &&
  //     uploadingSlot !== "occupied"
  //   ) {
  //     showNotification({ message: "uploading images to server" });
  //     console.log("DISPATCHING UPLOADING==========", eventsForSync);
  //     store.dispatch(uploadEventPhotos(JSON.parse(eventsForSync)));
  //     await AsyncStorage.setItem("uploadingSlot", "occupied");
  //   }
  // };

  const initBackgroundGeolocation = async () => {
    // Get an authorization token from transistorsoft demo server.
    const token =
      await BackgroundGeolocation.findOrCreateTransistorAuthorizationToken(
        "org",
        "events-app-user",
        "https://tracker.transistorsoft.com"
      );

    BackgroundGeolocation.sync();

    // Ready the SDK and fetch the current state.
    const state: State = await BackgroundGeolocation.ready({
      // Debug
      reset: false,
      debug: false,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      transistorAuthorizationToken: token,
      // Geolocation
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 200,
      disableElasticity: true,
      stopTimeout: 1,
      // Permissions
      locationAuthorizationRequest: "Always",
      backgroundPermissionRationale: {
        title:
          "Allow {applicationName} to access this device's location even when closed or not in use.",
        message:
          "This app collects location data to enable recording your trips to work and calculate distance-travelled.",
        positiveAction: 'Change to "{backgroundPermissionOptionLabel}"',
        negativeAction: "Cancel",
      },
      // HTTP & Persistence
      autoSync: true,
      maxDaysToPersist: 14,
      // Application
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
    });
    console.log("state----", state);
    showNotification({ message: `ready: ${state.trackingMode}` });
    setEnabled(state.enabled);
  };

  const _handleAppStateChange = (appStatus) => {
    setAppState(appStatus);
    console.log("app state changed =====------", appStatus);
  };

  const [eventsForSync, setEventsForSync] = useState(null);
  const [uploadingSlot, setUploadingSlot] = useState(null);
  const getStorageValues = async () => {
    const events = await AsyncStorage.getItem("eventsForSync");
    const slot = await AsyncStorage.getItem("uploadingSlot");
    setEventsForSync(events);
    setUploadingSlot(slot);
  };
  getStorageValues();

  // image uplaod effect
  // useEffect(() => {
  //   console.log(
  //     "INSIDE USEFFECT RUNNING---------",
  //     eventsForSync,
  //     appState,
  //     uploadingSlot
  //   );
  //   if (appState === "active") {
  //     // startImageUploading();
  //   }
  // }, [eventsForSync, uploadingSlot, appState]);

  React.useEffect(() => {
    initBackgroundGeolocation();

    // Register BackgroundGeolocation event-listeners.
    const getAppStatus = async () => {
      const runningStatus: null | string = await AsyncStorage.getItem(
        "appStatus"
      );
      console.log("running-----", runningStatus);
      return runningStatus;
    };

    BackgroundGeolocation.getState()
      .then(async (data) => {
        if (data.trackingMode === 1) {
          const runningStatus = await getAppStatus();
          if (runningStatus !== "running") {
            BackgroundGeolocation.start();
            await AsyncStorage.setItem("appStatus", "running");
          }
        }
      })
      .catch((e) => {
        showNotification({
          message: `app couldnt start: ${JSON.stringify(e)}`,
        });
        console.log("cannot start app --- ", e);
      });

    const onLocation: Subscription = BackgroundGeolocation.onLocation(
      (l) => {
        console.log("[onLocation]", l);
        setLocation(l);
        showNotification({
          message: "Location change",
        });
      },
      (error) => {
        showNotification({
          message: `Location error: ${error}`,
        });
        console.log("[onLocation] ERROR: ", error);
      }
    );

    const onMotionChange: Subscription = BackgroundGeolocation.onMotionChange(
      (event) => {
        console.log("[onMotionChange]", event);
        showNotification({
          message: "Motion change",
        });
      }
    );

    const onActivityChange: Subscription =
      BackgroundGeolocation.onActivityChange((event) => {
        console.log("[onActivityChange]", event);
        showNotification({
          message: "Activity change",
        });
      });

    const onProviderChange: Subscription =
      BackgroundGeolocation.onProviderChange((event) => {
        console.log("[onProviderChange]", event);
        showNotification({
          message: "Provider change",
        });
      });

    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      // When view is destroyed (or refreshed with dev live-reload),
      // Remove BackgroundGeolocation event-listeners.
      onLocation.remove();
      onMotionChange.remove();
      onActivityChange.remove();
      onProviderChange.remove();
    };
  }, []);

  useEffect(() => {
    showNotification({ message: "Location changed in effect" });
    if (location && location.coords) {
      console.log("location update--=-=-=-", location);
      const { longitude, latitude } = location.coords;
      const address = `${latitude}/${longitude}`;
      createEvent(address, latitude, longitude);
    }
  }, [location]);

  const init = async () => {
    let oldTime = await AsyncStorage.getItem("eventStartTime");
    let oldAddress = await AsyncStorage.getItem("currentAddress");

    // Storing the start time and address when app runs first time
    if (!oldTime) {
      const startTimeStamp = new Date().getTime();
      await AsyncStorage.setItem(
        "eventStartTime",
        JSON.stringify(startTimeStamp)
      );
    }

    if (!oldAddress) {
      Geolocation.getCurrentPosition(
        async (position) => {
          console.log("FIrst time location -------------", position);
          const { latitude, longitude } = position.coords;
          const coords = `${latitude}/${longitude}`;
          await AsyncStorage.setItem("currentAddress", coords);
        },
        (error) => {
          console.log("Error getting location: ", error.message);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View>
      {/* <EventTimer /> */}
      {/* <Button title="Start Tracking" disabled={isRunning} onPress={startTask} /> */}
      {/* <Button title="Stop Tracking" onPress={stopTask} /> */}
      {/* <Button title="Add Geofence" onPress={addGeofence} /> */}
      {/* <Button title="Photo Lib" onPress={getPhotoLibAccess} /> */}
      {/* <Button title="Clear Storage" onPress={clearStorage} />
       */}
    </View>
  );
};

export default BackgroundLocationService;
