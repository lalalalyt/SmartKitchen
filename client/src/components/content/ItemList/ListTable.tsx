import { Typography, Grid, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";

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
  edit: boolean;
  category: null | number;
  selected: GridSelectionModel;
  setSelected: React.Dispatch<React.SetStateAction<GridSelectionModel>>;
  setList: React.Dispatch<React.SetStateAction<ItemList[] | null>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function ListTable(props: ListTableProps) {
  const { list, edit, category, selected, setSelected, setList, setEdit } =
    props;
  const { fridgeID } = useContext(FridgeContext);
  const [change, setChange] = useState(false);
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);

  const handleDelete = () => {
    axios.delete(`fridge/:${fridgeID}`, { data: { selected } }).then(() => {
      setList((prev) => {
        if (prev) {
          const newList = prev?.filter(
            (item) => selected.indexOf(item.id) === -1
          );
          return newList;
        }
        return null;
      });
    });
  };

  const handleChange = () => {
    setChange(true);
    if (list) {
      setInputs(() => {
        const changeItem = list.filter((item) => item.id === selected[0]);
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

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "purchaseDate",
      headerName: "Purchase Date",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "bestBefore",
      headerName: "Best Before",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "remaining",
      headerName: "Remaining Days",
      sortable: true,
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fresh",
      headerName: "Fresh",
      sortable: true,
      width: 140,
      headerAlign: "center",
      align: "center",
    },
  ];
  const itemInSelectedCategory = list?.filter(
    (item) => !category || category === item.category_id
  );
  const rows = itemInSelectedCategory
    ? itemInSelectedCategory
        .map((item) => {
          return {
            id: item.id,
            name: item.item_name,
            quantity: item.quantity,
            purchaseDate: showDate(item.purchasedate),
            bestBefore: showDate(item.bestbefore),
            remaining: dateDifference(item.bestbefore),
            fresh: showFresh(item.purchasedate, item.bestbefore),
          };
        })
        .sort((a, b) => a.fresh.length - b.fresh.length)
    : [];

  return (
    <Grid container sx={{ width: "80%" }}>
      {list?.length === 0 && (
        <Typography>Your fridge is empty! Start to add items now!</Typography>
      )}
      {list && list.length !== 0 && (
        <>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection={edit}
              onSelectionModelChange={(selectionModel) => {
                setSelected(selectionModel);
              }}
              selectionModel={selected}
            />
          </div>

          {edit === true && selected.length !== 0 && (
            <Grid
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
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
              </Button>*/}
              <Button
                onClick={handleChange}
                sx={{ m: 2 }}
                variant={"outlined"}
                startIcon={<EditIcon />}
              >
                Change the info of item
              </Button>
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
