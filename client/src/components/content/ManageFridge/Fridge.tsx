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
    <ListItem
      button
      onClick={props.onClick}
      sx={{
        m: 3,
        ml: 10,
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        width: 530,
      }}
    >
      <ListItemText primary={props.name} secondary={fridgeType}></ListItemText>
    </ListItem>
  );
}

export default Fridge;
