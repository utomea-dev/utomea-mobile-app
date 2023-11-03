import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralHeader from "../../components/Header/GeneralHeader";
import Options from "./Components/Options";
import LogoutButton from "./Components/LogoutButton";
import { useAuth } from "../../hooks/useAuth";
import Rightback from "../../assets/icons/right-back.png";
import axios from "axios";

function Profile({ navigation }) {
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const userDetails = useAuth();

  const handleLogout = () => {
    AsyncStorage.removeItem("utomea_user");
    AsyncStorage.clear();
    navigation.navigate("Signin");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userDetails) {
          const user = await AsyncStorage.getItem("utomea_user");
          if (user) {
            const userData = JSON.parse(user);
            const { token } = userData;

            const apiUrl =
              "https://171dzpmu9g.execute-api.us-east-2.amazonaws.com/user/user-details";

            const response = await axios.get(apiUrl, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const { name } = response.data.data;
            setUserName(name);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userDetails, navigation]);

  return (
    <View style={styles.container}>
      <GeneralHeader title={`Hi, ${loading ? "Loading..." : username}`} />
      <Options
        title={"App Preferences"}
        onPress={() => {
          navigation.navigate("Profile/appPreference");
        }}
        imageSource={Rightback}
      />
      <Options
        title={"Profile Settings"}
        onPress={() => {
          navigation.navigate("Profile/manageProfile");
        }}
        imageSource={Rightback}
      />
      <View style={styles.bottom}>
        <View style={styles.logoutButtonContainer}>
          <LogoutButton
            title="Log out"
            onPress={handleLogout}
            buttonStyle={{
              paddingVertical: 12,
              backgroundColor: "#222222",
              color: "white",
            }}
            textStyle={{ fontSize: 16, lineHeight: 24, color: "white" }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },

  logoutButtonContainer: {
    width: 345,
    marginBottom: 60,
  },

  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default Profile;
