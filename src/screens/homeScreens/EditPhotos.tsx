import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
  Modal,
} from "react-native";

import CustomButton from "../../components/Button/Button";
import Divider from "../../components/Divider/Divider";

import AddPhotos from "../createScreens/components/AddPhotos";
import GeneralHeader from "../../components/Header/GeneralHeader";

import Delete from "../../assets/icons/delete.svg";

import { StackActions, useFocusEffect } from "@react-navigation/native";
import { deletePhotos, editEvent } from "../../redux/slices/eventDetailSlice";

const EditPhotos = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    eventDetail: data,
    deletePhotosLoading,
    deletePhotosSuccess,
    deletePhotosError,
  } = useSelector((state) => state.eventDetail);

  // local states
  const [modalVisible, setModalVisible] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  // error states
  const [deleteError, setDeleteError] = useState("");

  // initialize states with event data
  useEffect(() => {
    if (data !== null) {
      setPhotos(() => data.photos);
    }
  }, [data]);

  const resetStates = () => {
    setPhotos([]);
    setSelectedPhotos([]);
  };

  const clearErrors = () => {
    setDeleteError("");
  };

  const handleCancel = () => {
    resetStates();
    clearErrors();
    navigation.goBack();
  };

  const removePhoto = (img) => {
    if (selectedPhotos.includes(img.id)) {
      const toggleSelected = selectedPhotos.filter((id) => id !== img.id);
      setSelectedPhotos(() => toggleSelected);
    } else {
      setSelectedPhotos((pics) => [...pics, img.id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPhotos.length === photos.length) {
      setSelectedPhotos(() => []);
      return;
    }
    const all = photos.map((p) => p.id);
    setSelectedPhotos(() => [...all]);
  };

  const handleConfirm = () => {
    dispatch(deletePhotos({ body: { photoIds: selectedPhotos } }));
  };

  const handleDeletePhotos = () => {
    if (selectedPhotos.length === 0) {
      setDeleteError("No Photos Selected");
      return;
    }

    clearErrors();
    setModalVisible(() => true);
  };

  useEffect(() => {
    if (deletePhotosSuccess) {
      const remaingPhotos = photos.filter(
        (p) => !selectedPhotos.includes(p.id)
      );
      setPhotos(() => [...remaingPhotos]);
      setSelectedPhotos([]);
      setModalVisible(() => false);
      if (remaingPhotos.length === 0) {
        navigation.goBack();
      }
    }
    if (deletePhotosError) {
      setDeleteError(() => deletePhotosError);
    }
  }, [deletePhotosSuccess, deletePhotosError]);

  useFocusEffect(
    React.useCallback(() => {
      clearErrors();
    }, [])
  );

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
              Once deleted, you can’t retrieve the selected photos on the app.
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
                disabled={deletePhotosLoading}
                title="Cancel"
                buttonStyle={{ backgroundColor: "#222222" }}
                textStyle={{ color: "#FFFFFF" }}
                onPress={() => setModalVisible(false)}
              />
              <CustomButton
                disabled={deletePhotosLoading}
                isLoading={deletePhotosLoading}
                title="Yes, Delete"
                onPress={handleConfirm}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {renderModal()}
      <GeneralHeader title="Edit Event" />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <AddPhotos
          photos={photos}
          removePhotos={removePhoto}
          selectedPhotos={selectedPhotos}
          validationError={deleteError}
          mode={"delete"}
          deletePhotos={handleDeletePhotos}
          selectAll={handleSelectAll}
        />
        <Divider />
        <View style={{ marginTop: 20, marginBottom: 75 }}>
          <CustomButton
            Icon={Delete}
            onPress={handleDeletePhotos}
            title="Delete Selection"
            buttonStyle={{ paddingVertical: 10, backgroundColor: "#222222" }}
            textStyle={styles.textStyle}
          />
          <CustomButton
            title="Cancel"
            onPress={handleCancel}
            buttonStyle={{
              paddingVertical: 16,
              backgroundColor: "transparent",
            }}
            textStyle={styles.textStyle}
          />
        </View>
      </ScrollView>
    </View>
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
    color: "#FFFFFF",
  },
});

export default EditPhotos;
