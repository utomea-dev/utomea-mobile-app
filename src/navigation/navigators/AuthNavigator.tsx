import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import withWrapper from "../../hooks/withWrapper";
import ScreenView from "../../components/ScreenView/ScreenView";
import { authRoutes } from "../routes/authRoutes";

export const AuthNavigator = () => {
  const Stack = createStackNavigator();

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

  return <Stack.Navigator>{screens}</Stack.Navigator>;
};