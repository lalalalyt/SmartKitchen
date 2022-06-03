import { Grid } from "@mui/material";
import { createContext, useState } from "react";
import MainContainer from "./MainContainer";
import TopNav from "./TopNavContainer";

export const FridgeContext = createContext<{
  fridgeType: string;
  setFridgeType: React.Dispatch<React.SetStateAction<string>>;
  fridgeID: number;
  setFridgeID: React.Dispatch<React.SetStateAction<number>>;
}>({
  fridgeType: "",
  setFridgeType: () => {},
  fridgeID: 0,
  setFridgeID: () => {},
});
function AppContainer() {
  const [fridgeID, setFridgeID] = useState<number>(0);
  const [fridgeType, setFridgeType] = useState<string>("");
  return (
    <Grid container>
      <TopNav />
      <FridgeContext.Provider
        value={{ fridgeType, setFridgeType, fridgeID, setFridgeID }}
      >
        <MainContainer />
      </FridgeContext.Provider>
    </Grid>
  );
}

export default AppContainer;
