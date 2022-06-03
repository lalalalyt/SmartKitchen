import express from "express";
import { client } from "../db/db";

const fridgeRouter = express.Router();

fridgeRouter.get("/", (req, res) => {
  client.query('select * from "fridge"').then((result) => {
    res.send(result.rows);
    console.log("fridge list successfully pulled!", result.rows);
  });
});

fridgeRouter.get("/:id", (req, res) => {
  const text =
    `select list.id, list.quantity, list.purchaseDate, list.bestBefore, list.item_id, list.fridge_id,
    item.name as item_name, item.place, item.freshDay, item.category_id,
    fridge.name as fridge_name, fridge.location, fridge.type
    from "list" 
    join "item" on item_id=item.id 
    join "fridge" on fridge_id=fridge.id
    where fridge_id= $1`;
  const value = [req.params.id];
  client.query(text, value).then((result) => {
    res.send(result.rows);
    console.log("item list successfully pulled!", result.rows);
  });
});

export default fridgeRouter;
