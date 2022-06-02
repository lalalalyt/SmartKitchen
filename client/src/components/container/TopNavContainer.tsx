import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Authentication from "../topNav/Authentication";
import { ModeContext } from "../../App";
import { useContext } from "react";

function TopNav() {
  const [, transite] = useContext(ModeContext);

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Button variant="text" sx={{ color: "white" }}>
          <Typography variant="h3" onClick={() => transite("HOME")}>
            SmartKitchen
          </Typography>
        </Button>
        <Authentication />
      </Toolbar>
    </AppBar>
  );
}

export default TopNav;
