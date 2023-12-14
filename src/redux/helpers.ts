import { deepCloneArray } from "../utils/helpers";
import RNFS from "react-native-fs";
import { setUploadedImages } from "./slices/homeSlice";

const isSame = (arr1 = [], arr2 = []) => {
  const arr1Element = arr1[0]?.begin_timestamp.split("T")[0].split(" ")[0];
  const arr2Element = arr2[0]?.begin_timestamp.split("T")[0].split(" ")[0];
  return arr1Element === arr2Element;
};

const merge = (arr1, arr2) => {
  if (isSame(arr1, arr2)) {
    return [[...arr1, ...arr2]];
  }
  return [[...arr1], [...arr2]];
};

export const mergeAll = (oldData, newData) => {
  const oldDataClone = deepCloneArray(oldData);
  const newDataClone = deepCloneArray(newData);
  const popElement = oldDataClone?.pop();
  const shiftElement = newDataClone?.shift();
  return [...oldDataClone, ...merge(popElement, shiftElement), ...newDataClone];
};

export const convertImageToBinary = async (
  image = { uri: "", fileSize: 0, fileName: "" }
) => {
  try {
    const filePath = image.uri;
    console.log("filepath=================:", filePath);

    // Read the contents of the image file as binary data
    const binaryData = await RNFS.readFile(filePath, "base64");

    console.log("Binary data success:");
    return binaryData;
  } catch (error) {
    console.error("Error converting image to binary:", error);
  }
};

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (err) => {
      reject(err);
    };
  });
};

export const removeSpaces = (str) => {
  return str.replace(/\s/g, "");
};

export const retryImageUpload = (
  files: [],
  presignedUrls: [],
  failed: [],
  dispatch
) => {
  const requests = files.map(async (item, index) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // success
            dispatch(setUploadedImages());
            console.log("Success XHR");
            resolve();
          } else {
            // failure
            // console.log("FAiled XHR");
            failed.push({ image: item.image, index: item.index });
            const errorMessage = xhr.responseText;
            console.log("Failed:", errorMessage);
            reject();
          }
        }
      };
      const fileType = "application/octet-stream";
      // const fileType = "image/jpeg";
      xhr.open("PUT", presignedUrls[item.index]);
      xhr.setRequestHeader("Content-Type", fileType);
      xhr.send({
        uri: item.image.uri,
        type: fileType,
        name: item.image.fileName,
      });
    });
  });

  return requests;
};
