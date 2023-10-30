import AppPreference from "../../screens/profileScreens/AppPreference";
import Profile from "../../screens/profileScreens/Profile";
export const profileRoutes = [
  {
    name: "Profile/profile",
    component: Profile,
    options: { headerShown: false },
  },
  {
    name: "Profile/appPreference",
    component: AppPreference,
    options: { headerShown: false },
  },
];
