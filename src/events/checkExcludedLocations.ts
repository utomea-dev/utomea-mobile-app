import { getDistance } from "geolib";
import makeRequest from "../api";
import { getExcludedLocationsUrl } from "../api/urls";

export const checkExcludedLocation = async (
  lat = 0,
  long = 0,
  address = ""
) => {
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
    // console.log("distances----", distance, location.identifier, address);
    if (location.identifier === address) flag = true;
    // if (distance < 200 || location.identifier === address) flag = true;
  });

  return flag;
};
