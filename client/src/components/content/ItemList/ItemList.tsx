import {
  Typography,
  Stack,
  Button,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";

import AddItem from "../AddItem/AddItem";
import ListTable from "./ListTable";
import Category, { CategoryType } from "./Category";
import { Fridge } from "../ManageFridge/FridgeList";
import { GridSelectionModel } from "@mui/x-data-grid";

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
  category_name: string;
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
  const [edit, setEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<GridSelectionModel>([]);
  const [selectedCategory, setSelectedCategory] = useState<null | number>(null);
  const [list, setList] = useState<null | Array<ItemList>>(null);
  const [category, setCategory] = useState<null | Array<CategoryType>>(null);
  const [fridgeInfo, setFridgeInfo] = useState<FridgeInfo>({
    fridge_id: 0,
    fridge_name: "",
    location: "",
    type: "R",
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/fridge/${props.fridgeID}`),
      axios.get(`/fridge`),
      axios.get(`/category`),
    ]).then((res) => {
      res[0].data.length === 0 ? setList([]) : setList(res[0].data);
      const selectedFridge = res[1].data.filter(
        (fridge: Fridge) => fridge.id === props.fridgeID
      );
      setFridgeInfo({
        fridge_id: selectedFridge[0].id,
        fridge_name: selectedFridge[0].name,
        location: selectedFridge[0].location,
        type: selectedFridge[0].type,
      });
      setCategory(res[2].data);
    });
  }, []);
  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      {!category && (
        <Box
          sx={{
            m: 2,
            mt: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {category && (
        <>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              ml: "17.5%",
            }}
          >
            <Typography variant="h5" sx={{ mt: 2 }}>
              <AcUnitIcon /> {fridgeInfo.fridge_name}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {fridgeInfo.type} - {fridgeInfo.location}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <AddItem
                setList={setList}
                setEdit={setEdit}
                setSelected={setSelected}
              />
              <Button
                variant={edit === true ? "contained" : "outlined"}
                startIcon={<EditIcon />}
                onClick={() => {
                  setEdit(edit === false ? true : false);
                  setSelected([]);
                }}
              >
                EDIT
              </Button>
            </Stack>
          </Grid>

          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            flexDirection="row"
          >
            <Category
              selectedCategory={selectedCategory}
              onClick={setSelectedCategory}
              category={category}
            />
            <ListTable
              list={list}
              edit={edit}
              category={selectedCategory}
              selected={selected}
              setSelected={setSelected}
              setList={setList}
              setEdit={setEdit}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default ItemList;
