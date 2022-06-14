import express from "express";
import { client } from "../db/db";

const itemRouter = express.Router();

itemRouter.get("/:fridge_type", (req, res) => {
  const text = `select * from "item" 
    where place=$1`;
  const value = [req.params.fridge_type];
  client.query(text, value).then((result) => {
    res.send(result.rows);
    console.log("all items successfully pulled!", result.rows);
  });
});
itemRouter.get("/:fridge_type/:category_name", (req, res) => {
  const text = `select item.id,  item.name as item_name, item.place, item.freshday, category.id,category.name as category_name
    from "item" 
    join "category" on category_id=category.id
    where item.place=$1 and category.name=$2`;
  const value = [req.params.fridge_type, req.params.category_name];
  client.query(text, value).then((result) => {
    res.send(result.rows);
    console.log("item of this category successfully pulled!", result.rows);
  });
});

itemRouter.get("/:fridge_type/search/:item_name", (req, res) => {
  const text = `select *
    from "item" 
    where place=$1 and name=$2`;
  const value = [req.params.fridge_type, req.params.item_name];
  client.query(text, value).then((result) => {
    res.send(result.rows);
    console.log("This item successfully pulled!", result.rows);
  });
});
// itemRouter.post("/:fridge_type/search/:item_name", (req, res) => {
//   console.log("got body", req.body);
//   const text = `INSERT INTO "item" (name, place, freshDay, categoryID)
//   VALUES ($1, $2, $3, $4);`;

//   const value = [
//   ];
//   client.query(text, value).then((result) => {
//     res.send(result.rows);
//     console.log("This item successfully pulled!", result.rows);
//   });
// });
export default itemRouter;
