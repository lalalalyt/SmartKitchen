import { useContext } from "react";
import { Grid } from "@mui/material";
import FridgeList from "../content/FridgeList";
import ItemList from "../content/ItemList/ItemList";
import { ModeContext } from "../../App";
import { FridgeContext } from "./AppContainer";

function MainContainer() {
  const [mode, transite] = useContext(ModeContext);
  const { fridgeID } = useContext(FridgeContext);
  return (
    <Grid>
      {mode === "HOME" && (
        <FridgeList
          onClick={() => {
            transite("LIST");
          }}
        />
      )}
      {mode === "LIST" && <ItemList fridgeID={fridgeID} />}
    </Grid>
  );
}

export default MainContainer;
