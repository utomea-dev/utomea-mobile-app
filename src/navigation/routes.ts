import Signup from "../screens/Signup";
import Signin from "../screens/Signin";
import UserDetails from "../screens/UserDetails";
import AcceptPrivacyPolicy from "../screens/AcceptPrivacyPolicy";
import AutoEntryTime from "../screens/AutoEntryTime";
import EmptyFeed from "../screens/EmptyFeed";

export const routes = [
  { name: "Signup", component: Signup, options: { headerShown: false } },
  { name: "Signin", component: Signin, options: { headerShown: false } },
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
    name: "EmptyFeed",
    component: EmptyFeed,
    options: { headerShown: false },
  },
];
