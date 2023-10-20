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
  TouchableWithoutFeedback,
} from "react-native";
import CustomButton from "../../components/Button/Button";

import KebabMenu from "../../assets/icons/kebab_menu.svg";
import Star from "../../assets/icons/star.svg";
import LocationIcon from "../../assets/icons/location.svg";
import TagIcon from "../../assets/icons/tag.svg";
import Edit from "../../assets/icons/edit_gray.svg";
import Delete from "../../assets/icons/delete.svg";
import Exclude from "../../assets/icons/exclude.svg";

import GeneralHeader from "../../components/Header/GeneralHeader";
import { formatDate } from "../../utils/helpers";
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

  const [isVerified, setIsVerified] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

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
    closeMenu();
  };

  const handleConfirmDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteEvent({ id: data.id }));
  };

  const handleVerify = () => {
    // dispatch
    dispatch(
      editEvent({
        id: data.id,
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
        {/* {menuVisible && (
          <Modal transparent={true} animationType="fade">
            <TouchableWithoutFeedback onPress={closeMenu}>
              <View style={styles.backDrop} />
            </TouchableWithoutFeedback>
          </Modal>
        )} */}
      </View>
    );
  };

  const renderPhotos = () => {
    return data.photos?.map((img, i) => (
      <TouchableOpacity
        key={img.id}
        style={[styles.photos, { width: imageWidth }]}
      >
        <EventImage imageUrl={img.url} imageStyles={{ borderRadius: 8 }} />
      </TouchableOpacity>
    ));
  };

  useEffect(() => {
    if (data) {
      setIsVerified(data.verified);
    }
  }, [data]);

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

      {/* Header */}
      <View>
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
              {formatDate(data?.end_timestamp.split("T")[0], true)}
            </Text>

            {data?.category !== null && (
              <Divider dividerStyle={styles.divider} />
            )}

            <Text style={styles.eventDate}>{data?.category?.name}</Text>
          </View>

          {/* location and tags */}
          <View style={styles.tagsContainer}>
            {/* Location */}
            <View style={[styles.flex]}>
              <LocationIcon />
              <Text style={styles.textStyle}>{data?.location}</Text>
            </View>

            {/* Event tags */}
            {data?.tags?.length > 0 ? (
              <View style={styles.flex}>
                <TagIcon />
                <Text style={styles.textStyle}>{data?.tags?.join(", ")}</Text>
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
          <View style={styles.photosContainer}>{renderPhotos()}</View>
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
    marginBottom: 75,
    gap: 8,
  },
  backDrop: {
    borderWidth: 1,
    borderColor: "red",
    height: "100%",
  },
});

export default EventDetail;
