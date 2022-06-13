import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FridgeContext } from "../../container/AppContainer";
import { CategoryType } from "../ItemList/Category";

type items = {
  id: number;
  item_name: string;
  place: "R" | "F";
  freshday: number;
  category_name: string;
};

function ItemInput() {
  const { fridgeType } = useContext(FridgeContext);
  const [allCategory, setAllCategory] = useState<null | Array<CategoryType>>(
    null
  );
  const [itemCategory, setItemCategory] = useState<string>("");
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

  const categoryMenu = allCategory?.map((category) => (
    <MenuItem key={category.id} value={category.name}>
      {category.name}
    </MenuItem>
  ));

  const itemOption = [];
  for (const item of itemList) {
    itemOption.push({ label: item.item_name });
  }

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select value={itemCategory} label="Category" onChange={handleCategory}>
          {categoryMenu}
        </Select>
      </FormControl>
      <Autocomplete
        disablePortal
        options={itemOption}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Name" />}
      />
    </>
  );
}

export default ItemInput;
