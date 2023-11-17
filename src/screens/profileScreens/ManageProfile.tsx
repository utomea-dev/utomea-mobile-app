import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralHeader from "../../components/Header/GeneralHeader";
import Edit from "../../assets/icons/Edit.png";
import UserIcon from "../../assets/icons/UserIcon.png";
import Options from "./Components/Options";

const getInitials = (name) => {
  if (!name) return "";
  const names = name.split(" ");
  if (names.length >= 2) {
    return names[0][0] + names[names.length - 1][0];
  }
  return names[0][0];
};

const ManageProfilePage = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
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
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      <GeneralHeader title="Profile settings" />
      {loading ? (
        <ActivityIndicator
          style={{
            marginTop: 20,
          }}
          size="large"
          color="#07AA8C"
        />
      ) : userProfile ? (
        <View style={styles.profileInfo}>
          <View style={styles.profileImageContainer}>
            {userProfile.profile_pic ? (
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
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userProfile.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              navigation.navigate("Profile/editProfile");
            }}
          >
            <Image
              source={Edit}
              style={{
                width: 26,
                height: 26,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={{ color: "white", fontSize: 15 }}>
          No User Profile Found
        </Text>
      )}
      {!loading && userProfile !== null && userProfile.account_type === 0 && (
        <View style={{ marginTop: 20 }}>
          <Options
            title={"Manage Password"}
            onPress={() => {
              navigation.navigate("Profile/updatePassword");
            }}
            iconSource={UserIcon}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  profileImageContainer: {
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 16,
    resizeMode: "contain",
  },
  profileImage: {
    width: 60,
    height: 60,
  },
  initialsContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#A6F2E5",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontSize: 24,
    color: "#045D4D",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  editButton: {
    padding: 8,
  },
});

export default ManageProfilePage;
