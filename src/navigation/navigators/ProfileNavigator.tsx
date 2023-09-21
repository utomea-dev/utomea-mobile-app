import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import withWrapper from "../../hooks/withWrapper";
import ScreenView from "../../components/ScreenView/ScreenView";
import { profileRoutes } from "../routes/profileRoutes";

export const ProfileNavigator = () => {
  const Stack = createStackNavigator();

  const screens = profileRoutes.map((route, key) => {
    const Component = withWrapper(route.component, ScreenView);

    return (
      <Stack.Screen
        key={key}
        name={route.name}
        component={Component}
        options={route.options}
      />
    );
  });

  return <Stack.Navigator>{screens}</Stack.Navigator>;
};
