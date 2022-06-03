import { Typography, Stack, Button, Grid } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";

import AddItem from "../AddItem/AddItem";
import ListTable from "./ListTable";
import Category from "./Category";

export type ItemList = {
  id: number;
  quantity: number;
  purchasedate: string;
  bestbefore: string;
  item_id: number;
  fridge_id: number;
  item_name: string;
  place: "R" | "F";
  freshday: number;
  category_id: number;
  fridge_name: string;
  location: string;
  type: "R" | "F";
};

type FridgeInfo = {
  fridge_id: number;
  fridge_name: string;
  location: string;
  type: "R" | "F";
};
interface ItemListProps {
  fridgeID: number;
}

function ItemList(props: ItemListProps) {
  const [edit, setEdit] = useState<string>("close");
  const [selectedCategory, setSelectedCategory] = useState<null | number>(null);
  const [list, setList] = useState<null | Array<ItemList>>(null);
  const [fridgeInfo, setFridgeInfo] = useState<FridgeInfo>({
    fridge_id: 0,
    fridge_name: "",
    location: "",
    type: "R",
  });

  useEffect(() => {
    axios.get(`/fridge/${props.fridgeID}`).then((res) => {
      res.data.length === 0 ? setList([]) : setList(res.data);
      setFridgeInfo({
        fridge_id: res.data[0].fridge_id,
        fridge_name: res.data[0].fridge_name,
        location: res.data[0].location,
        type: res.data[0].type,
      });
    });
  }, []);
  return (
    <Grid sx={{ ml: 2 }}>
      <Typography variant="h5" sx={{ mt: 2 }}>
        <AcUnitIcon /> {fridgeInfo.fridge_name}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {fridgeInfo.type} - {fridgeInfo.location}
      </Typography>

      <Stack direction="row" spacing={2}>
        <AddItem />
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => setEdit("open")}
        >
          EDIT
        </Button>
      </Stack>

      <Category onClick={setSelectedCategory} />
      <ListTable list={list} edit={edit} category={selectedCategory} />
    </Grid>
  );
}

export default ItemList;
