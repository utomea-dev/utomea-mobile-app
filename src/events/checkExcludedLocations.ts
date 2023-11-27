import { getDistance } from "geolib";
import makeRequest from "../api";
import { getExcludedLocationsUrl } from "../api/urls";

export const checkExcludedLocation = async (lat = 0, long = 0) => {
  const response = await makeRequest(getExcludedLocationsUrl(), "GET", {}, {});
  const excludedLocations = response.data.data;

  let flag = false;
  excludedLocations.forEach((location) => {
    const distance = getDistance(
      { latitude: lat, longitude: long },
      {
        latitude: Number(location.latitude),
        longitude: Number(location.longitude),
      }
    );
    console.log("distances----", distance);
    if (distance < 200) flag = true;
  });

  return flag;
};
