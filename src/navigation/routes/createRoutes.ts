import CreateEvents from "../../screens/createScreens/CreateEvents";
import DateRange from "../../screens/createScreens/DateRange";
export const createRoutes = [
  {
    name: "Create/dateRange",
    component: DateRange,
    options: { headerShown: false },
  },
  {
    name: "Create/create",
    component: CreateEvents,
    options: { headerShown: false },
  },
];
