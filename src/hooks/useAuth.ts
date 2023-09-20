import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuth = async () => {
  const user = (await AsyncStorage.getItem("utomea_user")) || "Unknown";
  if (user === "Unknown") {
    return false;
  }

  return true;
};
