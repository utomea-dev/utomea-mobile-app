import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Image, Keyboard } from "react-native";
import { HomeNavigator } from "./navigators/HomeNavigator";
import { SearchNavigator } from "./navigators/SearchNavigator";
import { CreateNavigator } from "./navigators/CreateNavigator";
import { ProfileNavigator } from "./navigators/ProfileNavigator";

const Tab = createBottomTabNavigator();

const tabConfig = [
  {
    name: "Home",
    component: HomeNavigator,
    imgsrc: require("../assets/icons/home.png"),
  },
  {
    name: "Search",
    component: SearchNavigator,
    imgsrc: require("../assets/icons/search.png"),
  },
  {
    name: "Create",
    component: CreateNavigator,
    imgsrc: require("../assets/icons/create.png"),
  },
  {
    name: "Profile",
    component: ProfileNavigator,
    imgsrc: require("../assets/icons/icon.png"),
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
          marginTop: -8,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const Tabs = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          display: isKeyboardOpen ? "none" : "flex",
          padding: 12,
          paddingRight: 40,
          paddingBottom: 16,
          paddingLeft: 40,
          position: "absolute",
          backgroundColor: "#0E0E0EE5",
          height: 72,
        },

        tabBarIcon: ({ focused }) => {
          const tabInfo = tabConfig.find((item) => item.name === route.name);
          if (!tabInfo) {
            console.log(`No tabInfo found for route name: ${route.name}`);
            return null;
          }
          return <TabItem focused={focused} iconUri={tabInfo.imgsrc} />;
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
          options={{ title: tab.name.toUpperCase(), unmountOnBlur: true }}
          listeners={({ navigation }) => ({
            blur: () => navigation.setParams({ screen: undefined }),
          })}
        />
      ))}
    </Tab.Navigator>
  );
};

export default Tabs;
