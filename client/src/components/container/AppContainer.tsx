import { Grid } from "@mui/material";
import { createContext, useState } from "react";
import MainContainer from "./MainContainer";
import TopNav from "./TopNavContainer";

export const FridgeContext = createContext<{
  fridgeType: string;
  setFridgeType: React.Dispatch<React.SetStateAction<string>>;
  fridgeID: number;
  setFridgeID: React.Dispatch<React.SetStateAction<number>>;
}>({
  fridgeType: "",
  setFridgeType: () => {},
  fridgeID: 0,
  setFridgeID: () => {},
});

export const UserContext = createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}>({
  user: { id: 0, name: "", email: "" },
  setUser: () => {},
});
export interface User {
  id: number;
  name: string;
  email: string;
}
function AppContainer() {
  const [fridgeID, setFridgeID] = useState<number>(0);
  const [fridgeType, setFridgeType] = useState<string>("");
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem("user");
    let initialValue;
    if (saved) {
      initialValue = JSON.parse(saved);
    }
    return initialValue || { id: 0, name: "", email: "" };
  });
  return (
    <Grid container>
      <UserContext.Provider value={{ user, setUser }}>
        <TopNav />
        <FridgeContext.Provider
          value={{ fridgeType, setFridgeType, fridgeID, setFridgeID }}
        >
          <MainContainer />
        </FridgeContext.Provider>
      </UserContext.Provider>
    </Grid>
  );
}

export default AppContainer;
