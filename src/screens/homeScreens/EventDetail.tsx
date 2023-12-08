import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  Alert,
  Image,
} from "react-native";
import CustomButton from "../../components/Button/Button";

import KebabMenu from "../../assets/icons/kebab_menu.svg";
import CheckDark from "../../assets/icons/check_dark.svg";
import Star from "../../assets/icons/star.svg";
import LocationIcon from "../../assets/icons/location.svg";
import DurationIcon from "../../assets/icons/clock_grey.svg";
import TagIcon from "../../assets/icons/tag.svg";
import Edit from "../../assets/icons/edit_gray.svg";
import Delete from "../../assets/icons/delete.svg";
import Exclude from "../../assets/icons/exclude.svg";
import InfoIcon from "../../assets/icons/info.svg";

import GeneralHeader from "../../components/Header/GeneralHeader";
import {
  calculateDuration,
  convertISOStringToTime2,
  convertToAMPM,
  formatDate,
} from "../../utils/helpers";
import Divider from "../../components/Divider/Divider";
import EventImage from "../../components/Event/EventImage";
import {
  deleteEvent,
  editEvent,
  getEventDetails,
  resetEventDetailsLoaders,
} from "../../redux/slices/eventDetailSlice";
import BackDropMenu from "../../components/BackDropMenu/BackDropMenu";
import VerifyWindow from "./components/VerifyWindow";
import { resetHomeLoaders } from "../../redux/slices/homeSlice";
import {
  excludeLocation,
  resetExcludeLoaders,
} from "../../redux/slices/excludeLocationSlice";
import { checkExcludedLocation } from "../../events/checkExcludedLocations";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EventDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const eventId = route.params.id;

  const {
    eventDetail: data,
    eventDetailLoading,
    eventDetailError,
    editEventLoading,
    verifyEventSuccess,
    deleteEventLoading,
    deleteEventSuccess,
    deleteEventError,
  } = useSelector((state) => state.eventDetail);

  const {
    excludeLocationLoading,
    excludeLocationError,
    excludeLocationSuccess,
  } = useSelector((state) => state.exclude);

  const [isVerified, setIsVerified] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [picmodalVisible, setpicmodalVisible] = useState(false);
  const [excludeModalVisible, setExcludeModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [SelectedThumbnailImage, setSelectedThumbnailImage] = useState(false);
  const [changingThumbnail, setChangingThumbnail] = useState(false);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible((visible) => !visible);
  };

  const menuEditPress = () => {
    navigation.navigate("EditEvent", { mode: "edit" });
    closeMenu();
  };

  const menuDeletePress = (e) => {
    e.stopPropagation();
    setModalVisible(() => true);
    closeMenu();
  };

  const menuExcludePress = (e) => {
    e.stopPropagation();
    setExcludeModalVisible(() => true);
    closeMenu();
  };

  const handleConfirmDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteEvent({ id: data.id }));
  };

  const handleConfirmExclude = (e) => {
    e.stopPropagation();
    if (!data) {
      return;
    }

    const body = {
      identifier: data.location,
      latitude: data.latitude,
      longitude: data.longitude,
      radius: 200,
    };

    console.log("SEDNING THIS-----", body);
    dispatch(excludeLocation(body));
  };

  const handleVerify = () => {
    // dispatch
    dispatch(
      editEvent({
        id: data?.id,
        body: { verified: true },
        navigation,
        photos: [],
        goBack: false,
      })
    );
  };

  const menuItems = [
    { name: "Edit", onPress: menuEditPress, icon: () => <Edit /> },
    { name: "Delete", onPress: menuDeletePress, icon: () => <Delete /> },
    {
      name: "Exclude Location",
      onPress: menuExcludePress,
      icon: () => <Exclude />,
    },
  ];
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = (screenWidth - 56) / 4;

  const renderModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text
              style={{
                fontSize: 24,
                lineHeight: 28,
                fontWeight: "700",
                color: "#FFFFFF",
                marginVertical: 8,
              }}
            >
              Are you sure?
            </Text>
            <Text
              style={{
                color: "#ADADAD",
                textAlign: "center",
                paddingHorizontal: 4,
              }}
            >
              Once deleted, you can’t retrieve this event.
            </Text>
            <View
              style={{
                marginTop: 40,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 12,
              }}
            >
              <CustomButton
                disabled={deleteEventLoading}
                title="Cancel"
                buttonStyle={{ backgroundColor: "#222222" }}
                textStyle={{ color: "#FFFFFF" }}
                onPress={() => setModalVisible(false)}
              />
              <CustomButton
                disabled={deleteEventLoading}
                isLoading={deleteEventLoading}
                title="Yes, Delete"
                onPress={handleConfirmDelete}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderExcludeModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={excludeModalVisible}
        onRequestClose={() => setExcludeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            {/* text contents */}
            {!excludeLocationSuccess && !excludeLocationError && (
              <View style={styles.modalText}>
                <Text
                  style={{
                    fontSize: 24,
                    lineHeight: 28,
                    fontWeight: "700",
                    color: "#FFFFFF",
                    marginVertical: 8,
                  }}
                >
                  Are you sure?
                </Text>
                <Text
                  style={{
                    color: "#ADADAD",
                    textAlign: "center",
                    paddingHorizontal: 4,
                  }}
                >
                  If you choose to ‘Exclude Location’ for this event, future
                  events will not be created at this location.
                </Text>
              </View>
            )}
            {excludeLocationSuccess && (
              <View style={styles.modalText}>
                <View style={styles.check}>
                  <CheckDark />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    lineHeight: 28,
                    fontWeight: "700",
                    color: "#FFFFFF",
                    marginVertical: 8,
                  }}
                >
                  Success!
                </Text>
                <Text
                  style={{
                    color: "#ADADAD",
                    textAlign: "center",
                    paddingHorizontal: 4,
                  }}
                >
                  Location excluded successfully. No automatic events will be
                  created on this location in future.
                </Text>
              </View>
            )}

            {excludeLocationError && (
              <View style={styles.modalText}>
                <Text
                  style={{
                    fontSize: 24,
                    lineHeight: 28,
                    fontWeight: "700",
                    color: "#FFFFFF",
                    marginVertical: 8,
                  }}
                >
                  Denied!
                </Text>
                <Text
                  style={{
                    color: "#ADADAD",
                    textAlign: "center",
                    paddingHorizontal: 4,
                  }}
                >
                  This location is already in exclusion list.
                </Text>
              </View>
            )}

            {/* CTAs */}
            {!excludeLocationSuccess && !excludeLocationError ? (
              <View
                style={{
                  marginTop: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 12,
                }}
              >
                <CustomButton
                  disabled={excludeLocationLoading}
                  title="Cancel"
                  buttonStyle={{ backgroundColor: "#222222" }}
                  textStyle={{ color: "#FFFFFF" }}
                  onPress={() => setExcludeModalVisible(false)}
                />
                <CustomButton
                  disabled={excludeLocationLoading}
                  isLoading={excludeLocationLoading}
                  title="Yes, Exclude Location"
                  onPress={handleConfirmExclude}
                />
              </View>
            ) : (
              <View
                style={{
                  marginTop: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 12,
                }}
              >
                <CustomButton
                  disabled={excludeLocationLoading}
                  title="OK"
                  buttonStyle={{
                    backgroundColor: "#222222",
                    paddingHorizontal: 24,
                  }}
                  textStyle={{ color: "#FFFFFF" }}
                  onPress={() => {
                    dispatch(resetExcludeLoaders());
                    setExcludeModalVisible(false);
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  const renderMenu = () => {
    return (
      <View style={styles.menu}>
        {menuVisible && (
          <View style={{ zIndex: 999 }}>
            <BackDropMenu
              menu={menuItems}
              navigation={navigation}
              onClose={closeMenu}
            />
          </View>
        )}
      </View>
    );
  };

  const renderPhotos = () => {
    return data.photos?.map((img, i) => (
      <TouchableOpacity
        key={img.url}
        onLongPress={() => handleLongPress(img)}
        style={[styles.photos, { width: imageWidth }]}
      >
        <EventImage
          imageUrl={img.url}
          size={350}
          size={350}
          imageStyles={{ borderRadius: 8 }}
        />
      </TouchableOpacity>
    ));
  };

  const handleLongPress = (img) => {
    setSelectedThumbnailImage(img);

    // Show the modal for changing the thumbnail
    setpicmodalVisible(true);
  };
  const handleSetThumbnail = async () => {
    try {
      setChangingThumbnail(true);
      // Get the user token from AsyncStorage
      const userDetails = await AsyncStorage.getItem("utomea_user");
      const userData = JSON.parse(userDetails);
      const { token } = userData;

      if (!SelectedThumbnailImage || !SelectedThumbnailImage.id) {
        // Handle error, no image selected
        return;
      }

      // Make a POST request to set the selected image as the event thumbnail
      const apiUrl =
        "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/events/set-hero-image";
      const requestData = {
        photoId: SelectedThumbnailImage.id,
      };

      console.log("idddddddddd-------", SelectedThumbnailImage.id);

      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check the response and handle success or error
      if (response.status === 200) {
        // Thumbnail image set successfully
        console.log("Thumbnail image set successfully");
        // Close the thumbnail modal
        setpicmodalVisible(false);
        Alert.alert("Thumbnail Updated Successfully");
        setChangingThumbnail(false);
      } else {
        // Handle error, e.g., show an error message
        console.error("Error setting thumbnail image:", response.data);
      }
    } catch (error) {
      // Handle any exceptions or errors from the API request
      console.error("Error setting thumbnail image:", error);
    }
  };

  const renderThumbanailModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={picmodalVisible}
        onRequestClose={() => setpicmodalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text
              style={{
                fontSize: 24,
                lineHeight: 28,
                fontWeight: "700",
                color: "#FFFFFF",
                marginVertical: 8,
              }}
            >
              Change Thumbnail
            </Text>
            <Text
              style={{
                color: "#ADADAD",
                textAlign: "center",
                paddingHorizontal: 4,
              }}
            >
              Do you want to set this image as the event thumbnail?
            </Text>
            <View
              style={{
                marginTop: 40,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 12,
              }}
            >
              <CustomButton
                disabled={changingThumbnail}
                title="Cancel"
                buttonStyle={{ backgroundColor: "#222222" }}
                textStyle={{ color: "#FFFFFF" }}
                onPress={() => setpicmodalVisible(false)}
              />
              <CustomButton
                disabled={changingThumbnail}
                isLoading={changingThumbnail}
                title="Set as Thumbnail"
                onPress={handleSetThumbnail}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  useEffect(() => {
    const backAction = () => {
      if (route.params?.previousScreen === "search") {
        navigation.navigate("Search");
      } else {
        navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (data) {
      setIsVerified(data.verified);
    }
  }, [data]);

  // console.log("event detail-----", data);
  useEffect(() => {
    dispatch(getEventDetails({ id: eventId }));
    dispatch(resetHomeLoaders());
  }, [eventId]);

  useEffect(() => {
    if (deleteEventSuccess) {
      setModalVisible(false);
      navigation.goBack();
    }
  }, [deleteEventSuccess]);

  if (eventDetailLoading || data === null) {
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

  if (eventDetailError && !eventDetailLoading) {
    return <Text style={{ color: "#FFFFFF" }}>{eventDetailError}</Text>;
  }

  return (
    <View style={styles.container}>
      {renderModal()}
      {renderExcludeModal()}
      {renderThumbanailModal()}

      {/* Header */}
      <View style={{ zIndex: 999 }}>
        <GeneralHeader
          title="Event Detail"
          CTA={() => (
            <TouchableOpacity
              style={{ paddingLeft: 10, paddingRight: 20, marginRight: -20 }}
              onPress={toggleMenu}
            >
              <KebabMenu />
            </TouchableOpacity>
          )}
        />
        {renderMenu()}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {!isVerified && (
          <VerifyWindow
            handleVerify={handleVerify}
            editEventLoading={editEventLoading}
            verifyEventSuccess={verifyEventSuccess}
            setIsVerified={setIsVerified}
          />
        )}
        {/* information */}
        <View style={styles.infoContainer}>
          {/* Title */}
          <View>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {data?.title}
            </Text>
          </View>

          {/* Rating, Date, Categoy */}
          <View style={styles.ratingContainer}>
            {data?.rating > 0 && (
              <View style={styles.rating}>
                <Star />
                <Text style={{ color: "#FFFFFF" }}>
                  {data?.rating > 0 && data.rating}
                </Text>
              </View>
            )}

            {data?.rating > 0 && <Divider dividerStyle={styles.divider} />}

            <Text style={styles.eventDate}>
              {formatDate(data?.begin_timestamp.split("T")[0], true)}
            </Text>
            <Divider dividerStyle={styles.divider} />
            <Text style={styles.eventDate}>
              {convertISOStringToTime2(data.begin_timestamp)}
            </Text>

            {data?.category !== null && (
              <Divider dividerStyle={styles.divider} />
            )}

            <Text style={styles.eventDate}>{data?.category?.name}</Text>
          </View>

          {/* location and tags */}
          <View style={styles.tagsContainer}>
            {/* Duration */}
            <View style={styles.flex}>
              <DurationIcon />
              <Text style={styles.textStyle}>
                Duration -{" "}
                {calculateDuration(data.begin_timestamp, data.end_timestamp)}
              </Text>
            </View>
            {/* Location */}
            <View style={[styles.flex]}>
              <LocationIcon />
              <Text style={[styles.textStyle, { flex: 1 }]}>
                {data?.location}
              </Text>
            </View>

            {/* Event tags */}
            {data?.tags?.length > 0 ? (
              <View style={styles.flex}>
                <TagIcon />
                <Text style={[styles.textStyle, { flex: 1 }]}>
                  {data?.tags?.join(", ")}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Description */}
          {data?.description ? (
            <View>
              <Text style={styles.textStyle}>{data?.description}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.textStyle}>No description available.</Text>
            </View>
          )}
        </View>

        {/* Event photos if any */}
        {data?.photos?.length > 0 ? (
          <>
            <View style={{ flexDirection: "row", gap: 6 }}>
              <InfoIcon />

              <Text style={[styles.textStyle, { marginBottom: 4 }]}>
                Tap and hold photo to set it as the event thumbnail
              </Text>
            </View>
            <View style={styles.photosContainer}>{renderPhotos()}</View>
          </>
        ) : (
          <Text style={styles.textStyle}>This Event has no photos to show</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "stretch",
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(14, 14, 14, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 15,
    width: 15,
    resizeMode: "contain",
  },
  modal: {
    flex: 1,
    marginHorizontal: 16,
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: "#0E0E0E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3B3B3B",
  },
  modalText: {
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    zIndex: 99,
    position: "absolute",
    top: 0,
    right: 0,
  },
  flex: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  infoContainer: {
    marginVertical: 24,
  },
  divider: {
    width: 0,
    borderColor: "#616161",
    borderBottomColor: "#616161",
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    marginBottom: 4,
    fontSize: 20,
    lineHeight: 28,
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "left",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
  },
  rating: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  section: {
    marginVertical: 4,
  },
  tagsContainer: {
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: "#ADADAD",
    fontWeight: "400",
  },
  eventDate: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: "#F2F2F2",
  },
  textStyle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
    color: "#ADADAD",
  },
  photos: {},
  photosContainer: {
    paddingTop: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 65,
    gap: 8,
  },
  backDrop: {
    borderWidth: 1,
    borderColor: "red",
    height: "100%",
  },
});

export default EventDetail;
