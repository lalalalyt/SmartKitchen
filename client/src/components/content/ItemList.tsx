import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const itemList = [
  {
    id: 1,
    quantity: 2,
    purchaseDate: "2022-05-29",
    bestBefore: "2022-06-02",
    item_id: 2,
    fridge_id: 1,
  },
  {
    id: 2,
    quantity: 1,
    purchaseDate: "2022-05-20",
    bestBefore: "2022-06-20",
    item_id: 3,
    fridge_id: 2,
  },
];

function ItemList() {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">quantity</TableCell>
            <TableCell align="right">purchase date</TableCell>
            <TableCell align="right">best before</TableCell>
            <TableCell align="right">remaining days</TableCell>
            <TableCell align="right">fresh</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemList.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{item.purchaseDate}</TableCell>
              <TableCell align="right">{item.bestBefore}</TableCell>
              <TableCell align="right">10</TableCell>
              <TableCell align="right">lala</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ItemList;
