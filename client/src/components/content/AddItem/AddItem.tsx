import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import ItemInput from "./ItemInput";

function AddItem() {
  const [add, setAdd] = useState(false);
  const handleClickOpen = () => {
    setAdd(true);
  };

  const handleClose = () => {
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
      <Dialog open={add} onClose={handleClose}>
        <form>
          <DialogTitle>Add new item</DialogTitle>
          <DialogContent>
            <ItemInput />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} type="submit">
              Log In
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddItem;
