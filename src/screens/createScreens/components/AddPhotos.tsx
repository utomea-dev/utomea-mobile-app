import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Label from "../../../components/Label/Label";
import CustomButton from "../../../components/Button/Button";
import { launchImageLibrary } from "react-native-image-picker";

import PlusLight from "../../../assets/icons/plus_light.svg";
import Add from "../../../assets/icons/add.svg";
import SelectedIcon from "../../../assets/icons/selected.svg";
import Delete from "../../../assets/icons/delete.svg";

import EventImage from "../../../components/Event/EventImage";

const addPhotosButtons = [1, 2, 3, 4];

const AddPhotos = ({
  photos = [],
  addPhotos = (e) => {},
  removePhotos = (e) => {},
  selectedPhotos = [],
  validationError = "",
  mode = "",
  ...rest
}) => {
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = (screenWidth - 56) / 4;
  const photosToRender = mode === "delete" ? photos : photos.slice(0, 8);

  const openImagePicker = async () => {
    if (mode === "delete") return;
    try {
      const options = {
        mediaType: "photo",
        selectionLimit: 50,
        presentationStyle: "popover",
      };
      const result = await launchImageLibrary(options);
      if (result.didCancel) {
        console.log("canceled");
        return;
      }

      if (result.errorCode) {
        console.log("Error in image picking");
        return;
      }
      const images = result?.assets?.map((img) => {
        return { fileName: img.fileName, fileSize: img.fileSize, uri: img.uri };
      });

      const uniqueImages = new Set(photos.map((obj) => obj.fileName));
      const filtered = images?.filter((obj) => !uniqueImages.has(obj.fileName));

      addPhotos(filtered);
    } catch (e) {
      console.log("error---", e);
    }
  };

  const renderCreateButton = () => {
    return addPhotosButtons.map((btn) => (
      <TouchableOpacity
        key={btn}
        style={styles.photosButton}
        onPress={openImagePicker}
      >
        <PlusLight />
      </TouchableOpacity>
    ));
  };

  const renderPhotos = () => {
    return photosToRender.map((img, i) => (
      <TouchableOpacity
        onPress={() => removePhotos(img)}
        key={img.fileName}
        style={[styles.photos, { width: imageWidth }]}
      >
        {i === 7 && photos.length > 8 && mode !== "delete" && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>+{photos.length - 8}</Text>
          </View>
        )}
        {mode === "delete" && selectedPhotos.includes(img.id) && (
          <View style={styles.selected}>
            <SelectedIcon style={styles.selectedIcon} />
          </View>
        )}
        <EventImage
          imageUrl={img.uri || img.url}
          imageStyles={{ borderRadius: 8 }}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={{ marginVertical: 20 }}>
      <View style={styles.sectionTitle}>
        <Label label={mode === "delete" ? "All Photos" : "Photos"} />
        {photos.length > 0 && (
          <CustomButton
            onPress={
              mode === "delete"
                ? selectedPhotos.length > 0
                  ? rest.deletePhotos
                  : rest.selectAll
                : openImagePicker
            }
            title={
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {mode === "delete" && selectedPhotos.length > 0 && <Delete />}
                <Text style={{ color: "#FFFFFF" }}>
                  {mode === "delete"
                    ? selectedPhotos.length > 0
                      ? "Delete Selection"
                      : "Select photos"
                    : "Add more photos"}
                </Text>
                {mode !== "delete" && <Add />}
              </View>
            }
            buttonStyle={{ paddingVertical: 6, backgroundColor: "#222222" }}
          />
        )}
      </View>
      {photos.length ? (
        <View style={styles.photosContainer}>{renderPhotos()}</View>
      ) : (
        <View style={styles.photosButtonContainer}>{renderCreateButton()}</View>
      )}
      {validationError && (
        <View style={{ marginTop: 5 }}>
          <Text style={styles.errorText}>{validationError}</Text>
        </View>
      )}
    </View>
  );
};

export default AddPhotos;

const styles = StyleSheet.create({
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
  photos: {},
  overlay: {
    zIndex: 99,
    borderRadius: 8,
    backgroundColor: "#0E0E0E66",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    aspectRatio: 1,
    color: "white",
  },
  overlayText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  selected: {
    zIndex: 99,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#58DAC3",
    backgroundColor: "rgba(14, 14, 14, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    aspectRatio: 1,
  },
  selectedIcon: {
    zIndex: 99,
    position: "absolute",
    top: 0,
    right: 0,
    margin: 4,
  },
  photosContainer: {
    paddingTop: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  sectionTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  errorText: {
    fontSize: 12,
    color: "#FC7A1B",
    textAlign: "left",
  },
});
