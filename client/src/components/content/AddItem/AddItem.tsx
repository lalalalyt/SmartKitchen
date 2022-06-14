import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import ItemInput from "./ItemInput";
import { FridgeContext } from "../../container/AppContainer";
import { ItemList } from "../ItemList/ItemList";

export interface Inputs {
  itemCategory: string;
  newItem: string;
  quantity: number;
  purchaseDate: Date | null;
  bestBefore: Date | null;
  itemID: number | null;
}

const defaultInputs: Inputs = {
  itemCategory: "",
  newItem: "",
  quantity: 1,
  purchaseDate: new Date(),
  bestBefore: null,
  itemID: null,
};

interface AddItemProps {
  setList: React.Dispatch<React.SetStateAction<ItemList[] | null>>;
}

function AddItem({ setList }: AddItemProps) {
  const [add, setAdd] = useState(false);
  const { fridgeType, fridgeID } = useContext(FridgeContext);
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);

  const handleClickOpen = () => {
    setAdd(true);
  };

  const handleClose = () => {
    setAdd(false);
  };

  const handleSave = () => {
    setAdd(false);
    Promise.all([
      axios.post(`/fridge/${fridgeID}`, inputs),
      // axios.post(`/item/${fridgeType}/search/${inputs.newItem}`,),
    ]).then(() => {
      axios.get(`/fridge/${fridgeID}`).then((res) => {
        res.data.length === 0 ? setList([]) : setList(res.data);
      });
    });
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
      <Dialog open={add} onClose={handleClose} fullWidth>
        <form>
          <DialogTitle>Add new item</DialogTitle>
          <DialogContent>
            <ItemInput inputs={inputs} setInputs={setInputs} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddItem;
