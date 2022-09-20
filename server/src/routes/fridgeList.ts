import express from "express";
import { client } from "../db/db";

const fridgeRouter = express.Router();
const bodyParser = require("body-parser");
fridgeRouter.use(bodyParser.urlencoded({ extended: true }));
fridgeRouter.use(bodyParser.json());

fridgeRouter.get("/", (req, res) => {
  client.query('select * from "fridge"').then((result) => {
    res.send(result.rows);
  });
});

fridgeRouter.post("/", (req, res) => {
  const text = `INSERT INTO "fridge"(id, type, name, user_id)
  VALUES (setval(pg_get_serial_sequence('fridge', 'id'), (SELECT MAX(id) FROM "fridge")+1), $1, $2, $3)`;
  const value = [req.body.type, req.body.name, req.body.user_id];
  client.query(text, value).then((result) => {
    res.send("successfully added");
  });
});

fridgeRouter.get("/:id", (req, res) => {
  const text = `select list.id, list.quantity, list.purchaseDate, list.bestBefore, list.item_id, list.fridge_id,
    item.name as item_name, item.place, item.freshDay, item.category_id, category.name as category_name,
    fridge.name as fridge_name, fridge.location, fridge.type
    from "list" 
    join "item" on item_id=item.id 
    join "category" on item.category_id=category.id
    join "fridge" on fridge_id=fridge.id
    where fridge_id= $1`;
  const value = [req.params.id];
  client.query(text, value).then((result) => {
    res.send(result.rows);
  });
});

fridgeRouter.post("/:id", (req, res) => {
  const text = `INSERT INTO "list" (quantity, purchaseDate, bestBefore, item_id, fridge_id, id)
  VALUES ($1, $2, $3, $4, $5, setval(pg_get_serial_sequence('list', 'id'), (SELECT MAX(id) FROM "list")+1) );`;

  const value = [
    req.body.quantity,
    req.body.purchaseDate,
    req.body.bestBefore,
    req.body.itemID,
    req.params.id,
  ];
  client.query(text, value).then((result) => {
    res.send("success");
  });
});

fridgeRouter.delete("/:id", async (req, res) => {
  await client
    .query(`create table "deleteArray"(name VARCHAR (255) UNIQUE NOT NULL)`)
    .then(() => {
      req.body.selected.forEach((item: string) => {
        client.query(`insert into "deleteArray" (name) values($1)`, [item]);
      });
    });

  const text = `
  delete from "list"
  where item_id IN (
    select item.id from "item" where name IN 
      (select * from "deleteArray")
  )`;
  client.query(text).then(() => {
    client.query(`drop table "deleteArray" `);
  });
  res.send("sucessfully deleted");
});
export default fridgeRouter;
