import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuth = async () => {
  const user = (await AsyncStorage.getItem("utomea_user")) || "Unknown";
  console.log("user============", user);
  if (user === "Unknown") {
    return false;
  }

  const userDetails = JSON.parse(user).user;

  return userDetails;
};
