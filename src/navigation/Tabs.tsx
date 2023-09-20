import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import Homescreen from "../screens/Homescreen";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import CreateEvent from "../screens/CreateEvents";
import { View, Text, Image } from "react-native";

const Tab = createBottomTabNavigator();

const tabConfig = [
  {
    name: "Home",
    component: Homescreen,
    iconUri: require("../../assets/icons/home.png"), // Replace with your home icon URL
  },
  {
    name: "Search",
    component: Search,
    iconUri: require("../../assets/icons/search.png"), // Replace with your search icon URL
  },
  {
    name: "Create",
    component: CreateEvent,
    iconUri: require("../../assets/icons/create.png"), // Replace with your create icon URL
  },
  {
    name: "Profile",
    component: Profile,
    iconUri: require("../../assets/icons/icon.png"), // Replace with your profile icon URL
  },
];

const TabItem = ({ focused, iconUri, label }) => {
  return (
    // In this view style reduce the gap between the items

    <View style={{ alignItems: "center" }}>
      <Image
        source={iconUri}
        style={{
          marginTop: 3,
          tintColor: focused ? "#58DAC3" : "white",
        }}
      />

      <Text
        style={{
          color: focused ? "#58DAC3" : "white",
          fontSize: 10,
          // marginBottom: 4,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          display: "flex",
          padding: 16,
          paddingRight: 40,
          paddingBottom: 12,
          paddingLeft: 40,
          position: "absolute",
          backgroundColor: "#0E0E0EE5",
          height: 75,
        },

        tabBarIcon: ({ focused }) => {
          const tabInfo = tabConfig.find((item) => item.name === route.name);
          if (tabInfo) {
            return <TabItem focused={focused} iconUri={tabInfo.iconUri} />;
          }
          return null;
        },
        tabBarLabel: ({ focused, color }) => {
          const tabInfo = tabConfig.find((item) => item.name === route.name);
          if (tabInfo) {
            return <TabItem focused={focused} label={tabInfo.name} />;
          }
          return null;
        },
      })}
    >
      {tabConfig.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{ title: tab.name.toUpperCase() }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default Tabs;
