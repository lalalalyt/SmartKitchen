import { dateDifference } from "./dateDifference";

export const showFresh = (date1: string, date2: string) => {
  if (dateDifference(date2) > (dateDifference(date1, date2) * 2) / 3) {
    return "🌿🌿🌿";
  } else if (dateDifference(date2) > (dateDifference(date1, date2) * 1) / 3) {
    return "🌿🌿";
  } else {
    return "🌿";
  }
};
