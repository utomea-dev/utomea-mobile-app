import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import withWrapper from "../../hooks/withWrapper";
import ScreenView from "../../components/ScreenView/ScreenView";
import { authRoutes } from "../routes/authRoutes";
import SplashScreen from "react-native-splash-screen";
import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { setNetworkInfo } from "../../redux/slices/authSlice";

export const AuthNavigator = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const Stack = createStackNavigator();

  const hideSplashScreenAndRedirect = async () => {
    const user = await useAuth();
    setTimeout(() => {
      // if (user === "Unknown") {
      //   navigation.navigate("Signin");
      //   return;
      // }
      SplashScreen?.hide();
    }, 500);
  };

  useEffect(() => {
    hideSplashScreenAndRedirect();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setNetworkInfo(state));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const screens = authRoutes.map((route, key) => {
    const Component = route.noScreenWrapper
      ? route.component
      : withWrapper(route.component, ScreenView);

    return (
      <Stack.Screen
        key={key}
        name={route.name}
        component={Component}
        options={route.options}
      />
    );
  });

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress,
            // transform: [
            //   {
            //     translateX: current.progress.interpolate({
            //       inputRange: [0, 1],
            //       outputRange: [500, 0],
            //     }),
            //   },
            // ],
          },
        }),
        transitionSpec: {
          open: { animation: "timing", config: { duration: 300 } },
          close: { animation: "timing", config: { duration: 300 } },
        },
      }}
    >
      {screens}
    </Stack.Navigator>
  );
};
