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
} from "@mui/material";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import { dateDifference } from "../../../helpers/dateDifference";
import { showDate } from "../../../helpers/showDate";
import { showFresh } from "../../../helpers/showFresh";
import { ItemList } from "./ItemList";

interface ListTableProps {
  list: null | Array<ItemList>;
  edit: string;
  category: null | number;
}

function ListTable(props: ListTableProps) {
  const { list, edit, category } = props;
  return (
    <Grid>
      {list?.length === 0 && (
        <Typography>Your fridge is empty! Start to add items now!</Typography>
      )}
      {list && list.length !== 0 && (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {edit === "open" && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      inputProps={{
                        "aria-label": "select all desserts",
                      }}
                    />
                  </TableCell>
                )}
                <TableCell align="center">id</TableCell>
                <TableCell align="center">name</TableCell>
                <TableCell align="center">quantity</TableCell>
                <TableCell align="center">purchase date</TableCell>
                <TableCell align="center">best before</TableCell>
                <TableCell align="center">remaining days</TableCell>
                <TableCell align="center">fresh</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item) => {
                if (!category || category === item.category_id) {
                  return (
                    <TableRow
                      key={list.indexOf(item) + 1}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {edit === "open" && (
                        <TableCell padding="checkbox">
                          <Checkbox color="primary" />
                        </TableCell>
                      )}
                      <TableCell component="th" scope="row">
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
                        {showFresh(item.purchasedate, item.bestbefore) > 0 && (
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
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Grid>
  );
}
export default ListTable;
