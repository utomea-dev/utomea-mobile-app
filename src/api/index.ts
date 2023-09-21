import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const makeRequest = async (
  url: string,
  method = "GET",
  body = {},
  options: Object
) => {
  const user = await AsyncStorage.getItem("utomea_user");
  let token = "";

  if (user) {
    token = await JSON.parse(user).token;
  }
  console.log("token=====", user, token);
  const allOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };

  switch (method) {
    case "GET":
      return axios.get(url, allOptions);

    case "POST":
      return axios.post(url, body, allOptions);

    case "PUT":
      return axios.put(url, body, allOptions);

    case "PATCH":
      return axios.patch(url, body, allOptions);

    case "DELETE":
      return axios.delete(url, allOptions);

    default:
      return axios.get(url, {}, allOptions);
  }
};

export default makeRequest;
