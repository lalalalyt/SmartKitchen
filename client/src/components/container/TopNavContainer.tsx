import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { ModeContext } from "../../contexts/ModeContext";
import AutoLogout from "../topNav/AutoLogout";

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
        <AutoLogout/>
      </Toolbar>
    </AppBar>
  );
}

export default TopNav;
