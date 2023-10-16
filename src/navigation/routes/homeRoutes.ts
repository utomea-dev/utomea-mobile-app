import EditEvent from "../../screens/homeScreens/EditEvent";
import EditPhotos from "../../screens/homeScreens/EditPhotos";
import EventDetail from "../../screens/homeScreens/EventDetail";
import HomeFeed from "../../screens/homeScreens/HomeFeed";

export const homeRoutes = [
  {
    name: "HomeFeed",
    component: HomeFeed,
    options: { headerShown: false },
  },
  {
    name: "EventDetail",
    component: EventDetail,
    options: { headerShown: false },
  },
  {
    name: "EditEvent",
    component: EditEvent,
    options: { headerShown: false },
  },
  {
    name: "EditPhotos",
    component: EditPhotos,
    options: { headerShown: false },
  },
];
