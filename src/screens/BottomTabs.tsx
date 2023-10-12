import React from "react";
import { Text, View } from "react-native";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";

function BottomTabs({ navigation }) {
  const checkAuth = async () => {
    try {
      const isAuthenticated = await useAuth();

      if (!isAuthenticated) {
        navigation.navigate("Signin");
      }
    } catch (error) {
      console.error("Error checking user token:", error);
    }
  };

  useFocusEffect(() => {
    checkAuth();
  });

  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "#0E0E0E" }}>
      <BottomTabNavigator />
    </View>
  );
}

export default BottomTabs;
