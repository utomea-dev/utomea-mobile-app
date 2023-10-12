import React from "react";
import { Text, View } from "react-native";
import CustomButton from "../../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Profile({ navigation }) {
  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate("Signin");
  };
  return (
    <View>
      <CustomButton title="Logout" onPress={handleLogout} />
    </View>
  );
}

export default Profile;
