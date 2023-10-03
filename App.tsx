import React from "react";
import { Provider } from "react-redux";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import store from "./src/redux/store";
import { AuthNavigator } from "./src/navigation/navigators/AuthNavigator";

const Stack = createStackNavigator();

const App = () => {
  const linking = {
    prefixes: ["https://utomeaapp", "utomeaapp://"],
    config: {
      screens: {
        "reset-password": { path: "reset-password/:token" },
      },
    },
  };
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
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
