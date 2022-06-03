import { Grid } from "@mui/material";
import { createContext, useState } from "react";
import MainContainer from "./MainContainer";
import TopNav from "./TopNavContainer";

export const FridgeContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>]
>([0, () => {}]);
function AppContainer() {
  const [fridgeID, setFridgeID] = useState<number>(0);

  return (
    <Grid container>
      <TopNav />
      <FridgeContext.Provider value={[fridgeID, setFridgeID]}>
        <MainContainer />
      </FridgeContext.Provider>
    </Grid>
  );
}

export default AppContainer;
