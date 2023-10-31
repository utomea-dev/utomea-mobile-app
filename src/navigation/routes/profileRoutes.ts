import AppPreference from "../../screens/profileScreens/AppPreference";
import AutoVerification from "../../screens/profileScreens/AutoVerification";
import EntryTime from "../../screens/profileScreens/EntryTime";
import PrivacyPolicy from "../../screens/profileScreens/PrivacyPolicy";
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
  {
    name: "Profile/privacyPolicy",
    component: PrivacyPolicy,
    options: { headerShown: false },
  },
  {
    name: "Profile/entryTime",
    component: EntryTime,
    options: { headerShown: false },
  },
  {
    name: "Profile/autoVerification",
    component: AutoVerification,
    options: { headerShown: false },
  },
];
