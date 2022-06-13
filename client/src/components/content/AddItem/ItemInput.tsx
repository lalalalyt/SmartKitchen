import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FridgeContext } from "../../container/AppContainer";
import { CategoryType } from "../ItemList/Category";
import { Inputs } from "./AddItem";

interface ItemInputProps {
  inputs: Inputs;
  setInputs: React.Dispatch<React.SetStateAction<Inputs>>;
}

type items = {
  id: number;
  item_name: string;
  place: "R" | "F";
  freshday: number;
  category_name: string;
};

function ItemInput(props: ItemInputProps) {
  const { itemCategory, newItem, quantity, purchaseDate, bestBefore } =
    props.inputs;
  const setItemCategory = (category: string) =>
    props.setInputs((prev) => ({ ...prev, itemCategory: category }));

  const setNewItem = (item: string) =>
    props.setInputs((prev) => ({ ...prev, newItem: item }));

  const setQuantity = (quantity: number) =>
    props.setInputs((prev) => ({ ...prev, quantity }));

  const setPurchaseDate = (purchaseDate: Date | null) =>
    props.setInputs((prev) => ({ ...prev, purchaseDate }));

  const setBestBefore = (bestBefore: Date | null) =>
    props.setInputs((prev) => ({ ...prev, bestBefore }));

  const { fridgeType } = useContext(FridgeContext);
  const [allCategory, setAllCategory] = useState<null | Array<CategoryType>>(
    null
  );
  const [itemList, setItemList] = useState<Array<items>>([]);

  useEffect(() => {
    axios.get(`/category`).then((res) => {
      setAllCategory(res.data);
    });
  }, []);

  const handleCategory = (event: SelectChangeEvent<string>) => {
    setItemCategory(event.target.value);
    axios.get(`/item/${fridgeType}/${event.target.value}`).then((res) => {
      setItemList(res.data);
    });
  };

  const handleItemName = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    setNewItem(value ?? "");
    axios.get(`/item/${fridgeType}/search/${value}`).then((res) => {
      setBestBefore(
        value
          ? new Date(
              new Date().getTime() + res.data[0].freshday * 24 * 60 * 60 * 1000
            )
          : null
      );
    });
  };

  const categoryMenu = allCategory?.map((category) => (
    <MenuItem key={category.id} value={category.name}>
      {category.name}
    </MenuItem>
  ));

  const itemOption = [];
  for (const item of itemList) {
    itemOption.push(item.item_name);
  }

  return (
    <>
      <Grid
        container
        direction="row"
        wrap="wrap"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <FormControl sx={{ width: 0.3, m: 1 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={itemCategory}
            label="Category"
            onChange={handleCategory}
          >
            {categoryMenu}
          </Select>
        </FormControl>
        <Autocomplete
          freeSolo={true}
          selectOnFocus
          sx={{ width: 0.3, m: 1 }}
          disablePortal
          options={itemOption}
          value={newItem}
          onChange={handleItemName}
          renderInput={(params) => <TextField {...params} label="Name" />}
        />
        <TextField
          sx={{ width: 0.3, m: 1 }}
          type="number"
          label="Quantity"
          name="quantity"
          helperText="Optional"
          inputProps={{ min: 0, max: 10 }}
          value={quantity}
          onChange={(event) => {
            setQuantity(Number(event.target.value));
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Purchase Date"
            value={purchaseDate}
            onChange={(newValue) => {
              setPurchaseDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="Best Before"
            value={bestBefore}
            onChange={(newValue) => {
              setBestBefore(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>
    </>
  );
}

export default ItemInput;
