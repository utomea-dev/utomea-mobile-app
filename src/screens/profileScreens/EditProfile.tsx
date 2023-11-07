import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  Keyboard,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralHeader from "../../components/Header/GeneralHeader";
import EditIcon from "../../assets/icons/EditIcon.png";
import CustomInput from "../../components/Input/Input";
import CustomButton from "../../components/Button/Button";
import { launchImageLibrary } from "react-native-image-picker";
import Delete from "../../assets/icons/delete.svg";
import Picture from "../../assets/icons/Picture.svg";
import BackDropMenu from "./Components/BackdropMenu";
import { trimAndNormalizeSpaces } from "../../utils/helpers";
import OverlayLoader from "../../components/Loaders/OverlayLoader";

const getInitials = (name) => {
  if (!name) return "";
  const names = name.split(" ");
  if (names.length >= 2) {
    return names[0][0] + names[names.length - 1][0];
  }
  return names[0][0];
};

const EditProfilePage = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nameloading, setNameLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [nameErrror, setNameerror] = useState("");
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [newimage, setnewImage] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isUpdateButtonDisabled, setUpdateButtonDisabled] = useState(true);
  const [loaderLoading, setLoaderLoading] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const details = await AsyncStorage.getItem("utomea_user");
      const userData = JSON.parse(details);
      const { token } = userData;

      const apiUrl =
        "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/user-details";

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;
      setUserProfile(data);
      console.log("dauu99duoishdoihso------", data);
      setNewName(data.name);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const details = await AsyncStorage.getItem("utomea_user");
      const userData = JSON.parse(details);
      const { token } = userData;

      if (!newName) {
        setNameerror("Name field cannot be empty.");
        return;
      } else {
        setNameerror("");
      }

      if (newName.length > 25) {
        setNameerror("Name cannot be more than 25 characters.");
        return;
      }
      if (newName.length < 4) {
        setNameerror("Name cannot be less than 4 characters.");
        return;
      }
      if (newName.match(/^\d/)) {
        setNameerror("Name cannot start with a number.");
        return;
      }

      if (newName !== userProfile.name && newimage) {
        setLoaderLoading(true);
        const updateImageUrl =
          "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/upload-profile-pic";

        const formData = new FormData();
        formData.append("profile_pic", {
          uri: imageUri,
          type: "image/jpeg",
          name: imageUri,
        });

        await axios.post(updateImageUrl, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const updateNameUrl =
          "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/user-details";

        const trimmedName = trimAndNormalizeSpaces(newName);
        console.log("trimmedName", trimmedName);
        const nameData = {
          name: trimmedName,
        };

        await axios.put(updateNameUrl, nameData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNameLoading(false);
        setIsUploadingImage(false);
        setnewImage(false);
        setUpdateButtonDisabled(true);
        Alert.alert("Success", "Profile Updated Successfully!");
        Keyboard.dismiss();
        setLoaderLoading(false);
      } else if (newName !== userProfile.name) {
        setLoaderLoading(true);
        setNameLoading(true);
        // If only the name changes
        const updateNameUrl =
          "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/user-details";

        const trimmedName = trimAndNormalizeSpaces(newName);
        const data = {
          name: trimmedName,
        };

        await axios.put(updateNameUrl, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNameLoading(false);
        setUpdateButtonDisabled(true);
        setLoaderLoading(true);
        Alert.alert("Success", "Profile Updated Successfully!");
        Keyboard.dismiss();
      } else if (newimage) {
        // If only the photo changes
        setIsUploadingImage(true);
        setLoaderLoading(true);
        console.log("imageeee------", imageUri);

        const updateImageUrl =
          "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/upload-profile-pic";

        const formData = new FormData();
        formData.append("profile_pic", {
          uri: imageUri,
          type: "image/jpeg",
          name: imageUri,
        });

        await axios.post(updateImageUrl, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setLoaderLoading(false);
        setIsUploadingImage(false);
        Alert.alert("Success", "Profile updated successfully!");
        setnewImage(false);
        Keyboard.dismiss();
      }
    } catch (error) {
      setIsUploadingImage(false);
      console.error("Error updating user profile:", error);
    }
    setLoaderLoading(false);
  };

  const selectImage = async () => {
    setIsLoadingImage(true);
    hideMenu();

    try {
      const options = {
        mediaType: "photo",
        selectionLimit: 1,
        quality: 0.5,
        includeBase64: false,
      };

      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        console.log("Image selection canceled");
        setnewImage(false);
        hideMenu();
      } else if (result.errorCode) {
        console.log("Error in image picking:", result.errorMessage);
      } else {
        setnewImage(true);
        setImageUri(result.assets[0].uri);
      }
    } catch (e) {
      console.log("Error:", e);
    } finally {
      setIsLoadingImage(false);
    }
  };
  const showMenu = () => {
    setMenuVisible((prevVisible) => !prevVisible);
  };
  const showModal = () => {
    setConfirmationModalVisible(true);
  };

  const hideMenu = () => {
    setMenuVisible(false);
  };
  const closeConfirmationModal = () => {
    setConfirmationModalVisible(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true);
      const details = await AsyncStorage.getItem("utomea_user");
      const userData = JSON.parse(details);
      const { token } = userData;

      const updateImageUrl =
        "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/delete-profile-pic";

      await axios.delete(updateImageUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setImageUri(null);
    } catch (error) {
      console.error("Error removing profile pic:", error);
    } finally {
      setDeleteLoading(false);
      closeConfirmationModal();
      hideMenu();
    }
    fetchUserProfile();
  };
  const menu = [
    {
      name: "Remove",
      onPress: showModal,
      icon: () => <Delete width={20} height={20} />,
    },

    {
      name: "Upload",
      onPress: selectImage,
      icon: () => <Picture width={20} height={20} />,
    },
  ];

  console.log("New Imageeeeeee -----", newimage);

  return (
    <View style={styles.container}>
      {loaderLoading && <OverlayLoader />}
      <GeneralHeader title="Edit Profile" />
      {loading ? (
        <ActivityIndicator
          style={{
            marginTop: 20,
          }}
          size="large"
          color="#07AA8C"
        />
      ) : userProfile ? (
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            {isLoadingImage ? (
              <ActivityIndicator size="large" color="#07AA8C" />
            ) : imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.profileImage} />
            ) : userProfile.profile_pic ? (
              <Image
                source={{ uri: userProfile.profile_pic }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.initialsContainer}>
                <Text style={styles.initials}>
                  {getInitials(userProfile.name)}
                </Text>
              </View>
            )}
          </View>
          {isUploadingImage || isLoadingImage ? null : (
            <TouchableOpacity onPress={showMenu}>
              <Image source={EditIcon} style={styles.editIcon} />
            </TouchableOpacity>
          )}

          {isMenuVisible ? (
            <View>
              <BackDropMenu menu={menu} navigation={navigation} />
            </View>
          ) : null}
          <View style={styles.userInfo}>
            <CustomInput
              validationError={nameErrror}
              label="Name"
              placeholder="Enter your name"
              value={newName}
              onChangeText={(text) => {
                setNewName(text);
                if (text.trim() === userProfile.name || text.trim() === "") {
                  setUpdateButtonDisabled(true);
                } else {
                  setUpdateButtonDisabled(false);
                }
              }}
              inputStyle={{ paddingVertical: 10 }}
            />
          </View>
        </View>
      ) : (
        <Text style={{ color: "white", fontSize: 15 }}>
          No User Profile Found
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <CustomButton
          title="Cancel"
          onPress={() => {
            navigation.navigate("Profile/manageProfile");
          }}
          buttonStyle={{ backgroundColor: "#222222" }}
          textStyle={{ color: "#FFFFFF" }}
          containerStyle={styles.button}
        />
        <CustomButton
          title="Update Profile"
          disabled={!newimage && isUpdateButtonDisabled}
          onPress={handleUpdateProfile}
          containerStyle={styles.button}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmationModalVisible}
        onRequestClose={closeConfirmationModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.confirmationTitle}>Are you sure?</Text>
            <Text style={styles.confirmationText}>
              You want to Remove your profile Picture?
            </Text>
            <View style={styles.modalButtons}>
              <CustomButton
                title="Cancel"
                buttonStyle={{ backgroundColor: "#222222" }}
                textStyle={{ color: "#FFFFFF" }}
                onPress={closeConfirmationModal}
              />
              <CustomButton
                title="Yes, Delete"
                buttonStyle={{ backgroundColor: "#58DAC3" }}
                textStyle={{ color: "#0E0E0E" }}
                onPress={handleConfirmDelete}
                isLoading={deleteLoading}
                disabled={deleteLoading}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  profileImageContainer: {
    borderRadius: 50,
    overflow: "hidden",
    resizeMode: "contain",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    gap: 20,
  },
  button: {
    flex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
  },
  initialsContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#A6F2E5",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontSize: 24,
    color: "#045D4D",
  },
  userInfo: {
    width: "100%",
  },
  editIcon: {
    width: 24,
    height: 24,
    marginTop: -8,
    left: 35,
    top: -18,
    backgroundColor: "black",
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
  confirmationTitle: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginVertical: 8,
  },
  confirmationText: {
    color: "#ADADAD",
    textAlign: "center",
    paddingHorizontal: 4,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
    gap: 50,
    justifyContent: "space-between",
  },

  closeButton: {
    backgroundColor: "white",
    padding: 16,
    alignItems: "center",
  },
  closeButtonText: {
    color: "black",
  },
  menuContainer: {
    position: "relative",
    right: 0,
    top: 50,
  },
});

export default EditProfilePage;
