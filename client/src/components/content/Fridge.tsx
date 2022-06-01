import { ListItem, ListItemText } from "@mui/material";

export interface FridgeProps {
  id: number;
  name: string;
  type: "R" | "F";
  onClick: () => void;
}

function Fridge(props: FridgeProps) {
  const fridgeType = props.type === "R" ? "Refrigrator" : "Freezer";
  return (
    <ListItem onClick={props.onClick}>
      <ListItemText primary={props.name} secondary={fridgeType}></ListItemText>
    </ListItem>
  );
}

export default Fridge;
