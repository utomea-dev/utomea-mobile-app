import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import withWrapper from "../../hooks/withWrapper";
import ScreenView from "../../components/ScreenView/ScreenView";
import { createRoutes } from "../routes/createRoutes";

export const CreateNavigator = () => {
  const Stack = createStackNavigator();

  const screens = createRoutes.map((route, key) => {
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

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress,
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
