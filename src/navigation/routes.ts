import Signup from "../screens/Signup";
import Signin from "../screens/Signin";
import UserDetails from "../screens/UserDetails";
import AcceptPrivacyPolicy from "../screens/AcceptPrivacyPolicy";
import AutoEntryTime from "../screens/AutoEntryTime";
import EmptyFeed from "../screens/EmptyFeed";

export const routes = [
  {
    name: "Signin",
    component: Signin,
    options: { headerShown: false },
    noBottomNavigation: true,
  },
  {
    name: "Signup",
    component: Signup,
    options: { headerShown: false },
    noBottomNavigation: true,
  },
  {
    name: "UserDetails",
    component: UserDetails,
    options: { headerShown: false },
    noBottomNavigation: true,
  },
  {
    name: "AcceptPrivacyPolicy",
    component: AcceptPrivacyPolicy,
    options: { headerShown: false },
    noBottomNavigation: true,
  },
  {
    name: "AutoEntryTime",
    component: AutoEntryTime,
    options: { headerShown: false },
    noBottomNavigation: true,
  },
  {
    name: "EmptyFeed",
    component: EmptyFeed,
    options: { headerShown: false },
  },
];
