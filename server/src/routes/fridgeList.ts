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
    'select * from "list" join "item" on item_id=item.id where fridge_id= $1';
  const value = [req.params.id];
  client.query(text, value).then((result) => {
    res.send(result.rows);
    console.log("item list successfully pulled!", result.rows);
  });
});

export default fridgeRouter;
