import AppPreference from "../../screens/profileScreens/AppPreference";
import AutoVerification from "../../screens/profileScreens/AutoVerification";
import EditProfilePage from "../../screens/profileScreens/EditProfile";
import EntryTime from "../../screens/profileScreens/EntryTime";
import ExcludedLocation from "../../screens/profileScreens/ExcludedLocation";
import ManageProfilePage from "../../screens/profileScreens/ManageProfile";
import PrivacyPolicy from "../../screens/profileScreens/PrivacyPolicy";
import Profile from "../../screens/profileScreens/Profile";
import UpdatePassword from "../../screens/profileScreens/UpdatePassword";

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
  {
    name: "Profile/excludedLocation",
    component: ExcludedLocation,
    options: { headerShown: false },
  },
  {
    name: "Profile/manageProfile",
    component: ManageProfilePage,
    options: { headerShown: false },
  },
  {
    name: "Profile/updatePassword",
    component: UpdatePassword,
    options: { headerShown: false },
  },
  {
    name: "Profile/editProfile",
    component: EditProfilePage,
    options: { headerShown: false },
  },
];
