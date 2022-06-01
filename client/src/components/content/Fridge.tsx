import { ListItem, ListItemText } from "@mui/material";

interface FridgeProps {
  id: number;
  name: string;
  type: "R" | "F";
}

function Fridge(props: FridgeProps) {
  const fridgeType = props.type === "R" ? "Refrigrator" : "Freezer";
  return (
    <ListItem onClick={()=>console.log("you click the fridge.")}>
      <ListItemText primary={props.name} secondary={fridgeType}></ListItemText>
    </ListItem>
  );
}

export default Fridge;
