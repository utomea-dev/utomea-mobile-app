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

  useEffect(() => {
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
        setNewName(data.name); // Set initial value of the name field
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

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

      if (newName !== userProfile.name && imageUri) {
        setNameLoading(true);
        setIsUploadingImage(true);

        const updateImageUrl =
          "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/upload-profile-pic";

        const formData = new FormData();
        formData.append("profile_pic", {
          uri: imageUri,
          type: "image/jpeg",
          name: "profile.jpg",
        });

        await axios.post(updateImageUrl, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const updateNameUrl =
          "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/user-details";

        const nameData = {
          name: newName,
        };

        await axios.put(updateNameUrl, nameData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNameLoading(false);
        setIsUploadingImage(false);
        Alert.alert("Success", "Name and Image updated successfully!");
      } else if (newName !== userProfile.name) {
        setNameLoading(true);
        // If only the name changes
        const updateNameUrl =
          "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/user-details";

        const data = {
          name: newName,
        };

        await axios.put(updateNameUrl, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNameLoading(false);
        Alert.alert("Success", "Name updated successfully!");
      } else if (imageUri) {
        // If only the photo changes
        setIsUploadingImage(true);
        console.log("imageeee------", imageUri);

        const updateImageUrl =
          "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/upload-profile-pic";

        const formData = new FormData();
        formData.append("profile_pic", {
          uri: imageUri,
          type: "image/jpeg",
          name: "profile.jpg",
        });

        await axios.post(updateImageUrl, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setIsUploadingImage(false);
        Alert.alert("Success", "Image updated successfully!");
      }
    } catch (error) {
      setIsUploadingImage(false);
      console.error("Error updating user profile:", error);
    }
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
        hideMenu();
      } else if (result.errorCode) {
        console.log("Error in image picking:", result.errorMessage);
      } else {
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

  const hideMenu = () => {
    setMenuVisible(false);
  };

  const handleRemove = async () => {
    hideMenu();
    Alert.alert("Available Soon");
  };
  const menu = [
    {
      name: "Remove",
      onPress: handleRemove,
      icon: () => <Delete width={20} height={20} />,
    },
    {
      name: "Upload",
      onPress: selectImage,
      icon: () => <Picture width={20} height={20} />,
    },
  ];

  return (
    <View style={styles.container}>
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
            {isUploadingImage || isLoadingImage ? (
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
              onChangeText={(text) => setNewName(text)}
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
          onPress={handleUpdateProfile}
          containerStyle={styles.button}
          isLoading={nameloading}
        />
      </View>
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