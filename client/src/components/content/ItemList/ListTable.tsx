import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Grid,
  Checkbox,
  Rating,
  Button,
  IconButton,
} from "@mui/material";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import DeleteIcon from "@mui/icons-material/Delete";

import { useContext, useState } from "react";
import { dateDifference } from "../../../helpers/dateDifference";
import { showDate } from "../../../helpers/showDate";
import { showFresh } from "../../../helpers/showFresh";
import { ItemList } from "./ItemList";
import axios from "axios";

import { defaultInputs, Inputs } from "../AddItem/AddItem";
import InfoDialog from "../AddItem/InfoDialog";
import { FridgeContext } from "../../../contexts/FridgeContext.tsx";

interface ListTableProps {
  list: null | Array<ItemList>;
  edit: string;
  category: null | number;
  selected: Array<string>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setList: React.Dispatch<React.SetStateAction<ItemList[] | null>>;
  setEdit: React.Dispatch<React.SetStateAction<string>>;
}

function ListTable(props: ListTableProps) {
  const { list, edit, category, selected, setSelected, setList, setEdit } =
    props;
  const { fridgeID } = useContext(FridgeContext);
  const [change, setChange] = useState(false);
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);

  const handleClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleAllSelect = () => {
    if (selected.length === list?.length) {
      setSelected([]);
    } else {
      let newSelected: string[] = [];
      list?.forEach((item) => {
        newSelected = [...newSelected, item.item_name];
      });
      setSelected(newSelected);
    }
  };
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const isAllSelected = () => selected.length === list?.length;

  const handleDelete = () => {
    axios.delete(`fridge/:${fridgeID}`, { data: { selected } }).then(() => {
      setList((prev) => {
        if (prev) {
          const newList = prev?.filter(
            (item) => selected.indexOf(item.item_name) === -1
          );
          return newList;
        }
        return null;
      });
    });
  };

  const handleChangeOpen = () => {
    setChange(true);
    if (list) {
      setInputs(() => {
        const changeItem = list.filter(
          (item) => item.item_name === selected[0]
        );
        return {
          itemCategory: changeItem[0].category_name,
          newItem: changeItem[0].item_name,
          quantity: changeItem[0].quantity,
          purchaseDate: new Date(changeItem[0].purchasedate),
          bestBefore: new Date(changeItem[0].bestbefore),
          itemID: changeItem[0].item_id,
        };
      });
    }
  };

  const handleChangeSave = () => {
    setChange(false);
    setInputs(defaultInputs);
    console.log("Changed the info");
  };
  const handleChangeClose = () => {
    setChange(false);
    setInputs(defaultInputs);
  };

  return (
    <Grid>
      {list?.length === 0 && (
        <Typography>Your fridge is empty! Start to add items now!</Typography>
      )}
      {list && list.length !== 0 && (
        <>
          <TableContainer sx={{ width: 900 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{ height: 80 }}>
                  {edit === "open" && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isAllSelected()}
                        onChange={handleAllSelect}
                        inputProps={{
                          "aria-label": "select all foods",
                        }}
                      />
                    </TableCell>
                  )}
                  <TableCell width="6%" align="center">
                    id
                  </TableCell>
                  <TableCell width="11%" align="center">
                    name
                  </TableCell>
                  <TableCell width="11%" align="center">
                    quantity
                  </TableCell>
                  <TableCell width="14%" align="center">
                    purchase date
                  </TableCell>
                  <TableCell width="14%" align="center">
                    best before
                  </TableCell>
                  <TableCell width="14%" align="center">
                    remaining days
                  </TableCell>
                  <TableCell width="20%" align="center">
                    fresh
                  </TableCell>
                  <TableCell width="10%" align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((item) => {
                  if (!category || category === item.category_id) {
                    const isItemSelected = isSelected(item.item_name);
                    return (
                      <TableRow
                        key={list.indexOf(item) + 1}
                        sx={{
                          height: 80,
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {edit === "open" && (
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onChange={(event) =>
                                handleClick(event, item.item_name)
                              }
                            />
                          </TableCell>
                        )}
                        <TableCell align="center" component="th" scope="row">
                          {list.indexOf(item) + 1}
                        </TableCell>
                        <TableCell align="center">{item.item_name}</TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="center">
                          {showDate(item.purchasedate)}
                        </TableCell>
                        <TableCell align="center">
                          {showDate(item.bestbefore)}
                        </TableCell>
                        <TableCell align="center">
                          {dateDifference(item.bestbefore)}
                        </TableCell>
                        <TableCell align="center">
                          {showFresh(item.purchasedate, item.bestbefore) ===
                            0 && <AddAlertIcon />}
                          {showFresh(item.purchasedate, item.bestbefore) >
                            0 && (
                            <Rating
                              name="read-only"
                              value={showFresh(
                                item.purchasedate,
                                item.bestbefore
                              )}
                              readOnly
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {isItemSelected && (
                            <IconButton onClick={handleDelete}>
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {edit === "open" && selected.length !== 0 && (
            <Grid>
              <Button
                onClick={handleDelete}
                sx={{ m: 2 }}
                variant={"outlined"}
                startIcon={<DeleteIcon />}
              >
                Delete from fridge
              </Button>
              {/* <Button
                sx={{ m: 2 }}
                variant={"outlined"}
                startIcon={<ShoppingCartIcon />}
              >
                Delete & Add into shopping list
              </Button>
              <Button
                onClick={handleChangeOpen}
                sx={{ m: 2 }}
                variant={"outlined"}
                startIcon={<EditIcon />}
              >
                Change the info of item
              </Button> */}
            </Grid>
          )}
          <InfoDialog
            open={change}
            inputs={inputs}
            setInputs={setInputs}
            handleClose={handleChangeClose}
            handleSave={handleChangeSave}
          />
        </>
      )}
    </Grid>
  );
}
export default ListTable;
