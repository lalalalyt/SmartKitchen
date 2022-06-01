import { List } from "@mui/material";
import Fridge from "./Fridge";

const fridgeList = [
  { id: 1, name: "Micky", location: "Montreal", type: "R", userId: 1 },
  { id: 2, name: "Minnie", location: "Montreal", type: "F", userId: 1 },
];

function FridgeList() {
  const list = fridgeList.map((fridge) => (
    <List key={fridge.id} sx={{ width: "100%", maxWidth: 100, bgcolor: "background.paper" }}>
      <Fridge id={fridge.id} name={fridge.name} type={fridge.type as "R" | "F"} />
    </List>
  ));

  return <>{list}</>;
}

export default FridgeList;
