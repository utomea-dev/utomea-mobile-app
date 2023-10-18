import { deepCloneArray } from "../utils/helpers";

const isSame = (arr1 = [], arr2 = []) => {
  const arr1Element = arr1[0]?.end_timestamp.split("T")[0].split(" ")[0];
  const arr2Element = arr2[0]?.end_timestamp.split("T")[0].split(" ")[0];
  console.log("is equal ? ==== ", arr1Element, arr2Element, arr2);
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
