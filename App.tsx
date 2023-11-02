import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import store from "./src/redux/store";
import { AuthNavigator } from "./src/navigation/navigators/AuthNavigator";
import { SIZES } from "./src/constants/theme";
import AppIntroSlider from "react-native-app-intro-slider";
import RightBack from "./src/assets/icons/right-back.png";
import LeftBack from "./src/assets/icons/left-back.png";
import { useAuth } from "./src/hooks/useAuth";

const Stack = createStackNavigator();

const slides = [
  {
    id: 1,
    title: "Rejoice",
    description:
      "Rejoice in the journey, where memories are made and cherished moments come alive.",
    image: require("./src/assets/images/Onboarding-1.png"),
  },
  {
    id: 2,
    title: "Relive",
    description:
      "Welcome to a world where time embraces nostalgia, and every click ignites the magic of reliving.",
    image: require("./src/assets/images/Onboarding-2.png"),
  },
  {
    id: 3,
    title: "Savour",
    description:
      "Savour the moments that define us – where nostalgia meets celebration.",
    image: require("./src/assets/images/Onboarding-3.png"),
  },
];

const App = () => {
  const [showHomePage, setShowHomePage] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const hideSplashScreenAndRedirect = async () => {
    const user = await useAuth();
    setTimeout(() => {
      SplashScreen?.hide();
    }, 500);
  };
  useEffect(() => {
    hideSplashScreenAndRedirect();
  }, []);

  const linking = {
    prefixes: ["https://utomeaapp", "utomeaapp://"],
    config: {
      screens: {
        "reset-password": { path: "reset-password/:token" },
      },
    },
  };

  useEffect(() => {
    // Check if user details exist in AsyncStorage
    AsyncStorage.getItem("utomea_user").then((user) => {
      if (user) {
        // User details exist, no need to show onboarding
        setShowHomePage(true);
        setUserDetails(user);
      }
    });
  }, []);

  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                padding: 15,
                paddingTop: 95,
                backgroundColor: "black",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  fontSize: 40,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  paddingTop: 5,
                  fontSize: 14,
                  color: "#FFFFFF",
                }}
              >
                {item.description}
              </Text>
              <Image
                source={item.image}
                style={{
                  width: SIZES.width - 80,
                  height: 450,
                }}
                resizeMode="contain"
              />
            </View>
          );
        }}
        activeDotStyle={{
          backgroundColor: "#FFFFFF",
          width: 10,
        }}
        renderNextButton={() => (
          <Image
            style={{
              width: 40,
              height: 40,
            }}
            source={RightBack}
          />
        )}
        renderPrevButton={() => (
          <Image
            style={{
              width: 26.5,
              height: 26.5,
              top: 11.2,
              marginLeft: 5.5,
            }}
            source={LeftBack}
          />
        )}
        renderDoneButton={() => (
          <Image
            style={{
              width: 40,
              height: 40,
            }}
            source={RightBack}
          />
        )}
        showPrevButton
        onDone={() => {
          setShowHomePage(true);
          // Store user details in AsyncStorage
          AsyncStorage.setItem("utomea_user", userDetails);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0E0E0E" }}>
        <NavigationContainer linking={linking}>
          <AuthNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
});

export default App;
