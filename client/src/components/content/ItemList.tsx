import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { dateDifference } from "../../helpers/dateDifference";
import { showDate } from "../../helpers/showDate";
import { showFresh } from "../../helpers/showFresh";

// const itemList = [
//   {
//     id: 1,
//     quantity: 2,
//     purchaseDate: "2022-05-29",
//     bestBefore: "2022-06-02",
//     item_id: 2,
//     fridge_id: 1,
//   },
//   {
//     id: 2,
//     quantity: 1,
//     purchaseDate: "2022-05-20",
//     bestBefore: "2022-06-20",
//     item_id: 3,
//     fridge_id: 2,
//   },
// ];

type ItemList = {
  id: number;
  name: string;
  quantity: number;
  purchasedate: string;
  bestbefore: string;
  item_id: number;
  fridge_id: number;
};
interface ItemListProps {
  fridgeID: number;
}

function ItemList(props: ItemListProps) {
  const [list, setList] = useState<null | Array<ItemList>>(null);
  useEffect(() => {
    axios.get(`/fridge/${props.fridgeID}`).then((res) => {
      res.data.length === 0 ? setList([]) : setList(res.data);
    });
  }, []);
  console.log({ list });

  return (
    <>
      {list?.length === 0 && (
        <Typography>Your fridge is empty! Start to add items now!</Typography>
      )}
      {list && list.length !== 0 && (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">name</TableCell>
                <TableCell align="center">quantity</TableCell>
                <TableCell align="center">purchase date</TableCell>
                <TableCell align="center">best before</TableCell>
                <TableCell align="center">remaining days</TableCell>
                <TableCell align="center">fresh</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item) => (
                <TableRow
                  key={list.indexOf(item) + 1}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {list.indexOf(item) + 1}
                  </TableCell>
                  <TableCell align="center">{item.name}</TableCell>
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
                    {showFresh(item.purchasedate, item.bestbefore)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default ItemList;
