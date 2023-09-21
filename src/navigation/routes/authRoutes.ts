import Signup from "../../screens/authScreens/Signup";
import Signin from "../../screens/authScreens/Signin";
import UserDetails from "../../screens/authScreens/UserDetails";
import AcceptPrivacyPolicy from "../../screens/authScreens/AcceptPrivacyPolicy";
import AutoEntryTime from "../../screens/authScreens/AutoEntryTime";
import BottomTabs from "../../screens/BottomTabs";

export const authRoutes = [
  {
    name: "Signin",
    component: Signin,
    options: { headerShown: false },
  },
  {
    name: "Signup",
    component: Signup,
    options: { headerShown: false },
  },
  {
    name: "UserDetails",
    component: UserDetails,
    options: { headerShown: false },
  },
  {
    name: "AcceptPrivacyPolicy",
    component: AcceptPrivacyPolicy,
    options: { headerShown: false },
  },
  {
    name: "AutoEntryTime",
    component: AutoEntryTime,
    options: { headerShown: false },
  },
  {
    name: "MainTabs",
    component: BottomTabs,
    options: { headerShown: false },
    noScreenWrapper: true,
  },
];
