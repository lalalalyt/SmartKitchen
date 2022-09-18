import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import axios from "axios";
import { Fridge } from "./FridgeList";
import { UserContext } from "../../../contexts/UserContext";


interface AddFridgeProps {
  setFridgeList: React.Dispatch<React.SetStateAction<[Fridge] | []>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddFridge = (props: AddFridgeProps) => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const handleAddFridge = () => {
    if (user.id === 0) {
      props.setError(true);
    } else if (!open) {
      setOpen(() => true);
    }
  };

  const [state, setState] = useState({ type: "", name: "" });
  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, type: event.target.value });
  };
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, name: event.target.value });
  };

  const handleClose = () => {
    setState({ type: "", name: "" });
    setOpen(false);
  };

  const handleAdd = () => {
    setOpen(false);
    axios.post("/fridge", { ...state, user_id: user.id }).then((res) => {
      console.log(res);
      axios.get(`/user/${user.id}`).then((res) => {
        props.setFridgeList(res.data);
      });
    });
  };
  return (
    <>
      <Fab
        variant="extended"
        sx={{ width: 250, ml: 3 }}
        onClick={handleAddFridge}
      >
        <AddIcon sx={{ mr: 2 }} />
        Add new fridge!
      </Fab>

      {user.id !== 0 && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add new fridge</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              To add new fridge into your account, please fill out the form
              below.
            </DialogContentText>
            <Grid
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                select
                label="Fridge Type"
                value={state.type}
                onChange={handleChangeType}
                helperText="Please select the type of your fridge"
              >
                <MenuItem key={1} value="R">
                  Refrigerator
                </MenuItem>
                <MenuItem key={2} value="F">
                  Freezer
                </MenuItem>
              </TextField>
              <TextField
                id="name"
                label="Fridge Name"
                value={state.name}
                onChange={handleChangeName}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAdd}>Add</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default AddFridge;
