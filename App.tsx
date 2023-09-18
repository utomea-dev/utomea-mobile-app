import React from "react";
import { Provider } from "react-redux";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homescreen from "./src/screens/Homescreen";
import Signup from "./src/screens/Signup";
import Signin from "./src/components/Authentication/Signin";
import store from "./src/redux/store";
import Authentication from "./src/navigation";
import { AppNavigator } from "./src/navigation/AppNavigator";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <AppNavigator />
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
