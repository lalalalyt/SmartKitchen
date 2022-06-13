import AddAlertIcon from "@mui/icons-material";
import { dateDifference } from "./dateDifference";

export const showFresh = (date1: string, date2: string) => {
  if (dateDifference(date2) === 0) {
    return 0;
  } else {
    return Math.ceil(
      (dateDifference(date2) / dateDifference(date1, date2)) % 0.2
    );
  }
};
