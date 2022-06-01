import { List } from "@mui/material";
import { useEffect, useState } from "react";
import Fridge, { FridgeProps } from "./Fridge";
import axios from "axios";

interface FridgeListProps {
  onClick: () => void;
}

function FridgeList(props: FridgeListProps) {
  const [fridgeList, setFridgeList] = useState<[FridgeProps] | null>(null);
  const list = fridgeList?.map((fridge) => (
    <Fridge
      onClick={props.onClick}
      key={fridge.id}
      id={fridge.id}
      name={fridge.name}
      type={fridge.type as "R" | "F"}
    />
  ));
  
  useEffect(() => {
    axios.get("/fridge").then((res) => {
      setFridgeList(res.data);
    });
  });

  return (
    <List sx={{ width: "100%", maxWidth: 100, bgcolor: "background.paper" }}>
      {list}
    </List>
  );
}

export default FridgeList;
