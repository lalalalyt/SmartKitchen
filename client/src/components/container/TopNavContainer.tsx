import { AppBar, Toolbar, Typography } from "@mui/material";
import Authentication from "../topNav/Authentication";

function TopNav() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h3" sx={{ flexGrow: 1 }}>SmartKitchen</Typography>
        <Authentication />
      </Toolbar>
    </AppBar>
  );
}

export default TopNav;
