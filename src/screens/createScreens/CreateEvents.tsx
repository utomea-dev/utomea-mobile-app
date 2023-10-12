import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
  BackHandler,
  Text,
} from "react-native";

import CalendarHeader from "../../components/Header/CalendarHeader";
import CustomButton from "../../components/Button/Button";
import Divider from "../../components/Divider/Divider";

import Category from "./components/Category";
import Tags from "./components/Tags";
import MyRating from "./components/Rating";
import AddPhotos from "./components/AddPhotos";
import EventTitle from "./components/EventTitle";
import DateSection from "./components/DateSection";
import LocationSection from "./components/LocationSection";
import Description from "./components/Description";
import GeneralHeader from "../../components/Header/GeneralHeader";
import DateFlyIn from "./components/DateFlyIn";
import LocationFlyIn from "./components/LocationFlyIn";
import { MONTHS } from "../../constants/constants";
import { createEvent, resetHome } from "../../redux/slices/homeSlice";
import { StackActions, useFocusEffect } from "@react-navigation/native";

const categories = [
  {
    id: 1,
    name: "Work",
  },
  {
    id: 2,
    name: "Home",
  },
  {
    id: 3,
    name: "Entertainment",
  },
  {
    id: 4,
    name: "Travel",
  },
  {
    id: 5,
    name: "Dining out",
  },
  {
    id: 6,
    name: "Family",
  },
  {
    id: 7,
    name: "Friends",
  },
  {
    id: 8,
    name: "Pet",
  },
  {
    id: 9,
    name: "School",
  },
  {
    id: 10,
    name: "Exercise",
  },
  {
    id: 11,
    name: "Sport",
  },
];

