import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import withScreenWrapper from "../hooks/screenWrapper";
import ScreenView from "../components/ScreenView/ScreenView";
import { routes } from "./routes";

export const AppNavigator = () => {
  const Stack = createStackNavigator();

  const screens = routes.map((route, key) => {
    const Component = withScreenWrapper(route.component, ScreenView);

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
