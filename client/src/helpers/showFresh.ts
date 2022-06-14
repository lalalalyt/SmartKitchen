import AddAlertIcon from "@mui/icons-material";
import { dateDifference } from "./dateDifference";

export const showFresh = (date1: string, date2: string) => {
  if (dateDifference(date2) === 0) {
    return 0;
  } else {
    const fresh = Math.round(
      (dateDifference(date2) / dateDifference(date2, date1)) * 5
    );
    return fresh;
  }
};
