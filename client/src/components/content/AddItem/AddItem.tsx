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

export interface Inputs {
  itemCategory: string;
  newItem: string;
  quantity: number;
  purchaseDate: Date | null;
  bestBefore: Date | null;
}

const defaultInputs: Inputs = {
  itemCategory: "",
  newItem: "",
  quantity: 1,
  purchaseDate: new Date(),
  bestBefore: null,
};

function AddItem() {
  const [add, setAdd] = useState(false);
  const { fridgeID } = useContext(FridgeContext);
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);

  // const [itemCategory, setItemCategory] = useState<string>("");
  // const [newItem, setnewItem] = useState<string>("");
  // const [quantity, setQuantity] = useState<number>(1);
  // const [purchaseDate, setPurchaseDate] = useState<Date | null>(new Date());
  // const [bestBefore, setbestBefore] = useState<Date | null>(null);

  const handleClickOpen = () => {
    setAdd(true);
  };

  const handleClose = () => {
    setAdd(false);
  };

  const handleSave = () => {
    console.log({inputs});
    axios.post("/fridge/${fridgeID}", {});
    setAdd(false);
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
        <form >
          <DialogTitle>Add new item</DialogTitle>
          <DialogContent>
            <ItemInput inputs={inputs} setInputs={setInputs} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} >Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddItem;
