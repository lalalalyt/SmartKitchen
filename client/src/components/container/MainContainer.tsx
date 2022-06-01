import { Grid } from "@mui/material";
import FridgeList from "../content/FridgeList";
import ItemList from "../content/ItemList";

function MainContainer() {
  return (
    <Grid>
      <FridgeList />
      <ItemList />
    </Grid>
  );
}

export default MainContainer;
