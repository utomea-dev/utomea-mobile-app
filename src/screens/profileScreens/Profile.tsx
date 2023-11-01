import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralHeader from "../../components/Header/GeneralHeader";
import PlusDark from "../../assets/icons/plus_dark.svg";
import { useNavigation } from "@react-navigation/native";
import Options from "./Components/Options";
import LogoutButton from "./Components/LogoutButton";
import { useAuth } from "../../hooks/useAuth";
import Rightback from "../../assets/icons/right-back.png";

function Profile({ navigation }) {
  const [username, setUserName] = useState("");
  const userDetails = useAuth();
  const handleLogout = () => {
    AsyncStorage.removeItem("utomea_user");
    navigation.navigate("Signin");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      // Handle user details retrieval with async/await
      try {
        if (userDetails) {
          const user = await AsyncStorage.getItem("utomea_user");
          if (user) {
            const userData = JSON.parse(user);
            const { name } = userData.user;
            console.log("User name:", name);
            setUserName(name);

            // You can set the name in your component state or display it in your UI as needed
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call the async function to fetch user details
    fetchUserDetails();
  }, [userDetails, navigation]);
  return (
    <View style={styles.container}>
      <GeneralHeader title={`Hi, ${username}`} />
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
          navigation.navigate("Profile/appPreference");
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
    paddingTop: 0, // Adjust this value as needed to control the header's position,
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
