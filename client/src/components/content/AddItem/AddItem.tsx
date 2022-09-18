import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useContext, useState } from "react";

import { ItemList } from "../ItemList/ItemList";
import { dateDifference } from "../../../helpers/dateDifference";
import InfoDialog from "./InfoDialog";
import { FridgeContext } from "../../../contexts/FridgeContext.tsx";

export interface Inputs {
  itemCategory: string;
  newItem: string;
  quantity: number;
  purchaseDate: Date | null;
  bestBefore: Date | null;
  itemID: number | null;
}

export const defaultInputs: Inputs = {
  itemCategory: "",
  newItem: "",
  quantity: 1,
  purchaseDate: new Date(),
  bestBefore: null,
  itemID: null,
};

interface AddItemProps {
  setList: React.Dispatch<React.SetStateAction<ItemList[] | null>>;
  setEdit: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

function AddItem({ setList, setEdit, setSelected }: AddItemProps) {
  const [add, setAdd] = useState(false);
  const { fridgeType, fridgeID } = useContext(FridgeContext);
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);

  const handleClickOpen = () => {
    setAdd(true);
    setEdit("close");
    setSelected([]);
  };

  const handleClose = () => {
    setAdd(false);
    setInputs(defaultInputs);
  };

  const handleSave = () => {
    setAdd(false);
    if (!inputs.itemID && inputs.bestBefore && inputs.purchaseDate) {
      axios
        .post(`/item/${fridgeType}/search/${inputs.newItem}`, {
          name: inputs.newItem,
          place: fridgeType,
          freshDay: dateDifference(
            inputs.bestBefore.toString(),
            inputs.purchaseDate?.toString()
          ),
          itemCategory: inputs.itemCategory,
        })
        .then((res) => {
          setInputs((prev) => ({ ...prev, itemID: res.data.item_id }));
          axios
            .post(`/fridge/${fridgeID}`, {
              ...inputs,
              itemID: res.data.item_id,
            })
            .then(() => {
              axios.get(`/fridge/${fridgeID}`).then((res) => {
                res.data.length === 0 ? setList([]) : setList(res.data);
              });
            });
        });
    } else if (inputs.itemID && inputs.bestBefore && inputs.purchaseDate) {
      Promise.all([
        axios.put(`/item/${fridgeType}/search/${inputs.newItem}`, {
          freshDay: dateDifference(
            inputs.bestBefore.toString(),
            inputs.purchaseDate?.toString()
          ),
        }),
        axios.post(`/fridge/${fridgeID}`, inputs),
      ]).then(() => {
        axios.get(`/fridge/${fridgeID}`).then((res) => {
          res.data.length === 0 ? setList([]) : setList(res.data);
        });
      });
    }
    setInputs(defaultInputs);
  };
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddCircleIcon />}
        onClick={handleClickOpen}
      >
        ADD
      </Button>
      <InfoDialog
        open={add}
        inputs={inputs}
        setInputs={setInputs}
        handleClose={handleClose}
        handleSave={handleSave}
      />
    </>
  );
}

export default AddItem;
