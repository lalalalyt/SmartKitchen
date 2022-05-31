import { Grid } from "@mui/material";
import MainContainer from "./MainContainer";
import TopNav from "./TopNav";

function AppContainer() {
  return (
    <Grid container>
      <TopNav />
      <MainContainer />
    </Grid>
  );
}

export default AppContainer;
