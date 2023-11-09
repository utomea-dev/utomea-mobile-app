import Signup from "../../screens/authScreens/Signup";
import Signin from "../../screens/authScreens/Signin";
import UserDetails from "../../screens/authScreens/UserDetails";
import AcceptPrivacyPolicy from "../../screens/authScreens/AcceptPrivacyPolicy";
import AutoEntryTime from "../../screens/authScreens/AutoEntryTime";
import ForgotPassword from "../../screens/authScreens/ForgotPassword";
import CheckEmail from "../../screens/authScreens/CheckEmail";
import NewPassword from "../../screens/authScreens/NewPassword";
import BottomTabs from "../../screens/BottomTabs";
import VerifyEmail from "../../screens/authScreens/VerifyEmail";

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
    name: "VerifyEmail",
    component: VerifyEmail,
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
    name: "ForgotPassword",
    component: ForgotPassword,
    options: { headerShown: false },
  },
  {
    name: "CheckEmail",
    component: CheckEmail,
    options: { headerShown: false },
  },
  {
    name: "reset-password",
    component: NewPassword,
    options: { headerShown: false },
  },
  {
    name: "MainTabs",
    component: BottomTabs,
    options: { headerShown: false },
    noScreenWrapper: true,
  },
];
