import { Grid } from "@mui/material";
import FridgeContextProvider from "../../contexts/FridgeContext.tsx/provider";
import UserContextProvider from "../../contexts/UserContext/provider";
import MainContainer from "./MainContainer";
import TopNav from "./TopNavContainer";

export interface User {
  id: number;
  name: string;
  email: string;
}
function AppContainer() {
  return (
    <Grid container>
      <UserContextProvider>
        <TopNav />
        <FridgeContextProvider>
          <MainContainer />
        </FridgeContextProvider>
      </UserContextProvider>
    </Grid>
  );
}

export default AppContainer;
