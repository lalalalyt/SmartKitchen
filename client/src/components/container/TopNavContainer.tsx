import { AppBar, Toolbar, Typography } from "@mui/material";
import Authentication from "../topNav/Authentication";
import {ModeContext} from "../../App";
import { useContext } from "react";

function TopNav() {
  const [mode, transite] = useContext(ModeContext)
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h3" sx={{ flexGrow: 1 }} onClick={()=>transite("HOME")}>SmartKitchen</Typography>
        <Authentication />
      </Toolbar>
    </AppBar>
  );
}

export default TopNav;
