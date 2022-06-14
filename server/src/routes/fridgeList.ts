import express from "express";
import { client } from "../db/db";

const fridgeRouter = express.Router();
const bodyParser = require("body-parser");
fridgeRouter.use(bodyParser.urlencoded({ extended: true }));
fridgeRouter.use(bodyParser.json());

fridgeRouter.get("/", (req, res) => {
  client.query('select * from "fridge"').then((result) => {
    res.send(result.rows);
    console.log("fridge list successfully pulled!", result.rows);
  });
});

fridgeRouter.get("/:id", (req, res) => {
  const text = `select list.id, list.quantity, list.purchaseDate, list.bestBefore, list.item_id, list.fridge_id,
    item.name as item_name, item.place, item.freshDay, item.category_id,
    fridge.name as fridge_name, fridge.location, fridge.type
    from "list" 
    left join "item" on item_id=item.id 
    left join "fridge" on fridge_id=fridge.id
    where fridge_id= $1`;
  const value = [req.params.id];
  client.query(text, value).then((result) => {
    res.send(result.rows);
    console.log("item list successfully pulled!", result.rows);
  });
});

fridgeRouter.post("/:id", (req, res) => {
  console.log("got body", req.body);
  const text = `INSERT INTO "list" (quantity, purchaseDate, bestBefore, item_id, fridge_id, id)
  VALUES ($1, $2, $3, $4, $5, 4);`;

  const value = [
    req.body.quantity,
    req.body.purchaseDate,
    req.body.bestBefore,
    req.body.itemID,
    req.params.id,
  ];
  client.query(text, value).then((result) => {
    console.log("new item successfully added!", result.rows);
    res.send("success");
  });
});

export default fridgeRouter;

// INSERT INTO "item" (name, place, freshDay, categoryID)
// VALUES ($1, $2, $3, $4, $5, 3);`;