const CreateEvent = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    createEventLoading,
    createEventSuccess,
    createEventError,
    uploadImageLoading,
    uploadImageSuccess,
    uploadImageError,
  } = useSelector((state) => state.home);
  const { startDate, endDate } = useSelector((state) => state.home);
  const { year: startYear, month: startMonth, date: startDay } = startDate;
  const { year: endYear, month: endMonth, date: endDay } = endDate;

  // local states
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [rating, setRating] = useState(0);
  const [dateFlyInVisible, setDateFlyInVisible] = useState(false);
  const [locationFlyInVisible, setLocationFlyInVisible] = useState(false);

  // error states
  const [titleError, setTitleError] = useState("");
  const [tagError, setTagError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [photosError, setPhotosError] = useState("");

  const disableSaveButton = () => {
    if (
      photos.length > 0 ||
      title ||
      location ||
      selectedCategory ||
      description ||
      tags?.length > 0 ||
      rating > 0
    ) {
      return false;
    }
    return true;
  };

  const showFlyIn = (setFlyIn) => {
    setFlyIn(true);
  };

  const hideFlyIn = (setFlyIn) => {
    setFlyIn(false);
  };

  const clearErrors = () => {
    setTitleError("");
    setTagError("");
    setLocationError("");
    setPhotosError("");
  };

  const handleTitle = (t) => {
    setTitle(t);
  };

  const handleAddPhotos = (morePics = []) => {
    setPhotos((pics) => [...pics, ...morePics]);
  };

  const removePhotos = (pic) => {
    const filtered = photos.filter((img) => img.uri !== pic.uri);
    setPhotos(() => filtered);
  };

  const handleDatePress = () => {
    showFlyIn(setDateFlyInVisible);
  };

  const handleLocationPress = () => {
    showFlyIn(setLocationFlyInVisible);
    console.log("location press");
  };

  const onCategoryPress = (categ) => {
    setSelectedCategory(() => categ);
  };

  const handleAddTags = (tag: String) => {
    if (tag.length < 3 || tag.length > 20) {
      setTagError(() => "Tag should be 3 - 20 characters long");
      return;
    }

    const isExist = tags.includes(tag);
    if (isExist) {
      setTagError(() => "Tag already exist");
      return;
    }

    setTagError(() => "");
    const newTags = [...tags, tag].sort();
    setTags(() => newTags);
  };

  const handleRemoveTags = (tag) => {
    const filteredTags = tags.filter((t) => tag !== t);
    setTags(() => filteredTags);
  };

  const handleCancel = () => {
    clearErrors();
    dispatch(resetHome());
    navigation.navigate("HomeFeed");
  };

  const handleCreateEvent = () => {
    clearErrors();
    let errorFlag = false;
    if (!title) {
      setTitleError(() => "Please set a title for the Event");
      errorFlag = true;
    }

    if (title.length < 4 || title.length > 30) {
      setTitleError(() => "Title should be 4-30 characters long");
      errorFlag = true;
    }

    if (!location) {
      setLocationError(() => "Please set a location for the Event");
      errorFlag = true;
    }

    if (photos.length > 50) {
      setPhotosError(() => "Please remove some pics, max 50 allowed");
      errorFlag = true;
    }

    if (errorFlag) return;

    const body = {
      latitude,
      longitude,
      begin_timestamp: `${startYear}-${startMonth}-${
        Number(startDay) < 10 ? "0" + startDay : startDay
      }`,
      end_timestamp: `${endYear}-${endMonth}-${
        Number(endDay) < 10 ? "0" + endDay : endDay
      }`,
      title: title.trim().replace(/\s+/g, " "),
      description,
      location,
      tags,
      category: selectedCategory,
      rating,
    };

    clearErrors();
    dispatch(createEvent({ body, photos }));
  };

  const renderDateFlyIn = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={dateFlyInVisible}
        onRequestClose={() => hideFlyIn(setDateFlyInVisible)}
      >
        <DateFlyIn onClose={() => hideFlyIn(setDateFlyInVisible)} />
      </Modal>
    );
  };

  const renderLocationFlyIn = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={locationFlyInVisible}
        onRequestClose={() => hideFlyIn(setLocationFlyInVisible)}
      >
        <LocationFlyIn
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          setLocation={setLocation}
          onClose={() => hideFlyIn(setLocationFlyInVisible)}
        />
      </Modal>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      clearErrors();
    }, [dispatch])
  );

  useEffect(() => {
    if (!createEventLoading && !uploadImageLoading && createEventSuccess) {
      clearErrors();
      dispatch(resetHome());
      navigation.navigate("HomeFeed");
    }
  }, [createEventLoading, uploadImageLoading, createEventSuccess]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      {renderLocationFlyIn()}
      {renderDateFlyIn()}
      <GeneralHeader
        title="Create an Event"
        CTA={() => (
          <CustomButton
            isLoading={createEventLoading}
            disabled={disableSaveButton() || createEventLoading}
            title="Save"
            onPress={handleCreateEvent}
            buttonStyle={{ paddingVertical: 6 }}
          />
        )}
      />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <AddPhotos
          photos={photos}
          addPhotos={handleAddPhotos}
          removePhotos={removePhotos}
          validationError={photosError}
        />
        <Divider />
        <EventTitle
          title={title}
          onChangeText={handleTitle}
          validationError={titleError}
        />
        <Divider />
        <DateSection
          onPress={handleDatePress}
          date={`${MONTHS[endMonth].long} ${endDay}, ${endYear}`}
        />
        <Divider />
        <LocationSection
          onPress={handleLocationPress}
          validationError={locationError}
          location={location}
        />
        <Divider />
        <Category
          categories={categories}
          onPress={onCategoryPress}
          selectedCategory={selectedCategory}
        />
        <Divider />
        <Description
          description={description}
          setDescription={setDescription}
        />
        <Divider />
        <Tags
          tags={tags}
          onAdd={handleAddTags}
          validationError={tagError}
          onRemove={handleRemoveTags}
        />
        <Divider />
        <MyRating rating={rating} setRating={setRating} />
        <Divider />
        <View style={{ marginTop: 20, marginBottom: 75 }}>
          <CustomButton
            isLoading={createEventLoading}
            disabled={disableSaveButton() || createEventLoading}
            onPress={handleCreateEvent}
            title="Save & Create Event"
            buttonStyle={{ paddingVertical: 8 }}
            textStyle={styles.textStyle}
          />
          <CustomButton
            title="Cancel"
            onPress={handleCancel}
            buttonStyle={{ paddingVertical: 8, backgroundColor: "#222222" }}
            containerStyle={{ marginTop: 16 }}
            textStyle={{ color: "#FFFFFF" }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  photosButton: {
    borderWidth: 1,
    borderColor: "#3B3B3B",
    backgroundColor: "#0E0E0E",
    borderRadius: 8,
    padding: 4,
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photosButtonContainer: {
    paddingTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  sectionTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
  },
});

export default CreateEvent;
