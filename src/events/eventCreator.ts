import { PermissionsAndroid, Platform } from "react-native";
import Geocoder from "react-native-geocoding";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../../src/redux/store";
import { createEvent } from "../redux/slices/homeSlice";
import { MAPS_API_KEY } from "@env";
import { formatTime } from "../utils/helpers";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { showNotification } from "../utils/helpers";

Geocoder.init("AIzaSyB8iCzJlmSC8Ku6pStVH1l-qVjZi65H96k");

const eventCreator = async (coords: string, latitude, longitude) => {
  console.log("EVENT CREATION STARTS ??????????????????????????");
  const startTimeStamp = new Date().getTime();

  let oldTime = await AsyncStorage.getItem("eventStartTime");
  let oldAddress = await AsyncStorage.getItem("currentAddress");

  // Storing the start time and address when app runs first time
  if (!oldTime) {
    await AsyncStorage.setItem(
      "eventStartTime",
      JSON.stringify(startTimeStamp)
    );
  }

  if (!oldAddress) {
    await AsyncStorage.setItem("currentAddress", coords);
  }
  console.log(
    "********************",
    oldAddress?.split("/")[0],
    oldAddress?.split("/")[1]
  );
  // Geocoder.from(oldAddress?.split('/')[0], oldAddress?.split('/')[1])
  //   .then(response => {
  //     const address = response.results[0].formatted_address;
  //     console.log('ADDRESS_GOOOOOOOOOOOOOOGLEEEEEEEEEEEEEEE-----', address);
  //   })
  //   .catch(error => {
  //     console.log('Geocoding error:', error);
  //   });

  const checkAddressAndRetrieveImages = async () => {
    async function hasAndroidPermission() {
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }
      const status = await PermissionsAndroid.request(permission);
      return status === "granted";
    }

    let currentAddress = coords;
    oldTime = await AsyncStorage.getItem("eventStartTime");
    oldAddress = await AsyncStorage.getItem("currentAddress");
    if (oldAddress !== currentAddress) {
      showNotification({
        message: `old: ${oldAddress} - new: ${currentAddress}`,
      });

      // const timeToCreateEvent = 30;
      (await AsyncStorage.getItem("timeToCreateEvent")) || 30;
      await AsyncStorage.setItem("currentAddress", coords);
      await AsyncStorage.setItem(
        "eventStartTime",
        JSON.stringify(startTimeStamp)
      );
      console.log(
        "TIME DIFFernce-==========-=-=-=-=",
        startTimeStamp - Number(oldTime)
      );

      // run this logic if the time elapsed at the same location more than 30 minutes
      if (
        startTimeStamp - Number(oldTime) >
        1800000
        // Number(JSON.parse(timeToCreateEvent)) * 60000
      ) {
        showNotification({ message: "Creating Event" });
        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
          return;
        }

        // iOS permission check
        if (Platform.OS === "ios") {
          try {
            const status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
            console.log(status);
            if (status !== RESULTS.GRANTED) {
              try {
                const status = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
                if (status !== RESULTS.GRANTED) {
                  console.log("Permission Denied");
                  return;
                }
              } catch (err) {
                console.log(err);
              }
            }
          } catch (err) {
            console.log(err);
          }
        }

        CameraRoll.getPhotos({
          first: 50,
          assetType: "Photos",
          fromTime: Number(oldTime),
          toTime: startTimeStamp,
          include: ["filename"],
        })
          .then(async (r) => {
            console.log({ photos: r?.edges[0]?.node });
            const images = r.edges.map((item) => {
              return {
                uri: item?.node?.image?.uri,
                fileName: item?.node?.image?.filename,
              };
            });

            showNotification({
              message: `Images found in device: ${images?.length || 0}`,
            });

            let address = oldAddress;
            Geocoder.from(oldAddress?.split("/")[0], oldAddress?.split("/")[1])
              .then((response) => {
                address = response.results[0].formatted_address;
                console.log(
                  "creating new event 000000000000000000000000000000---",
                  address
                );
                const body = {
                  latitude,
                  longitude,
                  location: address,
                  begin_timestamp: formatTime(Number(oldTime)).split("T")[0],
                  end_timestamp: formatTime(startTimeStamp).split("T")[0],
                  title: address,
                };
                store.dispatch(
                  createEvent({
                    body,
                    photos: images,
                  })
                );
              })
              .catch((error) => {
                console.warn("Geocoding error:", error);
                showNotification({
                  message: "Event creation failed: Geocoder error",
                });
              });
          })
          .catch((err) => {
            showNotification({
              message: "Failed to fetch device images",
            });
            console.log(err);
          });
      }
    }
  };

  checkAddressAndRetrieveImages();

  return null;
};

export default eventCreator;
