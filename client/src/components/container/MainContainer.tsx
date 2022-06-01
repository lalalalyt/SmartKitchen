import { Grid } from "@mui/material";
import FridgeList from "../content/FridgeList";
import ItemList from "../content/ItemList";
// import useVisualMode from "../../hooks/useVisualMode";
import { useContext } from "react";
import { ModeContext } from "../../App";

function MainContainer() {
  const [mode, transite] = useContext(ModeContext);
  return (
    <Grid>
      {mode === "HOME" && (
        <FridgeList
          onClick={() => { 
            transite("LIST");
          }}
        />
      )}
      {mode === "LIST" && <ItemList />}
    </Grid>
  );
}

export default MainContainer;
